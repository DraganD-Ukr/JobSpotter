package org.jobspotter.user.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.validation.annotation.Validated;

@Data
@AllArgsConstructor
public class UserLoginRequest {
    // Simplified username validation - just check for general format
    //Takes in both username and email

    // Note: could have better regex
    @NotBlank(message = "Username cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9]{4,}$", message = "Username must be at least 4 characters long and contain only letters and digits")
    String username;

    // Simplified password validation - just check for general format
    @NotBlank(message = "Password cannot be empty")
    @Pattern(regexp = "^[A-Za-z0-9!@#$%^&*()_+]{8,}$", message = "Password must be at least 8 characters long and contain only letters, digits, and special characters")
    String password;

}
