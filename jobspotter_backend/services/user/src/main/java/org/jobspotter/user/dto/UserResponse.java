package org.jobspotter.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jobspotter.user.model.UserType;

import java.time.LocalDateTime;
import java.util.UUID;

/**
 * The user representation(profile) response DTO.
 */
@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponse {

    /**
     * The user id.
     */
    private UUID userId;

    /**
     * The username.
     */
    private String username;

    /**
     * The first name of the user.
     */
    private String firstName;

    /**
     * The last name of the user.
     */
    private String lastName;

    /**
     * The email of the user.
     */
    private String email;

    /**
     * Irish phone number of the user.
     */
    private String phoneNumber;

    /**
     * The "about" of the user.
     */
    private String about;

    /**
     * Created at timestamp.
     */
    private LocalDateTime createdAt;

    /**
     * Last updated at timestamp.
     */
    private LocalDateTime lastUpdatedAt;

    /**
     * The user type.
     */
    private UserType userType;


}
