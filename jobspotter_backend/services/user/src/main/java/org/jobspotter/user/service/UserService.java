package org.jobspotter.user.service;
import org.jobspotter.user.dto.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface UserService {

    /**
     * Register a new user
     * @param userRegisterRequest UserRegisterRequest request
     * @throws Exception
     */
    void registerUser(UserRegisterRequest userRegisterRequest) throws Exception;

    /**
     * Login a user
     * @param userLoginRequest UserLoginRequest request
     * @return TokenResponse
     */
    TokenResponse loginUser(UserLoginRequest userLoginRequest);


    /**
     * Logout a user
     * @param accessToken AccessToken of the user
     * @throws Exception
     */
    void logoutUser(String accessToken) throws Exception;

    /**
     * Get user by id
     * @param userId UUID of the user
     * @return UserResponse - User representation
     * @throws Exception
     */
    UserResponse getUserById(UUID userId) throws Exception;


    /**
     * Upload profile picture
     * @param userId UUID of the user
     * @param multipartFile MultipartFile file(picture)
     * @throws Exception
     */
    void uploadProfilePicture(UUID userId, MultipartFile multipartFile) throws Exception;

    /**
     * Delete profile picture
     * @param userId UUID of the user
     * @throws Exception
     */
    void deleteProfilePicture(UUID userId) throws Exception;

    /**
     * Get users basic info by ids
     * @param userIds List of UUIDs
     * @return Map of UUID and UserBasicInfoResponse
     */
    Map<UUID, UserBasicInfoResponse> getAllByIds(List<UUID> userIds);

    /**
     * Delete user
     * @param accessToken AccessToken of the user or admin
     * @param userId UUID of the user
     * @throws Exception
     */
    void deleteUser(String accessToken, UUID userId) throws Exception;

    /**
     * Disable user
     * @param accessToken AccessToken of admin
     * @param userId UUID of the user
     * @throws Exception
     */
    void disableUser(String accessToken, UUID userId) throws Exception;

    /**
     * Update user by id
     * @param accessToken AccessToken of the user
     * @param userPatchRequest UserPatchRequest request
     * @return UserResponse - User representation
     * @throws Exception
     */
    UserResponse updateUserById(String accessToken, UserPatchRequest userPatchRequest, UUID userId) throws Exception;

    /**
     * Get number of total users registered
     * @param accessToken AccessToken of admin
     * @return Integer - Total users count
     * @throws Exception
     */
    Integer getTotalUsersCount(String accessToken) throws Exception;
}
