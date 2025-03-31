package org.jobspotter.user.handler;

import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.user.dto.ErrorResponse;
import org.jobspotter.user.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.Arrays;

@Slf4j
@ControllerAdvice
public class GlobalExceptionHandler {

    /**
     * Handle ENUMs specific exceptions
     * @param ex InvalidFormatException
     * @return ResponseEntity with the error message and allowed values
     */
    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ErrorResponse> handleHttpMessageNotReadableException(HttpMessageNotReadableException ex) {
        // Check if the cause of the exception is an InvalidFormatException (deserialization issue)
        if (ex.getCause() instanceof InvalidFormatException) {
            InvalidFormatException invalidFormatException = (InvalidFormatException) ex.getCause();

            // Extract relevant information for the error message
            String fieldName = invalidFormatException.getPath().get(0).getFieldName();
            String invalidValue = invalidFormatException.getValue().toString();  // Get the invalid value
            String allowedValues = Arrays.toString(invalidFormatException.getTargetType().getEnumConstants());

            // Format the error message without the unwanted prefix
            String formattedErrorMessage = String.format("Invalid value for %s: '%s'. Allowed values are: %s",
                    fieldName, invalidValue, allowedValues);

            // Create the ErrorResponse object with the cleaned message
            ErrorResponse errorResponse = new ErrorResponse(
                    LocalDateTime.now(),
                    "BAD_REQUEST",
                    HttpStatus.BAD_REQUEST.value(),
                    formattedErrorMessage
            );

            return ResponseEntity.badRequest().body(errorResponse);
        }

        // If it's not related to InvalidFormatException, return a generic message
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "BAD_REQUEST",
                HttpStatus.BAD_REQUEST.value(),
                "Invalid input format"
        );

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }




    /**
     * Handle general JSON mapping exceptions (e.g., missing required fields, malformed JSON)
     */
    @ExceptionHandler(JsonMappingException.class)
    public ResponseEntity<ErrorResponse> handleJsonMappingException(JsonMappingException ex) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "BAD_REQUEST",
                HttpStatus.BAD_REQUEST.value(),
                "JSON mapping error: " + ex.getOriginalMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * Handle validation errors
     * @param ex MethodArgumentNotValidException
     * @return ResponseEntity with the described validation errors
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Create a list to hold all error messages
        StringBuilder errorMessages = new StringBuilder();

        // Iterate through all the field errors and append the message to the errorMessages StringBuilder
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String errorMessage = error.getDefaultMessage();
            if (!errorMessages.isEmpty()) {
                errorMessages.append(", ");
            }
            errorMessages.append(errorMessage);
        });

        // Create the ErrorResponse with the formatted messages
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "BAD_REQUEST",
                HttpStatus.BAD_REQUEST.value(),
                errorMessages.toString()
        );

        // Return the response
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }


    /**
     * Handles InvalidCredentialsException.Thrown when the user provides invalid credentials for login.
     * @param e InvalidCredentialsException.
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ErrorResponse> handleInvalidCredentialsException(InvalidCredentialsException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "UNAUTHORIZED",
                HttpStatus.UNAUTHORIZED.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    /**
     * Handles InvalidRequestException. Thrown when the user provides invalid input.
     * @param e InvalidRequestException
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(InvalidRequestException.class)
    public ResponseEntity<ErrorResponse> handleInvalidRequestException(InvalidRequestException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "BAD_REQUEST",
                HttpStatus.BAD_REQUEST.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
    }

    /**
     * Handles ResourceNotFoundException. Thrown when the requested resource is not found.
     * @param e ResourceNotFoundException
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(ResourceNotFoundException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "NOT_FOUND",
                HttpStatus.NOT_FOUND.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(errorResponse);
    }

    /**
     * Handles ResourceAlreadyExistsException. Thrown when the requested resource already exists.
     * @param e ResourceAlreadyExistsException
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(ResourceAlreadyExistsException.class)
    public ResponseEntity<ErrorResponse> handleResourceAlreadyExistsException(ResourceAlreadyExistsException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "CONFLICT",
                HttpStatus.CONFLICT.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.CONFLICT).body(errorResponse);
    }

    /**
     * Handles UnauthorizedException. Thrown when the user is not authorized to perform an action.
     * @param e UnauthorizedException
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(ForbiddenException.class)
    public ResponseEntity<ErrorResponse> handleForbiddenException(ForbiddenException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "FORBIDDEN",
                HttpStatus.FORBIDDEN.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(errorResponse);
    }

    /**
     * Handles UnauthorizedException. Thrown when valid authentication credentials were not provided to access the resource.
     * @param e UnauthorizedException
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(UnauthorizedException.class)
    public ResponseEntity<ErrorResponse> handleUnauthorizedException(UnauthorizedException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "UNAUTHORIZED",
                HttpStatus.UNAUTHORIZED.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
    }

    /**
     * Handles ServerException. Thrown when an internal server error occurs.
     * @param e ServerException
     * @return ResponseEntity with the error message.
     */
    @ExceptionHandler(ServerException.class)
    public ResponseEntity<ErrorResponse> handleServerException(ServerException e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "INTERNAL_SERVER_ERROR",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                e.getMessage()
        );
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }

    /**
     * Handle generic exceptions
     * @param e Exception
     * @return ResponseEntity with the short error message
     */
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGenericException(Exception e) {
        ErrorResponse errorResponse = new ErrorResponse(
                LocalDateTime.now(),
                "INTERNAL_SERVER_ERROR",
                HttpStatus.INTERNAL_SERVER_ERROR.value(),
                e.getMessage()
        );
        log.error("An error occurred: ", e);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
    }
}