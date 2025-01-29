package org.jobspotter.user.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Builder;

@AllArgsConstructor
@Builder
public class UserRegisterRequest {

    // Generic validation for names (first and last) - allowing alphabetic characters and spaces
    @NotEmpty(message = "First name cannot be empty")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "First name can only contain letters and spaces")
    String firstName;

    @NotEmpty(message = "Last name cannot be empty")
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Last name can only contain letters and spaces")
    String lastName;

    // Simplified password validation - just check for general format
    @NotEmpty(message = "Password cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9!@#$%^&*()_+]{8,}$", message = "Password must be at least 8 characters long and contain only letters, digits, and special characters")
    String password;

    // Email validation
    @NotEmpty(message = "Email cannot be empty")
    @Email(message = "Invalid email format")
    String email;
}
