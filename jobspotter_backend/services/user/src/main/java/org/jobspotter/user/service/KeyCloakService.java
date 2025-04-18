package org.jobspotter.user.service;

import org.jobspotter.user.dto.KeyCloakRegisterRequest;
import org.jobspotter.user.dto.KeycloakUserPutRequest;
import org.jobspotter.user.dto.TokenResponse;
import org.jobspotter.user.dto.UserLoginRequest;
import org.springframework.http.HttpStatus;

import java.util.UUID;


public interface KeyCloakService {

    String getAdminToken();

    void createUser(String token, KeyCloakRegisterRequest registerRequest);

    String getUserIDbyEmail(String token, String email);

    TokenResponse loginUser(UserLoginRequest loginRequest);

    HttpStatus logoutUser(UUID userId);

    HttpStatus updateUser(KeycloakUserPutRequest userPutRequest, UUID userId);

    void deleteUser(UUID userId);

    void disableUser(UUID userId);
}
