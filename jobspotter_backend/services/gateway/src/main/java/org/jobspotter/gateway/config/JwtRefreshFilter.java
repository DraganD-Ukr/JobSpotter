package org.jobspotter.gateway.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.gateway.dto.TokenResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Mono;

import java.time.Instant;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtRefreshFilter implements WebFilter {

    private final JwtDecoder jwtDecoder;

    private final WebClient.Builder webClientBuilder;

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        String authHeader = request.getHeaders().getFirst(HttpHeaders.AUTHORIZATION);

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);

            try {
                Jwt jwt = jwtDecoder.decode(token);
                if (jwt.getExpiresAt().isBefore(Instant.now())) {
                    return refreshToken(exchange, chain, token);
                }
            } catch (JwtException e) {
                return refreshToken(exchange, chain, token);
            }
        }

        return chain.filter(exchange);
    }

    private Mono<Void> refreshToken(ServerWebExchange exchange, WebFilterChain chain, String expiredToken) {
        log.debug("Attempting to refresh token: {}", expiredToken);
        log.debug("Cookies: {}", exchange.getRequest().getCookies());
        // Extract the RefreshToken cookie from the incoming request
        String refreshToken = exchange.getRequest().getCookies().getFirst("RefreshToken").getValue();

        return webClientBuilder.build()
                .post()
                .uri("http://localhost:8080/api/v1/user/auth/refresh")
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + expiredToken)
                .cookie("RefreshToken", refreshToken)  // Include the RefreshToken cookie
                .retrieve()
                .onStatus(httpStatusCode -> httpStatusCode.isError(), clientResponse -> Mono.error(new RuntimeException("Failed to refresh token")))
                .bodyToMono(TokenResponse.class)
                .flatMap(newTokenResponse -> {
                    // Extract the new access and refresh tokens
                    String newAccessToken = newTokenResponse.getAccess_token();
                    String newRefreshToken = newTokenResponse.getRefresh_token();

                    // Set the new tokens in the response cookies
                    exchange.getResponse().addCookie(ResponseCookie.from("AccessToken", newAccessToken).httpOnly(true).path("/").build());
                    exchange.getResponse().addCookie(ResponseCookie.from("RefreshToken", newRefreshToken).httpOnly(true).path("/").build());

                    log.info("Successfully refreshed access and refresh tokens");

                    ServerHttpRequest newRequest = exchange.getRequest().mutate()
                            .header(HttpHeaders.AUTHORIZATION, "Bearer " + newTokenResponse.getAccess_token())
                            .build();
                    return chain.filter(exchange.mutate().request(newRequest).build());
                });
    }




}
