package org.jobspotter.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

/**
 * The token response DTO. Mirrors the response from the Keycloak token endpoint.
 */
@AllArgsConstructor
@Getter
@Setter
public class TokenResponse {

    /**
     * The access token.
     */
    private String access_token;
    /**
     * The time in milliseconds until the access token expires.
     */
    private int expires_in;
    /**
     * The time in milliseconds until the refresh token expires.
     */
    private int refresh_expires_in;
    /**
     * The refresh token.
     */
    private String refresh_token;
    /**
     * The token type.
     */
    private String token_type;
    /**
     * The scope.
     */
    private int not_before_policy;
}
