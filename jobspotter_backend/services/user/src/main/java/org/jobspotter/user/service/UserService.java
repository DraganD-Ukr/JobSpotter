package org.jobspotter.user.service;
import org.jobspotter.user.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface UserService {

    ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) throws Exception;

    TokenResponse loginUser(UserLoginRequest userLoginRequest);

    ResponseEntity<HttpStatus> logoutUser(String accessToken) throws Exception;

    ResponseEntity<UserResponse> getUserById(UUID userId) throws Exception;

    ResponseEntity<UserResponse> updateUser(UUID userId, UserPatchRequest userPatchRequest);

    ResponseEntity<HttpStatus> uploadProfilePicture(UUID userId, MultipartFile multipartFile) throws Exception;

    ResponseEntity<HttpStatus> deleteProfilePicture(UUID userId) throws Exception;

    ResponseEntity<Map<UUID, UserBasicInfoResponse>> getAllByIds(List<UUID> userIds);

    ResponseEntity<HttpStatus> deleteUser(String accessToken, UUID userId) throws Exception;

    void disableUser(UUID userId);
}
