package org.jobspotter.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {

    @Schema(description = "Timestamp of the error", example = "2021-08-01T12:00:00")
    private LocalDateTime timestamp;

    @Schema(description = "Status of the error", example = "error")
    private String status;

    @Schema(description = "HTTP status code of the error", example = "400")
    private int code;

    @Schema(description = "Message of the error", example = "Invalid input...")
    private String message;

}
