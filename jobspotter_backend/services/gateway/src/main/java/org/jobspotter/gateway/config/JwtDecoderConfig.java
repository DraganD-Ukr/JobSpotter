package org.jobspotter.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtDecoders;

@Configuration
public class JwtDecoderConfig {


    @Bean
    public JwtDecoder customJwtDecoder() {
        return JwtDecoders.fromIssuerLocation("http://localhost:9090/realms/JobSpotter");
    }

}
