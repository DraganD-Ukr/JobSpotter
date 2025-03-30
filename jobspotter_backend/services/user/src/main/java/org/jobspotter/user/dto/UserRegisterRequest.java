package org.jobspotter.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

/**
 * The user register request DTO. Used to register a new user.
 */
@Getter
@AllArgsConstructor
@Builder
public class UserRegisterRequest {

    // Note: could have better regex
    @Schema(description = "Username", example = "john_doe")
    @NotEmpty(message = "Username cannot be empty")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚ0-9_'-]{4,20}$", message = "Username must be at least 4 characters long and contain only letters and digits")
    String username;


    @Schema(description = "First name", example = "John")
    @NotEmpty(message = "First name cannot be empty")
    @Pattern(regexp = "^\\p{L}[\\p{L}'-]+$", message = "First name can only contain letters, spaces, apostrophes, and hyphens")
    String firstName;

    @Schema(description = "Last name", example = "Doe")
    @NotEmpty(message = "Last name cannot be empty")
    @Pattern(regexp = "^\\p{L}[\\p{L}'-]+$", message = "Last name can only contain letters, spaces, apostrophes, and hyphens")
    String lastName;

    @Schema(description = "Password", example = "Password123!")
    // Simplified password validation - just check for general format
    @NotEmpty(message = "Password cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9!@#$%^&*()_+]{8,}$", message = "Password must be at least 8 characters long and contain only letters, digits, and special characters")
    String password;

    @Schema(description = "Email", example = "johnDoe@example.com")
    // Email validation
    @NotEmpty(message = "Email cannot be empty")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid email format. Correct format: test@domain.example")
    String email;
}
