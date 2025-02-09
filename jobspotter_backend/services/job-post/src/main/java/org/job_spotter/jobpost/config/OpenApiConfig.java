package org.job_spotter.jobpost.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@OpenAPIDefinition
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .servers(List.of(new Server().url("http://localhost:8081")))
                .info(new Info()
                        .title("Job Post Service API")
                        .version("1.0.0")
                        .description("Job Post Service API Documentation. This service is responsible for managing of both applied and created job posts, creating new job posts and applying to them.")
                        .summary("Job Post Service API Documentation")
                );
    }
}
