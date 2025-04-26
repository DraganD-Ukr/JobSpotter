package org.jobspotter.gateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Autowired
    private JwtRefreshFilter JwtRefreshFilter;

    @Value("${cors.allowed-origins}")
    private List<String> allowedOrigins;



    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html", "/webjars/**",
                                "/actuator/prometheus",
                                "api/v1/job-posts/top-10",
                                "/api/v1/users/v3/api-docs", // Service specific documentation paths
                                "/api/v1/job-posts/v3/api-docs",
                                "/api/v1/reviews/v3/api-docs",
                                "/api/v1/reports/v3/api-docs"
                        ).permitAll()

                        .pathMatchers("/api/v1/users/auth/**").permitAll()
                        .pathMatchers("/eureka/**").permitAll()
                        .pathMatchers(HttpMethod.GET,"/api/v1/job-posts/job-tags").permitAll()
                        .pathMatchers(HttpMethod.GET,"/api/v1/job-posts/search").permitAll()
                        .pathMatchers(HttpMethod.GET, "/api/v1/job-posts").permitAll()
                        .anyExchange().authenticated()
                )
//                Handle token rotation and setting the Authorization header from the cookies
                .addFilterBefore(JwtRefreshFilter, SecurityWebFiltersOrder.AUTHENTICATION)
//                Verifying the JWT token with the Keycloak
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))

                .build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowCredentials(true);
        config.setAllowedOrigins(allowedOrigins); // Allow frontend
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setExposedHeaders(List.of("Set-Cookie")); // Needed for cookies

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
