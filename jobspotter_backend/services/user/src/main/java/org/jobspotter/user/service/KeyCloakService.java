package org.jobspotter.user.service;

import org.jobspotter.user.dto.KeyCloakRegisterRequest;
import org.jobspotter.user.dto.UserLoginRequest;


public interface KeyCloakService {

    String getAdminToken();

    void createUser(String token, KeyCloakRegisterRequest registerRequest);

    String getUserIDbyEmail(String token, String email);

    Object loginUser(String token, UserLoginRequest loginRequest);

}
