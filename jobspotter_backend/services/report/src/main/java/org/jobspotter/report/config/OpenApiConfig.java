package org.jobspotter.report.config;

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
                        .title("Report Service API")
                        .version("0.0.1")
                        .description("Report Service API Documentation. This service is responsible for managing of reports. Only creation of reports is allowed for regular users. Only admin can interact with all reports.")
                        .summary("Report Service API Documentation")
                );
    }
}
