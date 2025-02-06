package org.jobspotter.user.dto;


import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserPatchRequest {

    @Pattern(regexp = "^\\p{L}[\\p{L}'-]+$", message = "First name can only contain letters, spaces, apostrophes, and hyphens")
    private String firstName;

    @Pattern(regexp = "^\\p{L}[\\p{L}'-]+$", message = "Last name can only contain letters, spaces, apostrophes, and hyphens")
    private String lastName;

    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid email format. Correct format: test@domain.example")
    private String email;

    @Pattern(regexp = "^[a-zA-ZáéíóúÁÉÍÓÚ0-9_'-]{4,20}$", message = "Username must be at least 4 characters long and contain only letters and digits")
    private String username;

    @Pattern(regexp = "^(?<prefix>08[3-9])(?<subscriber>[0-9]{7})$", message = "Invalid phone number format")
    private String phoneNumber;

    @Size(min = 1, max = 255, message = "About me must be between 1 and 255 characters")
    private String about;

}
