package org.jobspotter.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jobspotter.user.dto.TokenResponse;
import org.jobspotter.user.dto.UserLoginRequest;
import org.jobspotter.user.dto.UserRegisterRequest;
import org.jobspotter.user.dto.UserResponse;
import org.jobspotter.user.service.UserService;
import org.jobspotter.user.service.implementation.KeyCloakServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final KeyCloakServiceImpl keyCloakServiceImpl;

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

    @PostMapping("/auth/refresh")
    public ResponseEntity<TokenResponse> refreshToken(@CookieValue("RefreshToken") String refreshToken) {
        log.info("Refreshing token");
        TokenResponse tokenResponse = keyCloakServiceImpl.refreshToken(refreshToken);
        return ResponseEntity.ok(tokenResponse);

    }



    @PostMapping("/auth/logout")
    public ResponseEntity<HttpStatus> logout(
            @RequestHeader("Authorization") String accessToken,
            HttpServletResponse response
    ) throws Exception {
        log.info("Logging out user");
        ResponseEntity<HttpStatus> status = userService.logoutUser(accessToken);

        if (status.getStatusCode() == HttpStatus.NO_CONTENT) {

            log.info("User logged out successfully");

            clearCookie("AccessToken", response);
            clearCookie("RefreshToken", response);

            log.info("Cookies cleared");
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @GetMapping("/me")
    public ResponseEntity<UserResponse> myProfile(
            @RequestHeader("Authorization") String accessToken
    ) {
        log.info("Getting user details");
        return userService.getUserById(accessToken);
    }


    private void clearCookie(String name, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, "");
        cookie.setMaxAge(0); // Expires immediately
        cookie.setPath("/"); // Apply to all endpoints
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Ensure it's used only over HTTPS

        response.addCookie(cookie);
    }


}
