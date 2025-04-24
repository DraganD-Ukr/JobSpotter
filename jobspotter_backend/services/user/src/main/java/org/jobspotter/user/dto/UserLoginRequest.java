package org.jobspotter.user.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;

/**
 * The user login request DTO. Used to authenticate a user.
 */
@Data
@AllArgsConstructor
public class UserLoginRequest {


//TODO: Allow for either username or email to be used for login

    @Schema(description = "Username", example = "john_doe")
    @NotBlank(message = "Username cannot be empty")
    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚ0-9_'-]{4,20}$", message = "Username must be at least 4 characters long and contain only letters and digits")
    String username;

    @Schema(description = "Password", example = "Password123!")
    // Simplified password validation - just check for general format
    @NotBlank(message = "Password cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9!@#$%^&*()_+]{8,}$", message = "Password must be at least 8 characters long and contain only letters, digits, and special characters")
    String password;

}
