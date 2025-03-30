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
import org.jobspotter.user.exception.*;
import org.jobspotter.user.fileUtils.FileUtils;
import org.jobspotter.user.model.User;
import org.jobspotter.user.model.UserType;
import org.jobspotter.user.repository.UserRepository;
import org.jobspotter.user.service.KeyCloakService;
import org.jobspotter.user.service.S3BucketService;
import org.jobspotter.user.service.UserService;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final S3BucketService s3BucketService;
    private final KeyCloakService keyCloakService;
    private final UserRepository userRepository;
    private final JWTUtils jwtUtils;

    /**
     * Register a new user. Creates user in keycloak(with essential information needed in keycloak) and user db.
     * @param userRegisterRequest User register request
     */
    @Override
    public void registerUser(UserRegisterRequest userRegisterRequest) {
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

    }


    /**
     * Login user. Returns access token and refresh token
     * @param userLoginRequest User login request
     * @return TokenResponse - login response needed for client to maintain session
     */
    @Override
    public TokenResponse loginUser(UserLoginRequest userLoginRequest) {
        return keyCloakService.loginUser(userLoginRequest);
    }


    /**
     * Logs out user by invalidating the cookies with tokens
     * @param accessToken access token
     * @throws Exception - if {@link JWTUtils} service fails
     */
    @Override
    public void logoutUser(String accessToken) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        HttpStatus status = keyCloakService.logoutUser(userId);

        if (status == HttpStatus.NO_CONTENT) {
            log.info("User with Id: {} logged out successfully", userId);
        } else {
            throw new InvalidRequestException("Invalid request");
        }


    }


    /**
     * Get user by id
     * @param userId user id
     * @return UserResponse - user representation
     */
    @Cacheable(value = "users", key = "#userId")
    @Override
    public UserResponse getUserById(UUID userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));

        return UserResponse.builder()
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
                .build();


    }


    /**
     * Update user information. Updates user in keycloak(if user's property belongs to keycloak as well) and user db.
     * @param userId user id
     * @param userPatchRequest user patch request
     * @return UserResponse - updated user representation or no content if no changes detected
     */
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

        UserResponse u = UserResponse.builder()
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
                .build();

        redisTemplate.opsForValue().set("users::"+ u.getUserId().toString(), u);

        return ResponseEntity.ok(u);
    }

    /**
     * Upload user profile picture to S3 bucket
     *
     * @param multipartFile uploaded file
     * @param userId user id
     */
    @Override
    public void uploadProfilePicture(UUID userId, MultipartFile multipartFile) throws Exception {

        //check if file is empty
        if(multipartFile.isEmpty()){
            log.warn("No file uploaded");
            throw new InvalidRequestException("No/Empty file uploaded");

            //check if file is an image
        } else if (!FileUtils.isImage(multipartFile.getOriginalFilename())) {
            log.warn("Wrong file type uploaded");
            throw new InvalidFileExtensionException(multipartFile.getOriginalFilename(), FileUtils.IMAGE_EXTENSIONS);
        }

        //upload file to S3 bucket
        s3BucketService.uploadFile(userId, multipartFile);

    }

    /**
     * Delete user profile picture from S3 bucket
     *
     * @param userId user id
     */
    @Override
    public void deleteProfilePicture(UUID userId) {

        //delete file from S3 bucket
        s3BucketService.deleteFile(userId);

    }


    /**
     * Get user basic info by batch(used by other services to get user info)
     * @param userIds list of user ids
     * @return Map of user id to user basic info
     */
    @Override
    public Map<UUID, UserBasicInfoResponse> getAllByIds(List<UUID> userIds) {

        List<User> users = userRepository.findAllByUserIdIn(userIds);

//      Use stream to collect the data into a map

//        TODO: Add caching

        return users.stream()
                .collect(Collectors.toMap(
                        User::getUserId,
                        user -> UserBasicInfoResponse.builder()
                                .userId(user.getUserId())
                                .username(user.getUsername())
                                .firstName(user.getFirstName())
                                .lastName(user.getLastName())
                                .build()
                ));

    }


    /**
     * Delete user. Deletes user from keycloak and user db
     * @param accessToken access token
     * @param userId user id
     * @throws Exception if user is not authorized to delete user, user not found or {@link KeyCloakServiceImpl} or {@link JWTUtils} service fails
     */
    @CacheEvict(value = "users", key = "#userId")
    @Override
    public void deleteUser(String accessToken, UUID userId) throws Exception {
        authorizeUser(userId, accessToken);

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));

        userRepository.delete(user);
        log.info("User with Id: {} deleted successfully from user db", userId);

        keyCloakService.deleteUser(userId);


