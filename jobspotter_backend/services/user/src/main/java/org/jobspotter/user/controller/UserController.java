package org.jobspotter.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jobspotter.user.authUtils.JWTUtils;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.service.UserService;
import org.jobspotter.user.service.implementation.KeyCloakServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.Duration;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private static final Logger log = LoggerFactory.getLogger(UserController.class);
    private final UserService userService;
    private final KeyCloakServiceImpl keyCloakServiceImpl;

    @Operation(summary = "Register a new user")
     @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "User created"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "409", description = "User already exists",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PostMapping("/auth/register")
    public ResponseEntity<HttpStatus> createUser(
            @RequestBody @Valid UserRegisterRequest userRegisterRequest
            ) throws Exception {
        log.info("Creating user");

        userService.registerUser(userRegisterRequest);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(summary = "Login a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User logged in",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = TokenResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid credentials",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })



    @PostMapping("/auth/login")
    public ResponseEntity<Object> login(
            @RequestBody @Valid UserLoginRequest userLoginRequest
            ) {
        log.info("Logging in user");

        TokenResponse tokenResponse = keyCloakServiceImpl.loginUser(userLoginRequest);

        if (tokenResponse == null || tokenResponse.getAccess_token() == null || tokenResponse.getRefresh_token() == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

//        Extract the expiration times from the token response and convert them to minutes
        int accessTokenExpiresIn = tokenResponse.getExpires_in()/60;
        int refreshTokenExpiresIn = tokenResponse.getRefresh_expires_in()/60;

        // Create HttpOnly Cookies
        ResponseCookie accessTokenCookie = ResponseCookie.from("AccessToken", tokenResponse.getAccess_token())
                .httpOnly(true)
                .secure(false) // Ensure it's secure, especially in production (requires HTTPS)
                .path("/") // Available to all endpoints
                .maxAge(Duration.ofMinutes(accessTokenExpiresIn)) // Set expiration (adjust accordingly)
                .sameSite("Strict") // Prevent CSRF attacks
                .build();

        ResponseCookie refreshTokenCookie = ResponseCookie.from("RefreshToken", tokenResponse.getRefresh_token())
                .httpOnly(true)
                .secure(false)
                .path("/")
                .maxAge(Duration.ofMinutes(refreshTokenExpiresIn))
                .sameSite("Strict")
                .build();

        // Return the response with cookies
        return ResponseEntity.ok()
                .header(HttpHeaders.SET_COOKIE, accessTokenCookie.toString())
                .header(HttpHeaders.SET_COOKIE, refreshTokenCookie.toString())
                .body("Login successful");

    }


    @Operation(summary = "Logout a user")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "User logged out"),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PostMapping("/auth/logout")
    public ResponseEntity<HttpStatus> logout(
            @RequestHeader("Authorization") String accessToken,
            HttpServletResponse response
    ) throws Exception {

        log.info("Logging out user with ID:, {}", JWTUtils.getUserIdFromToken(accessToken));

        userService.logoutUser(accessToken);

        clearCookie("AccessToken", response);
        clearCookie("RefreshToken", response);

        log.info("Cookies cleared");

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

    @Operation(summary = "Get user details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User details retrieved",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid token",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/me")
    public ResponseEntity<UserResponse> myProfile(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {

        log.info("Getting user details");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return ResponseEntity.ok(userService.getUserById(userId));
    }

//    Get user by id
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponse> getUserById(
            @PathVariable UUID userId
    ) throws Exception {

        log.info("Getting user details");

        return ResponseEntity.ok(userService.getUserById(userId));
    }


    @GetMapping()
    public ResponseEntity<Map<UUID, UserBasicInfoResponse>> getUsersBasicInfo(
            @RequestParam List<UUID> userIds
            ) {
        log.info("Getting user details");

        return ResponseEntity.ok(userService.getAllByIds(userIds));
    }



    @Operation(summary = "Marked for removal, see (DELETE /api/v1/users/{userId}). Update user details")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "User details updated",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = UserResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid token",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PatchMapping("/me")
    public ResponseEntity<UserResponse> updateProfile(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid UserPatchRequest userPatchRequest
    ) throws Exception {

        log.info("Updating user details");

        UserResponse res = userService.updateUserById(accessToken, userPatchRequest, JWTUtils.getUserIdFromToken(accessToken));

        return res == null ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : ResponseEntity.ok(res);

    }

    @PatchMapping("/{userId}")
    public ResponseEntity<UserResponse> updateProfileById(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid UserPatchRequest userPatchRequest,
            @PathVariable UUID userId
    ) throws Exception {

        log.info("Updating user details");
        UserResponse res = userService.updateUserById(accessToken, userPatchRequest, userId);

        return res == null ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() : ResponseEntity.ok(res);

    }

    @Operation(summary = "Update user profile image")
    @ApiResponses(value = {
                    @ApiResponse(responseCode = "200", description = "Profile image updated"),
                    @ApiResponse(responseCode = "400", description = "Bad request",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid token",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(responseCode = "500", description = "Internal server error",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    @PutMapping("/me/profile-image")
    public ResponseEntity<HttpStatus> updateProfileImage(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam("profileImage") MultipartFile profileImage
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        log.info("Updating user profile image");

        userService.uploadProfilePicture(userId, profileImage);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Delete user profile image")
    @ApiResponses(value = {
                    @ApiResponse(responseCode = "204", description = "Profile image deleted"),
                    @ApiResponse(responseCode = "401", description = "Unauthorized: Invalid token",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(responseCode = "404", description = "Profile image not found",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)
                            )
                    ),
                    @ApiResponse(responseCode = "500", description = "Internal server error",
                            content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class)
                            )
                    )
            }
    )
    @DeleteMapping("/me/profile-image")
    public ResponseEntity<HttpStatus> deleteProfileImage(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        log.info("Deleting user profile image");
        userService.deleteProfilePicture(userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @DeleteMapping("/{userId}")
    public ResponseEntity<HttpStatus> deleteUser(
            @PathVariable UUID userId,
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        log.info("Deleting user");

        userService.deleteUser(accessToken, userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


    @PutMapping("/{userId}/disable")
    public ResponseEntity<HttpStatus> disableUser(
            @PathVariable UUID userId,
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {


        log.info("Disabling user");
        userService.disableUser(accessToken, userId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }




    private void clearCookie(String name, HttpServletResponse response) {
        Cookie cookie = new Cookie(name, "");
        cookie.setMaxAge(0); // Expires immediately
        cookie.setPath("/"); // Apply to all endpoints
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // Ensure it's used only over HTTPS

        response.addCookie(cookie);
    }


//    ---------------------------------------STATISTICS-----------------------------------

    @GetMapping("/count")
    public ResponseEntity<Integer> getTotalUsersCount(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        log.info("Getting statistics");
        return ResponseEntity.ok(userService.getTotalUsersCount(accessToken));
    }


}
