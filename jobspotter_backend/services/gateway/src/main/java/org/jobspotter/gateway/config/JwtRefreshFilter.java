package org.jobspotter.gateway.config;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.gateway.dto.TokenResponse;
import org.jobspotter.gateway.exception.ErrorResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRefreshFilter implements WebFilter {

    @Value("${keycloak.admin.client-id}")
    private String clientId;

    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
    private String issuerUri;

    private final JwtDecoder jwtDecoder;
    private final WebClient.Builder webClientBuilder;

    @Autowired
    ObjectMapper objectMapper;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String path = request.getPath().value();

        if (path.contains("/login") || path.contains("/register") || path.contains("/webjars")
                || path.contains("/swagger-ui") || path.contains("/swagger-ui.html")
                || path.contains("job-posts/search")
                || path.contains("/job-tags")
                || path.contains("/top-10")
                || path.contains("/v3/api-docs") || path.contains("/eureka") || path.contains("/actuator")) {
            return chain.filter(exchange);// Skip JWT validation here
        }
        // Extract the AccessToken from cookies
        HttpCookie accessTokenCookie = exchange.getRequest().getCookies().getFirst("AccessToken");

        if (accessTokenCookie != null) {
            String accessToken = accessTokenCookie.getValue();

            try {
                Jwt jwt = jwtDecoder.decode(accessToken);

                // If the token is not expired, add it to the Authorization header to original request and proceed
                if (jwt.getExpiresAt().isAfter(Instant.now())) {
                    ServerHttpRequest newRequest = request.mutate()
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                            .build();
                    log.debug("Access token is valid, proceeding with the request");
                    return chain.filter(exchange.mutate().request(newRequest).build());
                }
                log.debug("Access token is expired. Refreshing token...");
            } catch (JwtException e) {
                log.error("Error decoding access token: {}:, {}", e.getMessage(), e.getStackTrace());
                return returnErrorResponse(exchange, HttpStatus.UNAUTHORIZED, "Invalid access token");
            }
        }

        // If no valid access token or expired, refresh it using the refresh token from cookies
        return refreshToken(exchange, chain);
    }

    private Mono<Void> refreshToken(ServerWebExchange exchange, WebFilterChain chain) {
        log.debug("Attempting to refresh token...");

        // Extract the RefreshToken cookie from the request
        HttpCookie refreshTokenCookie = exchange.getRequest().getCookies().getFirst("RefreshToken");
        if (refreshTokenCookie == null) {
            log.error("No RefreshToken found in request cookies");
            return returnErrorResponse(exchange, HttpStatus.BAD_REQUEST, "Refresh token missing");
        }
        String refreshToken = refreshTokenCookie.getValue();



        // Prepare request body for the refresh token request
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId); // Adjust based on your Keycloak setup
        formData.add("grant_type", "refresh_token");
        formData.add("refresh_token", refreshToken);

        // Make the refresh token request to Keycloak
        return webClientBuilder.build()
                .post()
                .uri(issuerUri + "/protocol/openid-connect/token") // Keycloak token endpoint
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_FORM_URLENCODED_VALUE)
                .bodyValue(formData)
                .retrieve()
                .bodyToMono(TokenResponse.class)
                .flatMap(newTokenResponse -> {
                    if (newTokenResponse.getAccess_token() == null || newTokenResponse.getRefresh_token() == null) {
                        log.error("Invalid response from Keycloak: {}", newTokenResponse);
                        return returnErrorResponse(exchange, HttpStatus.UNAUTHORIZED, "Failed to refresh token: invalid or expired. Please login again");
                    }

                    String newAccessToken = newTokenResponse.getAccess_token();
                    String newRefreshToken = newTokenResponse.getRefresh_token();

                    // Invalidate old cookies
                    removeCookies(exchange);

                    // Set new tokens in HttpOnly cookies
                    exchange.getResponse().addCookie(ResponseCookie.from("AccessToken", newAccessToken)
                            .httpOnly(true).secure(false).path("/").maxAge(Duration.ofMinutes(newTokenResponse.getExpires_in() / 60))
                            .sameSite("Strict").build());

                    exchange.getResponse().addCookie(ResponseCookie.from("RefreshToken", newRefreshToken)
                            .httpOnly(true).secure(false).path("/").maxAge(Duration.ofMinutes(newTokenResponse.getRefresh_expires_in() / 60))
                            .sameSite("Strict").build());

                    log.info("Successfully refreshed access and refresh tokens");

                    // Add the new access token to the Authorization header
                    ServerHttpRequest newRequest = exchange.getRequest().mutate()
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + newAccessToken)
                            .build();

                    return chain.filter(exchange.mutate().request(newRequest).build());
                })
                .onErrorResume(e -> {
                    log.error("Token refresh failed: {}: {}", e.getMessage(), e.getStackTrace());
                    return returnErrorResponse(exchange, HttpStatus.INTERNAL_SERVER_ERROR, "Could not refresh token");
                });
    }

    /**
     * Utility method to return a custom error response with a message, status, and timestamp.
     */
    private Mono<Void> returnErrorResponse(ServerWebExchange exchange, HttpStatus status, String message) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                status.getReasonPhrase(),
                status.value(),
                message
        );

        try {
            byte[] errorBytes = objectMapper.writeValueAsBytes(errorResponse);
            exchange.getResponse().setStatusCode(status);
            exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
            exchange.getResponse().getHeaders().setContentLength(errorBytes.length);
            return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(errorBytes)));
        } catch (JsonProcessingException e) {
            // Fallback for JSON serialization errors
            byte[] fallbackErrorBytes = ("{\"message\": \"Internal Server Error\"}").getBytes();
            exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
            return exchange.getResponse().writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(fallbackErrorBytes)));
        }
    }

    private void removeCookies(ServerWebExchange exchange) {
        // Remove old cookies (invalidate them)
        exchange.getResponse().addCookie(ResponseCookie.from("AccessToken", "")
                .httpOnly(true).secure(false).path("/").maxAge(Duration.ZERO).build());
        exchange.getResponse().addCookie(ResponseCookie.from("RefreshToken", "")
                .httpOnly(true).secure(false).path("/").maxAge(Duration.ZERO).build());
    }
}