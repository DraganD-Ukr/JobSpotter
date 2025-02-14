package org.jobspotter.user.service.implementation;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.user.authUtils.JWTUtils;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.exception.ResourceAlreadyExistsException;
import org.jobspotter.user.exception.ResourceNotFoundException;
import org.jobspotter.user.model.User;
import org.jobspotter.user.model.UserType;
import org.jobspotter.user.repository.UserRepository;
import org.jobspotter.user.service.KeyCloakService;
import org.jobspotter.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final KeyCloakService keyCloakService;
    private final UserRepository userRepository;

    @Override
    public ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) {
        if (userRepository.existsByUsernameAndEmail(userRegisterRequest.getUsername(), userRegisterRequest.getEmail())) {
            throw new ResourceAlreadyExistsException("User already exists");
        }

        String adminToken = keyCloakService.getAdminToken();

        KeyCloakRegisterRequest keyCloakRegisterRequest = new KeyCloakRegisterRequest(
                true,
                userRegisterRequest.getFirstName(),
                userRegisterRequest.getLastName(),
                userRegisterRequest.getEmail(),
                userRegisterRequest.getUsername(),
                List.of(new KeyCloakRegisterRequest.Credentials(userRegisterRequest.getPassword()))
        );

        keyCloakService.createUser(adminToken, keyCloakRegisterRequest);

        String userId = keyCloakService.getUserIDbyEmail(userRegisterRequest.getEmail(), adminToken);

        User user = User.builder()
                .userId(UUID.fromString(userId))
                .username(userRegisterRequest.getUsername())
                .email(userRegisterRequest.getEmail())
                .firstName(userRegisterRequest.getFirstName())
                .lastName(userRegisterRequest.getLastName())
                .userType(UserType.USER)
                .build();

        log.debug("Saving user: {}", user);

        userRepository.save(user);
        log.info("User with Id: {} created successfully",userId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public TokenResponse loginUser(UserLoginRequest userLoginRequest) {
        return keyCloakService.loginUser(userLoginRequest);
    }

    @Override
    public ResponseEntity<HttpStatus> logoutUser(String accessToken) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        HttpStatus status = keyCloakService.logoutUser(userId);

        if (status == HttpStatus.NO_CONTENT) {
            log.info("User with Id: {} logged out successfully", userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            log.warn("Failed to log out user with Id: {}", userId);
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }


    }

    @Override
    public ResponseEntity<UserResponse> getUserById(String accessToken) {
        User user;
        try {
            user = userRepository.findByUserId(JWTUtils.getUserIdFromToken(accessToken));
        } catch (Exception e) {
            log.error("Failed to get user details", e);
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .about(user.getAbout())
                .createdAt(user.getCreatedAt())
                .lastUpdatedAt(user.getLastUpdatedAt())
                .userType(user.getUserType())
                .build(), HttpStatus.OK
        );

    }

    @Override
    public ResponseEntity<UserResponse> updateUser(UUID userId, UserPatchRequest userPatchRequest) {

        User user = userRepository.findById(userId)
                .orElseThrow( () -> new ResourceNotFoundException("User with id " + userId + " not found"));

        if (!updateUserFromPatch(user, userPatchRequest)) {
            log.info("Request to update user with id: {} was successful, however no changes detected", userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        log.info("Updating user with id: {}", userId);
        userRepository.save(user);

        return ResponseEntity.ok(UserResponse.builder()
                .userId(user.getUserId())
                .username(user.getUsername())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .about(user.getAbout())
                .createdAt(user.getCreatedAt())
                .lastUpdatedAt(LocalDateTime.now())
                .userType(user.getUserType())
                .build()
        );
    }

    @Override
    public ResponseEntity<Map<UUID, UserBasicInfoResponse>> getAllByIds(List<UUID> userIds) {

        List<User> users = userRepository.findAllByUserIdIn(userIds);

        // Use stream to collect the data into a map
        Map<UUID, UserBasicInfoResponse> usersResponseMap = users.stream()
                .collect(Collectors.toMap(
                        User::getUserId,
                        user -> UserBasicInfoResponse.builder()
                                .userId(user.getUserId())
                                .username(user.getUsername())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .build()
                ));

        // Return the map wrapped in a ResponseEntity
        return ResponseEntity.ok(usersResponseMap);

    }


    private boolean updateUserFromPatch(User user, UserPatchRequest userPatchRequest){
        boolean updated = false;
        boolean toUpdateKeycloak = false;

        KeycloakUserPutRequest keycloakUserPutRequest = new KeycloakUserPutRequest();

        if (userPatchRequest.getFirstName() != null && !userPatchRequest.getFirstName().equals(user.getFirstName())) {
            user.setFirstName(userPatchRequest.getFirstName());
            toUpdateKeycloak = true;
            updated = true;
        }

        if (userPatchRequest.getLastName() != null && !userPatchRequest.getLastName().equals(user.getLastName())) {
            user.setLastName(userPatchRequest.getLastName());
            toUpdateKeycloak = true;
            updated = true;
        }

        if (userPatchRequest.getEmail() != null && !userPatchRequest.getEmail().equals(user.getEmail())) {
            user.setEmail(userPatchRequest.getEmail());
            toUpdateKeycloak = true;
            updated = true;
        }

        if (userPatchRequest.getPhoneNumber() != null && !userPatchRequest.getPhoneNumber().equals(user.getPhoneNumber())) {
            user.setPhoneNumber(userPatchRequest.getPhoneNumber());
            updated = true;
        }

        if (userPatchRequest.getAbout() != null && !userPatchRequest.getAbout().equals(user.getAbout())) {
            user.setAbout(userPatchRequest.getAbout());
            updated = true;
        }

        if (toUpdateKeycloak) {
            keycloakUserPutRequest.setFirstName(user.getFirstName());
            keycloakUserPutRequest.setLastName(user.getLastName());
            keycloakUserPutRequest.setEmail(user.getEmail());
            keyCloakService.updateUser(keycloakUserPutRequest, user.getUserId());
        }

        return updated;

    }

}
