package org.jobspotter.user.service.implementation;


import org.jobspotter.user.dto.*;
import org.jobspotter.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class UserServiceImpl implements UserService {
    @Override
    public ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) {
        return null;
    }

    @Override
    public ResponseEntity<Object> loginUser(UserLoginRequest userLoginRequest) {
        return null;
    }

}
