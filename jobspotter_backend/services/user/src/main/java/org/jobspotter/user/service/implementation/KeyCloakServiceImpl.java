package org.jobspotter.user.service.implementation;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.user.dto.KeyCloakRegisterRequest;
import org.jobspotter.user.dto.UserLoginRequest;
import org.jobspotter.user.dto.UserRegisterRequest;
import org.jobspotter.user.service.KeyCloakService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class KeyCloakServiceImpl implements KeyCloakService {

    private final RestTemplate restTemplate;

    @Value("${keycloak.admin.username}")
    private String adminUsername;

    @Value("${keycloak.admin.password}")
    private String adminPassword;

    @Value("${keycloak.admin.client-id}")
    private String clientId;

    public String getAdminToken() {
        String url = "http://localhost:9090/realms/neighborhood-services-realm/protocol/openid-connect/token";

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

        log.debug("Keycloak Info: clientId:{}, adminUsername:{}, adminPassword:{}", clientId, adminUsername, adminPassword);

        try {
            // Make the POST request
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            // Return the response body (JWT token)
            String responseBody = response.getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            return jsonNode.get("access_token").asText();
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get admin JWT token: " + e.getMessage());
        }
    }

    public void createUser(String token, KeyCloakRegisterRequest registerRequest) {
        String url = "http://localhost:9090/admin/realms/neighborhood-services-realm/users";

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
            } else {
                log.warn("Could not create user in KeyCloak: Unexpected response status: {}", response.getStatusCode());
            }
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to create user: " + e.getMessage());
        }
    }

    public String getUserIDbyEmail(String email, String token) {
        // The base URL for the Keycloak Admin API
        String url = "http://localhost:9090/admin/realms/neighborhood-services-realm/users";

        // Set the authorization header with the admin JWT token
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);

        // Prepare the URL with the query parameter to search for the user by username
        String requestUrl = url + "?email=" + email;

        // Create the HTTP request entity
        HttpEntity<String> entity = new HttpEntity<>(headers);

        try {
            // Send the GET request
            ResponseEntity<String> response = restTemplate.exchange(
                    requestUrl, HttpMethod.GET, entity, String.class
            );

            // Check if the response contains a user and extract the user ID
            // Return the response body (JWT token)
            String responseBody = response.getBody();

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(responseBody);

            // Check if the list is empty or null
            if (jsonNode.isArray() && jsonNode.size() > 0) {
                return jsonNode.get(0).get("id").asText();  // Assuming the first user matches
            } else {
                throw new RuntimeException("User not found with the email: " + email);
            }

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to get user ID: " + e.getMessage());
        }
    }

    public Object loginUser(String token, UserLoginRequest loginRequest) {
        String url = "http://localhost:9090/realms/neighborhood-services-realm/protocol/openid-connect/token";
        // Prepare the form data (application/x-www-form-urlencoded)
        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("username", loginRequest.getUsername());
        formData.add("password", loginRequest.getPassword());
        formData.add("grant_type", "password");

        // Set headers
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(token);
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // Create the HTTP request
        HttpEntity<MultiValueMap<String, String>> requestEntity = new HttpEntity<>(formData, headers);

        log.debug("Keycloak Info: clientId:{}, adminUsername:{}, adminPassword:{}", clientId, adminUsername, adminPassword);

        try {
            // Make the POST request
            ResponseEntity<String> response = restTemplate.exchange(
                    url,
                    HttpMethod.POST,
                    requestEntity,
                    String.class
            );

            // Return the response body (JWT token)
            String responseBody = response.getBody();


            return responseBody;
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to login user " + e.getMessage());
        }

    }
}
