package org.jobspotter.user.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserLoginRequest {
    // Simplified username validation - just check for general format
    // Note: could have better regex
    @NotEmpty(message = "username cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9]{4,}$", message = "username must be at least 4 characters long and contain only letters and digits")
    String username;

    // Simplified password validation - just check for general format
    @NotEmpty(message = "Password cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9!@#$%^&*()_+]{8,}$", message = "Password must be at least 8 characters long and contain only letters, digits, and special characters")
    String password;

}
