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
import org.jobspotter.user.exception.InvalidFileExtensionException;
import org.jobspotter.user.exception.ResourceAlreadyExistsException;
import org.jobspotter.user.exception.ResourceNotFoundException;
import org.jobspotter.user.exception.UnauthorizedException;
import org.jobspotter.user.fileUtils.FileUtils;
import org.jobspotter.user.jwtUtils.JwtUtils;
import org.jobspotter.user.model.User;
import org.jobspotter.user.model.UserType;
import org.jobspotter.user.repository.UserRepository;
import org.jobspotter.user.service.KeyCloakService;
import org.jobspotter.user.service.S3BucketService;
import org.jobspotter.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final S3BucketService s3BucketService;
    private final KeyCloakService keyCloakService;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    @Override
    public ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) {
        if (userRepository.existsByUsernameAndEmail(userRegisterRequest.getUsername(), userRegisterRequest.getEmail())) {
            log.warn("Could not register user: user with same email or username already exists");
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
    public ResponseEntity<UserResponse> getUserById(UUID userId) throws Exception {
        User user;



        user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));



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

    /**
     * Upload user profile picture to S3 bucket
     *
     * @param multipartFile uploaded file
     * @param userId user id of the user
     * @return ResponseEntity<HttpStatus> response entity
     */
    //upload user profile picture
    @Override
    public ResponseEntity<HttpStatus> uploadProfilePicture(UUID userId, MultipartFile multipartFile) throws Exception {

        //check if file is empty
        if(multipartFile.isEmpty()){
            log.warn("No file uploaded");
            throw new ResourceNotFoundException("No file uploaded");

            //check if file is an image
        } else if (!FileUtils.isImage(multipartFile.getOriginalFilename())) {
            log.warn("Wrong file type uploaded");
            throw new InvalidFileExtensionException( multipartFile.getOriginalFilename(),FileUtils.IMAGE_EXTENSIONS);
        }

        //upload file to S3 bucket
        s3BucketService.uploadFile(userId, multipartFile);

        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    /**
     * Delete user profile picture from S3 bucket
     *
     * @param userId user id of the user
     * @return ResponseEntity<HttpStatus> response entity
     */
    //delete user profile picture
    @Override
    public ResponseEntity<HttpStatus> deleteProfilePicture(UUID userId) throws Exception {

        //delete file from S3 bucket
        s3BucketService.deleteFile(userId);

        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
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

    @Override
    public ResponseEntity<HttpStatus> deleteUser(String accessToken, UUID userId) throws Exception {
        authorizeUser(userId, accessToken);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));

        userRepository.delete(user);
        log.info("User with Id: {} deleted successfully from user db", userId);

        keyCloakService.deleteUser(userId);

//        TODO: delete user from all other services(notify job-post service, applicants who applied to jobs, etc)

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public void disableUser(UUID userId) {
        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));

        keyCloakService.disableUser(userId);
        log.info("User with Id: {} disabled successfully", userId);
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


    private void authorizeUser(UUID resourceUserId, String accessToken) throws Exception {

        UUID tokenUserId = JWTUtils.getUserIdFromToken(accessToken);


        if (!tokenUserId.equals(resourceUserId) && !jwtUtils.hasAdminRole(accessToken)) {
            log.warn("User with Id: {} is not authorized to access resource with Id: {}", tokenUserId, resourceUserId);
            throw new UnauthorizedException("Unauthorized access");
        }

    }

}
