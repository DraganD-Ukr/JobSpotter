package org.jobspotter.user.service;

import org.jobspotter.user.dto.KeyCloakRegisterRequest;
import org.jobspotter.user.dto.UserLoginRequest;
import org.springframework.http.HttpStatus;

import java.util.UUID;


public interface KeyCloakService {

    String getAdminToken();

    void createUser(String token, KeyCloakRegisterRequest registerRequest);

    String getUserIDbyEmail(String token, String email);

    Object loginUser(String token, UserLoginRequest loginRequest);

    Object refreshToken(String refreshToken);

    HttpStatus logoutUser(UUID userId);
}
