package org.jobspotter.user.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

/**
 * OpenAPI configuration class.
 */
@OpenAPIDefinition
@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .servers(List.of(new Server().url("http://localhost:8080")))
                .info(new Info()
                        .title("User Service API")
                        .version("1.0.0")
                        .description("This service is responsible for managing user accounts, addresses, authentication and authorization.")
                        .summary("User Service API Documentation")
                );
    }
}
