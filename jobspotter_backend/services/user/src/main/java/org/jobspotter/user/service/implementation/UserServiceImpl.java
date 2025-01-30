package org.jobspotter.user.service.implementation;


import com.fasterxml.jackson.databind.ser.std.StdKeySerializers;
import java.util.List;
import java.util.UUID;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.model.User;
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
    public ResponseEntity<HttpStatus> registerUser(UserRegisterRequest userRegisterRequest) throws Exception {
        if (userRepository.existsByUsernameAndEmail(userRegisterRequest.getUsername(), userRegisterRequest.getEmail())) {
            throw new Exception("User already exists");
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

        String userId = keyCloakService.getUserIDbyEmail(adminToken, userRegisterRequest.getEmail());

        User user = User.builder()
                .userId(UUID.fromString(userId))
                .username(userRegisterRequest.getUsername())
                .email(userRegisterRequest.getEmail())
                .firstName(userRegisterRequest.getFirstName())
                .lastName(userRegisterRequest.getLastName())
                .build();

        userRepository.save(user);
        log.info("User with Id: {} created successfully",userId);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Object> loginUser(UserLoginRequest userLoginRequest) {
        return null;
    }

}
