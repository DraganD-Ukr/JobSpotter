package org.jobspotter.user.dto;

import lombok.*;

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
