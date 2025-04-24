package org.jobspotter.user.dto;

import lombok.*;

import java.util.UUID;

/**
 * The user basic info response DTO. Used to return the basic information of a user(used by other services to fetch basic info for batch of users).
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserBasicInfoResponse {

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


}
