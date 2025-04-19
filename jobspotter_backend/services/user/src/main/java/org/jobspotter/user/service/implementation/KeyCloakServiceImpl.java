package org.jobspotter.user.service.implementation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.jobspotter.user.dto.KeyCloakRegisterRequest;
import org.jobspotter.user.dto.KeycloakUserPutRequest;
import org.jobspotter.user.dto.TokenResponse;
import org.jobspotter.user.dto.UserLoginRequest;
import org.jobspotter.user.exception.InvalidCredentialsException;
import org.jobspotter.user.exception.InvalidRequestException;
import org.jobspotter.user.exception.ServerException;
import org.jobspotter.user.exception.UnauthorizedException;
import org.jobspotter.user.service.KeyCloakService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class KeyCloakServiceImpl implements KeyCloakService {

    private static final Logger log = LoggerFactory.getLogger(KeyCloakServiceImpl.class);
    private final RestTemplate restTemplate;

    @Value("${keycloak.admin.username}")
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    private String adminPassword;

    @Value("${keycloak.admin.client-id}")
    private String clientId;

    private String cachedAdminToken;
    private long tokenExpiryTime;

    @Value("${keycloak.host.url}")
    private String localHostPrefixUrl;


    public String getAdminToken() {

        // If the cached token exists and is still valid, return it
        if (cachedAdminToken != null && System.currentTimeMillis() < tokenExpiryTime) {
            return cachedAdminToken;
        }

        String url = localHostPrefixUrl + "/realms/JobSpotter/protocol/openid-connect/token";

        // Prepare the form data (application/x-www-form-urlencoded)
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("username", adminUsername);
        formData.add("password", adminPassword);
        formData.add("grant_type", "password");

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Create the HTTP request
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        try {
            // Make the POST request
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            // Parse the response to extract the token and expiry time
            String responseBody = response.getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            String accessToken = jsonNode.get("access_token").asText();
            int expiresIn = jsonNode.get("expires_in").asInt(); // Expiry time in seconds

            // Calculate the token expiry time with a buffer (e.g., refresh 1 minute before actual expiry)
            tokenExpiryTime = System.currentTimeMillis() + (expiresIn * 1000L) - 60000; // 1 minute before expiry
            cachedAdminToken = accessToken;

            log.info("Successfully got admin JWT token");

            return cachedAdminToken;

        } catch (RestClientResponseException e) {
            // Specific handling for 4xx/5xx errors from Keycloak
            log.error("Keycloak request failed: {}", e.getMessage(), e);
            throw new UnauthorizedException("Invalid credentials or access denied.");
        } catch (Exception e) {
            // General error handling
            log.error("Failed to get admin JWT token: {}", e.getMessage(), e);
            throw new ServerException("Something went wrong on our end, please try again later");
        }
    }

    public void createUser(String token, KeyCloakRegisterRequest registerRequest) {
        String url = localHostPrefixUrl+"/admin/realms/JobSpotter/users";

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_JSON);



        // Create the HTTP request
        HttpEntity<KeyCloakRegisterRequest> requestEntity = new HttpEntity<>(registerRequest, headers);

        log.debug("Request entity: {}", requestEntity.getBody());
        log.debug("JWT: {}", headers.get(HttpHeaders.AUTHORIZATION));
        try {
            // Make the POST request
            ResponseEntity<Void> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    Void.class
            );

            if (response.getStatusCode() == HttpStatus.CREATED) {
                log.info("User created successfully!");
            }  else {
                log.error("Could not create user in KeyCloak: Unexpected response status: {}, Response:{}", response.getStatusCode(), response);
            }

        } catch (RestClientResponseException e) {

            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                log.error("Bad request while creating user: {}", e.getResponseBodyAsString());
                throw new InvalidRequestException("Invalid request. Please try again.");

            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.error("Unauthorized request while creating user: {}", e.getResponseBodyAsString());
                throw new UnauthorizedException("Unauthorized request. Please try again.");

            } else if (e.getStatusCode() == HttpStatus.CONFLICT) {
                log.error("User already exists in Keycloak: {}", e.getResponseBodyAsString());
                throw new InvalidRequestException("User already exists with same username or email. Please try again.");

            } else if (e.getStatusCode().is5xxServerError()) {
                log.error("Server error while creating user: {}", e.getStatusCode());
                throw new ServerException("Authentication service is unavailable. Please try again later.");

            } else {
                log.error("Unexpected error while creating user: {} - {}",
                        e.getStatusCode(),
                        e.getResponseBodyAsString()
                );
                throw new ServerException("Failed to create user. Please try again.");
            }

        }
    }

    public String getUserIDbyEmail(String email, String token) {
        String url = localHostPrefixUrl+"/admin/realms/JobSpotter/users?email=" + email;

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(token);

        HttpEntity<String> entity = new HttpEntity<>(headers);

        log.debug("Fetching user ID from Keycloak for email: {}", email);

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
            HttpStatus status = (HttpStatus) response.getStatusCode();

            if (status == HttpStatus.OK) {
                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode jsonNode = objectMapper.readTree(response.getBody());

                if (jsonNode.isArray() && jsonNode.size() > 0) {
                    return jsonNode.get(0).get("id").asText(); // Assuming first match
                } else {
                    log.error("Expected user to exist in Keycloak but got an empty response for email: {}", email);
                    throw new ServerException("Unexpected authentication error. Please try again.");
                }

            } else if (status == HttpStatus.UNAUTHORIZED) {
                log.error("Unauthorized request to Keycloak with admin JWT to get ID by email: {}", email);
                    throw new ServerException("Unexpected authentication error.");
            } else if (status.is5xxServerError()) {
                log.error("Keycloak server error while fetching user ID for email: {}. Status: {}", email, status);
                throw new ServerException("Authentication service is unavailable. Please try again later.");
            } else {
                log.error("Unexpected response from Keycloak while fetching user ID. Status {} - Response: {}", status.value(), response.getBody());
                throw new ServerException("Unexpected authentication error. Please contact support.");
            }

        } catch (RestClientResponseException e) {
            log.error("Request to Keycloak failed: Status {} - {}", e.getRawStatusCode(), e.getMessage());
            throw new ServerException("Something went wrong on our end: Failed to process register request. Please try again later.");
        } catch (Exception e) {
            log.error("Unexpected error while fetching user ID: {}", e.getMessage(), e);
            throw new ServerException("Something went wrong on our end. Please try again.");
        }
    }


    public TokenResponse loginUser(UserLoginRequest loginRequest) {
        String url = localHostPrefixUrl+"/realms/JobSpotter/protocol/openid-connect/token";

        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("username", loginRequest.getUsername());
        formData.add("password", loginRequest.getPassword());
        formData.add("grant_type", "password");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        log.debug("Attempting login for user: {}", loginRequest.getUsername());

        try {
            ResponseEntity<TokenResponse> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    TokenResponse.class
            );

            HttpStatus status = (HttpStatus) response.getStatusCode();

            if (status == HttpStatus.OK) {
                return response.getBody();
            } else {
                log.error("Unexpected response from Keycloak: Status {} - {}", status.value(), response.getBody());
                throw new ServerException("Unexpected authentication error. Please contact support.");
            }

        } catch (RestClientResponseException e) {
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.warn("Login failed for user {}: Invalid credentials", loginRequest.getUsername());
                throw new InvalidCredentialsException("Invalid username or password.");
            } else if (e.getStatusCode() == HttpStatus.BAD_REQUEST && e.getResponseBodyAsString().contains("Account disabled")) {
                log.warn("Login failed for user {}: Account disabled", loginRequest.getUsername());
                throw new UnauthorizedException("Account disabled. Please contact support.");
            } else if (e.getStatusCode().is5xxServerError()) {
                log.error("Keycloak server error while logging in user {}: {}", loginRequest.getUsername(), e.getStatusCode());
                throw new ServerException("Authentication service is unavailable. Please try again later.");
            } else {
                log.error("Request to Keycloak failed: Status {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new ServerException("Authentication request failed. Please try again.");
            }
        } catch (Exception e) {
            log.error("Unexpected error during login: {}", e.getMessage(), e);
            throw new ServerException("Something went wrong on our end. Please try again.");
        }
    }



    @Override
    public HttpStatus logoutUser(UUID userId) {
        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAdminToken());

        // Make HTTP request
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Void> responseEntity =
                    restTemplate.exchange(
                            localHostPrefixUrl+"/admin/realms/JobSpotter/users/" + userId.toString() + "/logout",
                            HttpMethod.POST,
                            requestEntity,
                            Void.class);

            log.info("Successfully logged out user");

            return (HttpStatus) responseEntity.getStatusCode();
        } catch (RestClientResponseException e) {

            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                log.error("Bad request while logging out user with ID {}: {}", userId, e.getResponseBodyAsString());
                throw new InvalidRequestException("Invalid logout request.");

            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.error("Unauthorized request while logging out user with ID {}: {}", userId, e.getResponseBodyAsString());
                throw new UnauthorizedException("Insufficient permissions to log out the user.");

            } else if (e.getStatusCode().is5xxServerError()) {
                log.error("Server error while logging out user with ID {}: {}", userId, e.getStatusCode());
                throw new ServerException("Authentication service is unavailable. Please try again later.");

            } else {
                log.error("Unexpected error while logging out user with ID {}: {}, {}", userId, e.getStatusCode(), e.getResponseBodyAsString());
                throw new ServerException("Failed to log out user. Please try again.");
            }

        } catch (Exception e) {
            log.error("Unexpected error during user logout for user ID {}: {}", userId, e.getMessage(), e);
            throw new ServerException("Something went wrong during logout. Please try again.");
        }
    }

    @Override
    public HttpStatus updateUser(KeycloakUserPutRequest userPutRequest, UUID userId) {

        log.info("Attempting update user in Keycloak with ID: {}", userId);

        String url = localHostPrefixUrl+"/admin/realms/JobSpotter/users/" + userId.toString();

        Map<String, String> reqBody = reqBodyFromUserPutRequest(userPutRequest);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAdminToken());

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(reqBody, headers);

        try {
            ResponseEntity<HttpStatus> responseEntity =
                    restTemplate.exchange(
                            url,
                            HttpMethod.PUT,
                            requestEntity,
                            HttpStatus.class
                    );

            log.info("Successfully updated user with id {} in Keycloak", userId);

            return responseEntity.getBody();

        } catch (RestClientResponseException e) {

            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                log.error("(Keycloak)Bad request while updating user with id {} - {}",userId, e.getResponseBodyAsString());
                throw new InvalidRequestException("Invalid request body for one or more fields.");

            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.error("(Keycloak):Unauthorized request while updating user user with id {} - {}", userId, e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");

            } else if (e.getStatusCode().is5xxServerError()) {
                log.error("(Keycloak): Error while updating user user with id {} - {}", userId, e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");

            } else {
                log.error("(Keycloak)Unexpected error while updating user: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");
            }

        } catch (Exception e) {
            log.error("(Keycloak)Unexpected error during updating user user user with id {} - {}", userId, e.getMessage(), e);
            throw new ServerException("Something went wrong while refreshing the token. Please try again.");
        }


    }

    @Override
    public void deleteUser(UUID userId) {
        log.info("Attempting to delete user with ID: {}", userId);

        String url = localHostPrefixUrl+"/admin/realms/JobSpotter/users/" + userId.toString();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAdminToken());

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            ResponseEntity<Void> responseEntity =
                    restTemplate.exchange(
                            url,
                            HttpMethod.DELETE,
                            requestEntity,
                            Void.class
                    );

            log.info("Successfully deleted user with id {} in Keycloak", userId);

        } catch (RestClientResponseException e) {

            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                log.error("(Keycloak)Bad request while deleting user with id {} - {}",userId, e.getResponseBodyAsString());
                throw new InvalidRequestException("Invalid request body for one or more fields.");

            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.error("(Keycloak):Unauthorized request while deleting user user with id {} - {}", userId, e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");

            } else if (e.getStatusCode().is5xxServerError()) {
                log.error("(Keycloak): Error while deleting user user with id {} - {}", userId, e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");

            } else {
                log.error("(Keycloak)Unexpected error while deleting user: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");
            }

        } catch (Exception e) {
            log.error("(Keycloak)Unexpected error during deleting user user user with id {} - {}", userId, e.getMessage(), e);
            throw new ServerException("Something went wrong while refreshing the token. Please try again.");
        }
    }

    @Override
    public void disableUser(UUID userId) {
        log.info("Attempting to disable user with ID: {}", userId);

        String url = localHostPrefixUrl+"/admin/realms/JobSpotter/users/" + userId.toString();

        Map<String, String> reqBody = new HashMap<>();
        reqBody.put("enabled", "false");

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(getAdminToken());

        HttpEntity<Map<String, String>> requestEntity = new HttpEntity<>(reqBody, headers);

        try {
            ResponseEntity<Void> responseEntity =
                    restTemplate.exchange(
                            url,
                            HttpMethod.PUT,
                            requestEntity,
                            Void.class
                    );

            log.info("Successfully disabled user with id {} in Keycloak", userId);

        } catch (RestClientResponseException e) {

            if (e.getStatusCode() == HttpStatus.BAD_REQUEST) {
                log.error("(Keycloak)Bad request while disabling user with id {} - {}",userId, e.getResponseBodyAsString());
                throw new InvalidRequestException("Invalid request body for one or more fields.");

            } else if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                log.error("(Keycloak):Unauthorized request while disabling user user with id {} - {}", userId, e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");

            } else if (e.getStatusCode().is5xxServerError()) {
                log.error("(Keycloak): Error while disabling user user with id {} - {}", userId, e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");

            } else {
                log.error("(Keycloak)Unexpected error while disabling user: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
                throw new ServerException("Something went wrong on our end. Please try again later.");
            }

        } catch (Exception e) {
            log.error("(Keycloak)Unexpected error during disabling user user user with id {} - {}", userId, e.getMessage(), e);
            throw new ServerException("Something went wrong while refreshing the token. Please try again.");
        }
    }

    private static Map<String, String> reqBodyFromUserPutRequest(KeycloakUserPutRequest userPutRequest) {
        Map<String, String> formData = new HashMap<>();

//        Checking what fields are being updated and adding them to JSON body
        if (userPutRequest.getFirstName() != null) {
            formData.put("firstName", userPutRequest.getFirstName());
        }
        if (userPutRequest.getLastName() != null) {
            formData.put("lastName", userPutRequest.getLastName());
        }
        if (userPutRequest.getEmail() != null) {
            formData.put("email", userPutRequest.getEmail());
        }

        return formData;
    }


}
