package org.jobspotter.user.unit;

import org.jobspotter.user.authUtils.JWTUtils;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.exception.InvalidCredentialsException;
import org.jobspotter.user.exception.ResourceAlreadyExistsException;
import org.jobspotter.user.exception.ResourceNotFoundException;
import org.jobspotter.user.exception.UnauthorizedException;
import org.jobspotter.user.jwtUtils.JwtUtils;
import org.jobspotter.user.model.User;
import org.jobspotter.user.model.UserType;
import org.jobspotter.user.repository.UserRepository;
import org.jobspotter.user.service.KeyCloakService;
import org.jobspotter.user.service.implementation.UserServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserServiceImplUnitTests {


        @Mock
        private JwtUtils jwtUtilsMocked;

        @Mock
        private KeyCloakService keyCloakService;

        @Mock
        private UserRepository userRepository;

        @InjectMocks
        private UserServiceImpl userService;

        @Captor
        private ArgumentCaptor<User> userCaptor;

        @Test
        void registerUser_userAlreadyExists() {
            UserRegisterRequest request = new UserRegisterRequest("testuser", "test@example.com", "John", "Doe", "password");
            when(userRepository.existsByUsernameAndEmail(request.getUsername(), request.getEmail())).thenReturn(true);

            assertThrows(ResourceAlreadyExistsException.class, () -> userService.registerUser(request));
            verify(keyCloakService, never()).createUser(anyString(), any(KeyCloakRegisterRequest.class));
            verify(userRepository, never()).save(any(User.class));
        }

        @Test
        void registerUser_success() {
            UserRegisterRequest request = new UserRegisterRequest("testuser", "test@example.com", "John", "Doe", "password123");
            when(userRepository.existsByUsernameAndEmail(request.getUsername(), request.getEmail())).thenReturn(false);
            when(keyCloakService.getAdminToken()).thenReturn("adminToken");

            String userId = UUID.randomUUID().toString();

            when(keyCloakService.getUserIDbyEmail(request.getEmail(), "adminToken")).thenReturn(userId);

            ResponseEntity<HttpStatus> response = userService.registerUser(request);

            assertEquals(HttpStatus.CREATED, response.getStatusCode());
            verify(keyCloakService).createUser(anyString(), any(KeyCloakRegisterRequest.class));
            verify(userRepository).save(userCaptor.capture());

            User savedUser = userCaptor.getValue();
            assertEquals(UUID.fromString(userId), savedUser.getUserId());
            assertEquals(request.getUsername(), savedUser.getUsername());
            assertEquals(request.getEmail(), savedUser.getEmail());
            assertEquals(request.getFirstName(), savedUser.getFirstName());
            assertEquals(request.getLastName(), savedUser.getLastName());
            assertEquals(UserType.USER, savedUser.getUserType());
        }

        @Test
        void loginUserSuccess() {
            UserLoginRequest request = new UserLoginRequest("testuser", "password");
            TokenResponse tokenResponse = new TokenResponse(
                    "testToken",
                    3600,
                    3600,
                    "testRefreshToken",
                    "Bearer",
                    0
                    );
            when(keyCloakService.loginUser(request)).thenReturn(tokenResponse);

            TokenResponse response = userService.loginUser(request);

            assertEquals(tokenResponse, response);
            verify(keyCloakService).loginUser(request);
        }

    @Test
    void loginUserFailure() {
        UserLoginRequest request = new UserLoginRequest("testuser", "wrongPassword");

        when(keyCloakService.loginUser(request)).thenThrow(new InvalidCredentialsException("Invalid credentials"));

        assertThrows(InvalidCredentialsException.class, () -> userService.loginUser(request));
        verify(keyCloakService).loginUser(request);
    }

        @Test
        void logoutUser_success() throws Exception {
            String accessToken = "testToken";
            UUID userId = UUID.randomUUID();

            try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {
                jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);
                when(keyCloakService.logoutUser(userId)).thenReturn(HttpStatus.NO_CONTENT);

                ResponseEntity<HttpStatus> response = userService.logoutUser(accessToken);

                assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
                verify(keyCloakService).logoutUser(userId);

            }
        }

        @Test
        void logoutUser_failure() throws Exception {
            String accessToken = "testToken";
            UUID userId = UUID.randomUUID();

            try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {
                jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);
                when(keyCloakService.logoutUser(userId)).thenReturn(HttpStatus.BAD_REQUEST);

                ResponseEntity<HttpStatus> response = userService.logoutUser(accessToken);

                assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
                verify(keyCloakService).logoutUser(userId);

            }

        }

        @Test
        void getUserById_success() throws Exception {
            String accessToken = "testToken";
            UUID userId = UUID.randomUUID();
            User user = User.builder().userId(userId).username("testuser").build();

            try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {
                jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);
                when(userRepository.findById(userId)).thenReturn(Optional.ofNullable(user));

                ResponseEntity<UserResponse> response = userService.getUserById(userId);

                assertEquals(HttpStatus.OK, response.getStatusCode());
                assertEquals(user.getUserId(), response.getBody().getUserId());
                assertEquals(user.getUsername(), response.getBody().getUsername());

            }

        }

        @Test
        void getUserById_NotFound() {

            String accessToken = "testToken";
            UUID userId = UUID.randomUUID();
            try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {

                jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());
                when(userRepository.findById(any(UUID.class))).thenReturn(Optional.empty());

                assertThrows(ResourceNotFoundException.class, () -> userService.getUserById(userId));

                verify(userRepository).findById(any(UUID.class));


            }
        }


        @Test
        void updateUser_success() {
            UUID userId = UUID.randomUUID();
            UserPatchRequest request = new UserPatchRequest();
            request.setFirstName("NewFirstName");
            User user = User.builder().userId(userId).firstName("OldFirstName").build();
            when(userRepository.findById(userId)).thenReturn(Optional.of(user));

            ResponseEntity<UserResponse> response = userService.updateUser(userId, request);

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals("NewFirstName", response.getBody().getFirstName());
            verify(userRepository).save(user);
            verify(keyCloakService).updateUser(any(), eq(userId));
        }

        @Test
        void updateUser_noChanges() {
            UUID userId = UUID.randomUUID();
            UserPatchRequest request = new UserPatchRequest(); // No changes
            User user = User.builder().userId(userId).firstName("OldFirstName").build();
            when(userRepository.findById(userId)).thenReturn(Optional.of(user));

            ResponseEntity<UserResponse> response = userService.updateUser(userId, request);

            assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
            verify(userRepository, never()).save(any());
            verify(keyCloakService, never()).updateUser(any(), any());
        }

        @Test
        void updateUser_notFound() {
            UUID userId = UUID.randomUUID();
            UserPatchRequest request = new UserPatchRequest();
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class, () -> userService.updateUser(userId, request));
            verify(keyCloakService, never()).updateUser(any(), any());
        }


        @Test
        void getAllByIds() {
            List<UUID> userIds = List.of(UUID.randomUUID(), UUID.randomUUID());
            List<User> users = List.of(
                    User.builder().userId(userIds.get(0)).username("user1").firstName("first1").lastName("last1").build(),
                    User.builder().userId(userIds.get(1)).username("user2").firstName("first2").lastName("last2").build()
            );
            when(userRepository.findAllByUserIdIn(userIds)).thenReturn(users);

            ResponseEntity<Map<UUID, UserBasicInfoResponse>> response = userService.getAllByIds(userIds);

            assertEquals(HttpStatus.OK, response.getStatusCode());
            assertEquals(2, response.getBody().size());
            assertTrue(response.getBody().containsKey(userIds.get(0)));
            assertTrue(response.getBody().containsKey(userIds.get(1)));
        }

        @Test
        void deleteUser_UserDeleteHimself_success()  {
            String accessToken = "testToken";
            UUID userId = UUID.randomUUID();

            try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {

                jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);
                when(userRepository.findById(userId)).thenReturn(Optional.of(User.builder().userId(userId).username("testuser").build()));

                ResponseEntity<HttpStatus> response = userService.deleteUser(accessToken, userId);

                assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
                verify(keyCloakService).deleteUser(userId);

            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }


    @Test
    void deleteUser_AdminDeletesUser_success()  {
        String accessToken = "testToken";
        UUID userId = UUID.randomUUID();

        try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {

            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());
            when(jwtUtilsMocked.hasAdminRole(accessToken)).thenReturn(true);
            when(userRepository.findById(userId)).thenReturn(Optional.of(User.builder().userId(userId).username("testuser").build()));

            ResponseEntity<HttpStatus> response = userService.deleteUser(accessToken, userId);

            assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
            verify(keyCloakService).deleteUser(userId);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }



    @Test
    void deleteUser_UserNotFound()  {
        String accessToken = "testToken";
        UUID userId = UUID.randomUUID();

        try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {

            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());
            when(jwtUtilsMocked.hasAdminRole(accessToken)).thenReturn(true);
            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class, () -> userService.deleteUser(accessToken, userId));
            verify(keyCloakService, never()).deleteUser(userId);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Test
    void deleteUser_Unauthorized()  {
        String accessToken = "testToken";
        UUID userId = UUID.randomUUID();

        try (MockedStatic<JWTUtils> jwtUtils = Mockito.mockStatic(JWTUtils.class)) {

            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());
            when(jwtUtilsMocked.hasAdminRole(accessToken)).thenReturn(false);


            assertThrows(UnauthorizedException.class, () -> userService.deleteUser(accessToken, userId));
            verify(keyCloakService, never()).deleteUser(userId);

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }


    }
