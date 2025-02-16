package org.jobspotter.user.integration;

import io.restassured.http.ContentType;
import org.jobspotter.user.UserApplication;
import org.jobspotter.user.dto.UserLoginRequest;
import org.jobspotter.user.dto.UserPatchRequest;
import org.jobspotter.user.dto.UserRegisterRequest;
import org.junit.jupiter.api.*;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

@SpringBootTest(classes = UserApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Testcontainers
public class UserControllerIT {




    @Container
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:latest")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");

    @LocalServerPort
    private int port;

    private String baseUrl;

    @DynamicPropertySource
    static void configureTestDatabase(DynamicPropertyRegistry registry) {
        postgres.start();
        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.datasource.driver-class-name", () -> "org.postgresql.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "update");
    }


    @BeforeEach
    void setUpBeforeEach() {
        baseUrl = "http://localhost:" + port + "/api/v1/users";
    }


    public static String accessToken;


    @Test
    @Order(1)
    void shouldRegisterUserSuccessfully() throws InterruptedException {
        UserRegisterRequest request = new UserRegisterRequest(
                "john_doe",
                "John",
                "Doe",
                "password123",
                "john.doe@example.com"
        );

        given()
                .contentType(ContentType.JSON)
                .body(request)
                .when()
                .post(baseUrl + "/auth/register")
                .then()
                .statusCode(HttpStatus.CREATED.value());

        Thread.sleep(2000);
    }



    @Test
    @Order(2)
    void shouldLoginUserSuccessfully() {
        UserLoginRequest loginRequest = new UserLoginRequest("john_doe", "password123");

        // Perform login request

        accessToken = given()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when()
                .post(baseUrl + "/auth/login")
                .then()
                .statusCode(HttpStatus.OK.value())
                .cookie("AccessToken", notNullValue())
                .cookie("RefreshToken", notNullValue())
                // Extract the accessToken from the Set-Cookie header
                .extract().cookie("AccessToken");


    }


    @Test
    @Order(3)
    void shouldGetUserProfileSuccessfully() {
        // Use a valid token here

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .get(baseUrl + "/me")
                .then()
                .statusCode(HttpStatus.OK.value())
                .body("username", equalTo("john_doe"))
                .body("firstName", equalTo("John"))
                .body("lastName", equalTo("Doe"))
                .body("email", equalTo("john.doe@example.com"));
    }

    @Test
    @Order(4)
    void shouldUpdateUserProfileSuccessfully() {// Use a valid token here

        UserPatchRequest patchRequest = UserPatchRequest.builder()
                .username("john_updated")
                .email("john_updated@gmail.com")
                .firstName("UpdatedJohn")
                .lastName("UpdatedDoe")
                .phoneNumber("0877654321")
                .about("I am a software engineer")
                .build();

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(patchRequest)
                .when()
                .patch(baseUrl + "/me")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("username", equalTo("john_updated"))
                .body("email", equalTo("john_updated@gmail.com"))
                .body("firstName", equalTo("Updated John"))
                .body("lastName", equalTo("Updated Doe"))
                .body("phoneNumber", equalTo("0831234567"))
                .body("about", equalTo("I am a software engineer"));
    }

    @Test
    @Order(5)
    void shouldLogoutUserSuccessfully() {

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .post(baseUrl + "/auth/logout")
                .then()
                .statusCode(HttpStatus.NO_CONTENT.value())
//                .cookie("AccessToken", nullValue())
//                .cookie("RefreshToken", nullValue());
        ;
    }


}