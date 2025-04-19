package org.jobspotter.review.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Review Service API")
                        .version("1.0.0")
                        .description("Review Service API Documentation. This service is responsible for managing of reviews for job posts.")
                        .summary("Review Service API Documentation")
                );
    }
}

