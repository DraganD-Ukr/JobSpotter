package org.jobspotter.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;

@Configuration
public class JwtDecoderConfig {


    @Bean
    @Profile("!docker")  // Created when the "docker" profile is NOT active
    public JwtDecoder customJwtDecoder() {
        return JwtDecoders.fromIssuerLocation("http://localhost:9090/realms/JobSpotter");
    }

    @Bean
    @Profile("docker")  // Created when the "docker" profile is active
    public JwtDecoder dockerJwtDecoder() {
        return JwtDecoders.fromIssuerLocation("http://keycloak:8080/realms/JobSpotter");
    }

}
