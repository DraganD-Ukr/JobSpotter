package org.jobspotter.user.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;

/**
 * The user patch request DTO. Used to update the user information using PATCH.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserPatchRequest {

    @Schema(description = "First name", example = "John")
    @Pattern(regexp = "^\\p{L}[\\p{L}'-]+$", message = "First name can only contain letters, spaces, apostrophes, and hyphens")
    private String firstName;

    @Schema(description = "Last name", example = "Doe")
    @Pattern(regexp = "^\\p{L}[\\p{L}'-]+$", message = "Last name can only contain letters, spaces, apostrophes, and hyphens")
    private String lastName;

    @Schema(description = "Email", example = "johnDoe@test.com")
    @Pattern(regexp = "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$", message = "Invalid email format. Correct format: test@domain.example")
    private String email;

    @Schema(description = "Phone number", example = "08123456789")
    @Pattern(regexp = "^(?<prefix>08[3-9])(?<subscriber>[0-9]{7})$", message = "Invalid phone number format")
    private String phoneNumber;

    @Schema(description = "About me", example = "I am a software engineer")
    @Size(min = 1, max = 255, message = "About me must be between 1 and 255 characters")
    private String about;

}
