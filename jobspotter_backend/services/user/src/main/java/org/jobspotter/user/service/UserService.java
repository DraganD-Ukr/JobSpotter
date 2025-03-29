package org.jobspotter.user.service;
import org.jobspotter.user.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface UserService {

    void registerUser(UserRegisterRequest userRegisterRequest) throws Exception;

    TokenResponse loginUser(UserLoginRequest userLoginRequest);

    void logoutUser(String accessToken) throws Exception;

    UserResponse getUserById(UUID userId) throws Exception;

    ResponseEntity<UserResponse> updateUser(UUID userId, UserPatchRequest userPatchRequest);

    void uploadProfilePicture(UUID userId, MultipartFile multipartFile) throws Exception;

    void deleteProfilePicture(UUID userId) throws Exception;

    Map<UUID, UserBasicInfoResponse> getAllByIds(List<UUID> userIds);

    void deleteUser(String accessToken, UUID userId) throws Exception;

    void disableUser(String accessToken, UUID userId) throws Exception;

    ResponseEntity<UserResponse> updateUserById(String accessToken, UUID userId, UserPatchRequest userPatchRequest) throws Exception;

    Integer getTotalUsersCount(String accessToken) throws Exception;
}
