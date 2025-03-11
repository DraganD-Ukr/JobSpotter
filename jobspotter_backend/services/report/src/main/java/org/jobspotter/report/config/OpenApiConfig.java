package org.jobspotter.report.config;

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
                .servers(List.of(new Server().url("http://localhost:8084")))
                .info(new Info()
                        .title("Report Service API")
                        .version("0.0.1")
                        .description("Report Service API Documentation. This service is responsible for managing of reports. Only creation of reports is allowed for regular users. Only admin can interact with all reports.")
                        .summary("Report Service API Documentation")
                );
    }
}
