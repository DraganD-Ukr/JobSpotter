package org.jobspotter.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.user.dto.UserLoginRequest;
import org.jobspotter.user.dto.UserRegisterRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    // Create a new user
    @PostMapping("/register")
    public ResponseEntity<HttpStatus> createuser(
            @RequestBody @Valid UserRegisterRequest userRegisterRequest
            ) {
        log.info("Creating user");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<HttpStatus> login(
            @RequestBody @Valid UserLoginRequest userLoginRequest
            ) {
        log.info("Logging in user");
        return new ResponseEntity<>(HttpStatus.OK);
    }


}
