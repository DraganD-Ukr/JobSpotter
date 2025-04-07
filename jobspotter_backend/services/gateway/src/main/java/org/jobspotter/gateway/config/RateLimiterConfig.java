package org.jobspotter.gateway.config;

import org.springframework.cloud.gateway.filter.ratelimit.KeyResolver;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Configuration
public class RateLimiterConfig {


    /**
     * KeyResolver for rate limiting based on the client's IP address. A unique key is generated for each client based on their original IP address.
     * @return {@link KeyResolver} that resolves the key based on the client's IP address.
     */
    @Bean
    public KeyResolver ipKeyResolver() {
        return exchange -> {
            String ip = extractClientIp(exchange);
            return Mono.just(ip);
        };
    }

    private String extractClientIp(ServerWebExchange exchange) {

//        Get the client IP address from the X-Forwarded-For header (in case the request is behind a proxy)
        String clientIp = exchange.getRequest().getHeaders().getFirst("X-Forwarded-For");
        String result;

//        If the X-Forwarded-For header is not present, get the IP address from the request itself
        if (clientIp == null) {
            result = exchange.getRequest().getRemoteAddress().getAddress().getHostAddress();
        } else {
//            If the X-Forwarded-For header contains multiple IP addresses, take the first one( the original client IP)
            String[] ips = clientIp.split(",");

            result = ips[0].trim();
        }

        return result;
    }

}
