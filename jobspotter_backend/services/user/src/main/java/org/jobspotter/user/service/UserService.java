package org.jobspotter.user.service;
import org.jobspotter.user.dto.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.UUID;

public interface UserService {
    ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) throws Exception;

    TokenResponse loginUser(UserLoginRequest userLoginRequest);

    ResponseEntity<HttpStatus> logoutUser(String accessToken) throws Exception;

    ResponseEntity<UserResponse> getUserById(String accessToken) throws Exception;

    ResponseEntity<UserResponse> updateUser(UUID userId, UserPatchRequest userPatchRequest);

    ResponseEntity<Map<UUID, UserBasicInfoResponse>> getAllByIds(List<UUID> userIds);
}
