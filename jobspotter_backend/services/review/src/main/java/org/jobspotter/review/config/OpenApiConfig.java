package org.jobspotter.review.config;

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
                .servers(List.of(new Server().url("http://localhost:8082")))
                .info(new Info()
                        .title("Review Service API")
                        .version("1.0.0")
                        .description("Review Service API Documentation. This service is responsible for managing of reviews for job posts.")
                        .summary("Review Service API Documentation")
                );
    }
}

