package org.jobspotter.user.service;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.model.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) throws Exception;
    ResponseEntity<Object> loginUser(UserLoginRequest userLoginRequest);

    ResponseEntity<HttpStatus> logoutUser(String accessToken) throws Exception;

    ResponseEntity<UserResponse> getUserById(String accessToken);
}
