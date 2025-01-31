package org.jobspotter.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jobspotter.user.dto.UserLoginRequest;
import org.jobspotter.user.dto.UserRegisterRequest;
import org.jobspotter.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;

    // Create a new user
    @PostMapping("/auth/register")
    public ResponseEntity<HttpStatus> createUser(
            @RequestBody @Valid UserRegisterRequest userRegisterRequest
            ) throws Exception {
        log.info("Creating user");
        return userService.registerUser(userRegisterRequest);
    }

    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(
            @RequestBody @Valid UserLoginRequest userLoginRequest
            ) {
        log.info("Logging in user");
        return userService.loginUser(userLoginRequest);
    }


}
