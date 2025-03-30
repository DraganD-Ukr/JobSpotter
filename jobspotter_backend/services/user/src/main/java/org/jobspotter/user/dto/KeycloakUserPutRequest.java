package org.jobspotter.user.dto;

import lombok.*;

/**
 * Keycloak user put request DTO. Used to update the user information in Keycloak.
 */
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KeycloakUserPutRequest {

    private String firstName;
    private String lastName;
    private String email;

}
