package org.jobspotter.gateway.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Autowired
    private JwtRefreshFilter JwtRefreshFilter;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) throws Exception {

        return http
                .csrf(ServerHttpSecurity.CsrfSpec::disable)
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/api/v1/user/auth/**").permitAll()
                        .pathMatchers("/eureka/**").permitAll()
                        .anyExchange().authenticated()
                )
                .addFilterBefore(JwtRefreshFilter, SecurityWebFiltersOrder.AUTHENTICATION)
                .oauth2ResourceServer((oauth2) -> oauth2.jwt(Customizer.withDefaults()))

                .build();
    }
}