//        TODO: delete user from all other services(notify job-post service, applicants who applied to jobs, etc)

    }


    /**
     * Disable user. Disables user in keycloak(user is not able to login) until manual resolution.
     * @param accessToken admin access token
     * @param userId user id
     * @throws Exception if user is not authorized, user not found or {@link JWTUtils} service fails
     */
    @Override
    public void disableUser(String accessToken, UUID userId) throws Exception {


        if (!jwtUtils.hasAdminRole(accessToken)) {
            log.warn("User with Id: {} is not authorized to disable user with Id: {}", JWTUtils.getUserIdFromToken(accessToken), userId);
            throw new UnauthorizedException("Unauthorized access");
        }

        userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User with id " + userId + " not found"));

        keyCloakService.disableUser(userId);
        log.info("User with Id: {} disabled successfully", userId);
    }


    /**
     * Update user profile by id. Updates user in keycloak(if user's property belongs to keycloak as well) and user db. Both user and admin can update user profile.
     * @param accessToken access token
     * @param userId user id
     * @param userPatchRequest user patch request
     * @return UserResponse - updated user representation or no content if no changes detected
     * @throws Exception if user is not authorized, user not found or {@link JWTUtils} service fails
     */
    @Override
    public ResponseEntity<UserResponse> updateUserById(String accessToken, UUID userId, UserPatchRequest userPatchRequest) throws Exception {

        User user = userRepository.findById(userId)
                .orElseThrow( () -> new ResourceNotFoundException("User with id " + userId + " not found"));

        authorizeUser(userId, accessToken);

        if (!updateUserFromPatch(user, userPatchRequest)) {
            log.info("Request to update user with id: {} was successful, however no changes detected", userId);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        log.info("Updating user with id: {}", userId);

        userRepository.save(user);

        UserResponse u = UserResponse.builder()
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
                .build();

        redisTemplate.opsForValue().set("users::"+ u.getUserId().toString(), u);


        return ResponseEntity.ok(u);


    }


    /**
     * Get all users. Returns count of all users registered
     * @param accessToken admin access token
     * @return number of all users
     * @throws Exception if user is not authorized
     */
    @Cacheable(value = "usersCount", key = "'usersCount'")
    @Override
    public Integer getTotalUsersCount(String accessToken) throws Exception {
        isAdmin(accessToken);
        return userRepository.getUsersCount();
    }


    /**
     * Helper method to update user from patch request. Updates user in keycloak(if user's property belongs to keycloak as well).
     * @param user user model
     * @param userPatchRequest user patch request
     * @return true if user was updated, false otherwise
     */
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


    /**
     * Helper method to check if user has admin role admin. See {@link JWTUtils#hasAdminRole(String)}
     * @param accessToken access token
     * @throws Exception if user is not admin or {@link JWTUtils} service fails
     */
    private void isAdmin(String accessToken) throws Exception {
        if (!jwtUtils.hasAdminRole(accessToken)) {
           throw new UnauthorizedException("Unauthorized access");
        }
    }


    /**
     * Helper method to authorize user. Checks if user is authorized to access resource.
     * @param resourceUserId user id(owner) of the resource
     * @param accessToken access token
     * @throws Exception if user is not authorized or {@link JWTUtils} service fails
     */
    private void authorizeUser(UUID resourceUserId, String accessToken) throws Exception {

        UUID tokenUserId = JWTUtils.getUserIdFromToken(accessToken);


        if (!tokenUserId.equals(resourceUserId) && !jwtUtils.hasAdminRole(accessToken)) {
            log.warn("User with Id: {} is not authorized to access resource with Id: {}", tokenUserId, resourceUserId);
            throw new UnauthorizedException("Unauthorized access");
        }

    }

}
