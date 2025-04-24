package org.jobspotter.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;


/**
 * The error response model of the JobSpotter. Used in {@link org.jobspotter.user.handler.GlobalExceptionHandler}
 */
@AllArgsConstructor
@Getter
@Setter
public class ErrorResponse {

    /**
     * The timestamp of the error.
     */
    private LocalDateTime timestamp;

    /**
     * The status of the error.
     */
    private String status;

    /**
     * The code of the error.
     */
    private int code;

    /**
     * The message of the error.
     */
    private String message;

}
