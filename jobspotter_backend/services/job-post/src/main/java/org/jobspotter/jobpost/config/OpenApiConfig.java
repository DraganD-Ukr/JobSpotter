package org.jobspotter.jobpost.config;

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
                        .title("Job Post Service API")
                        .version("1.0.0")
                        .description("Job Post Service API Documentation. This service is responsible for managing of both applied and created job posts, creating new job posts and applying to them.")
                        .summary("Job Post Service API Documentation")
                );
    }
}
