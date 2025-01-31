package org.jobspotter.user.service;
import org.apache.http.protocol.HTTP;
import org.jobspotter.user.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public interface UserService {
    ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) throws Exception;
    ResponseEntity<Object> loginUser(UserLoginRequest userLoginRequest);
}
