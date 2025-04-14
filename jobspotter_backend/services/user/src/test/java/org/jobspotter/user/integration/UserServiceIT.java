package org.jobspotter.user.integration;

import com.redis.testcontainers.RedisContainer;
import dasniko.testcontainers.keycloak.KeycloakContainer;
import io.restassured.RestAssured;
import io.restassured.http.ContentType;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.user.UserApplication;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;
import org.junit.jupiter.api.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.data.redis.connection.RedisConnectionCommands;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.DynamicPropertyRegistry;
import org.springframework.test.context.DynamicPropertySource;
import org.testcontainers.containers.PostgreSQLContainer;
import org.testcontainers.containers.output.Slf4jLogConsumer;
import org.testcontainers.containers.wait.strategy.Wait;
import org.testcontainers.junit.jupiter.Container;
import org.testcontainers.junit.jupiter.Testcontainers;
import org.testcontainers.utility.DockerImageName;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

import static io.restassured.RestAssured.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.awaitility.Awaitility.await;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.*;

@Slf4j
@SpringBootTest(classes = UserApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Testcontainers
public class UserServiceIT {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Container
    private static final RedisContainer redis = new RedisContainer(DockerImageName.parse("redis/redis-stack:latest"))
            .withLogConsumer(new Slf4jLogConsumer(LoggerFactory.getLogger(Logger.class)))
            .waitingFor(Wait.forLogMessage(".*Ready to accept connections.*\\n", 1));

    @Container
    private static final PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:latest")
            .withDatabaseName("testdb")
            .withUsername("testuser")
            .withPassword("testpass");


    @Container
    private static final KeycloakContainer keycloak = new KeycloakContainer()
            .withRealmImportFile(Paths.get("realm-export.json").toString())
            .withLogConsumer(new Slf4jLogConsumer(LoggerFactory.getLogger(Logger.class)));


    @DynamicPropertySource
    static void configureTestDatabase(DynamicPropertyRegistry registry) {
        postgres.start();
        redis.start();
        keycloak.start();



        registry.add("spring.datasource.url", postgres::getJdbcUrl);
        registry.add("spring.datasource.username", postgres::getUsername);
        registry.add("spring.datasource.password", postgres::getPassword);
        registry.add("spring.datasource.driver-class-name", () -> "org.postgresql.Driver");
        registry.add("spring.jpa.hibernate.ddl-auto", () -> "update");

        String redisPort = String.valueOf(redis.getFirstMappedPort());
        String redisHost = redis.getHost();

        registry.add("spring.data.redis.host", redis::getHost);
        registry.add("spring.data.redis.port", redis::getFirstMappedPort);
        log.info("DynamicPropertySource - spring.data.redis.host set to: {}", redisHost);
        log.info("DynamicPropertySource - spring.data.redis.port set to: {}", redisPort);

        // Add AWS properties from environment variables
        registry.add("aws.accessKeyId", () -> System.getenv("AWS_S3_ACCESS_KEY_ID"));
        registry.add("aws.secretAccessKey", () -> System.getenv("AWS_S3_SECRET_ACCESS_KEY"));
        registry.add("aws.s3.region", () -> System.getenv("AWS_S3_REGION"));
        registry.add("aws.s3.bucket", () -> System.getenv("AWS_S3_BUCKET"));

//        Add keycloak properties from environment variables
        registry.add("keycloak.admin.client-id", () -> "JobSpotter-API");
        registry.add("keycloak.host-url", () -> "http://localhost:" + keycloak.getFirstMappedPort());
        registry.add("keycloak.admin.username", keycloak::getAdminUsername);
        registry.add("keycloak.admin.password", keycloak::getAdminPassword);


        // Disable Config Server
        registry.add("spring.cloud.config.enabled", () -> "false");
        registry.add("spring.config.import", () -> "optional:configtree:");
    }



    @BeforeEach
    void setUpBeforeEach() {
        baseUrl = "http://localhost:" + port + "/api/v1/users";
    }


//    -------------------------------------------Keycloak Admin User Setup--------------------------------------------------




    @LocalServerPort
    private int port;

    private static String baseUrl;

    public static String accessToken;
    public static UUID userId;
    public static Long addressId;


    public static String adminAccessToken;

    //    -------------------------------------------User Controller Tests--------------------------------------------------

    @Test
    void redisConnectionTest() {
        String response = redisTemplate.execute(RedisConnectionCommands::ping);
        assertThat(response).isEqualTo("PONG");
    }

    @Test
    @Order(0)
    void loginAdmin() {

//        The keycloak instance used for testing should have an admin user with the following credentials
//        Alternatively, later, keycloak instance can be spun up using docker-compose and the admin user can be created
        UserLoginRequest loginRequest = new UserLoginRequest(
                "administrator_1", "Password123"
        );

        adminAccessToken = given()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when()
                .post(baseUrl + "/auth/login")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .cookie("AccessToken", notNullValue())
                .cookie("RefreshToken", notNullValue())
                .extract().cookie("AccessToken");

    }

    @Test
    @Order(1)
    void shouldRegisterUserSuccessfully() {

        log.info(keycloak.getAdminUsername());
        log.info(keycloak.getAdminPassword());


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
                .log().body()
                .statusCode(HttpStatus.CREATED.value());

        await().atMost(3, TimeUnit.SECONDS);
    }



    @Test
    @Order(2)
    void shouldNotRegisterExistingUser() {
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
                .log().body()
                .statusCode(HttpStatus.CONFLICT.value());
    }

    @Test
    @Order(3)
    void loginUser_InvalidCredentials() {
        UserLoginRequest loginRequest = new UserLoginRequest("john_doe", "invalidPass123");


        given()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when()
                .post(baseUrl + "/auth/login")
                .then()
                .log().body()
                .statusCode(HttpStatus.UNAUTHORIZED.value());


    }

    @Test
    @Order(4)
    void shouldLoginUserSuccessfully() {
        UserLoginRequest loginRequest = new UserLoginRequest("john_doe", "password123");


        accessToken = given()
                .contentType(ContentType.JSON)
                .body(loginRequest)
                .when()
                .post(baseUrl + "/auth/login")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .cookie("AccessToken", notNullValue())
                .cookie("RefreshToken", notNullValue())
                // Extract the accessToken from the Set-Cookie header
                .extract().cookie("AccessToken");


    }


    @Test
    @Order(5)
    void shouldGetUserProfileSuccessfully() {

        userId = given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .get(baseUrl + "/me")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("username", equalTo("john_doe"))
                .body("firstName", equalTo("John"))
                .body("lastName", equalTo("Doe"))
                .body("email", equalTo("john.doe@example.com"))
                .extract().body().jsonPath().getUUID("userId");
    }

    @Test
    @Order(6)
    void shouldGetUserProfileByIdSuccessfully() {
        // Use a valid token here

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .get(baseUrl + "/" + userId)
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("username", equalTo("john_doe"))
                .body("firstName", equalTo("John"))
                .body("lastName", equalTo("Doe"))
                .body("email", equalTo("john.doe@example.com"));
    }

    @Test
    @Order(7)
    void GetUserProfileById_NotFound() {
        // Use a valid token here

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .get(baseUrl + "/" + UUID.randomUUID())
                .then()
                .log().body()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }

    @Test
    @Order(8)
    void shouldReturnBasicUserInfo(){

        List<UUID> userIds = List.of(userId);

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .queryParam("userIds", userIds)
                .when()
                .get(baseUrl)
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body(userId + ".userId", equalTo(userId.toString()))  // Use userId as the key
                .body(userId + ".username", equalTo("john_doe"))
                .body(userId + ".firstName", equalTo("John"))
                .body(userId + ".lastName", equalTo("Doe"));

    }

    @Test
    @Order(9)
    void shouldUpdateUserProfileSuccessfully() {

        UserPatchRequest patchRequest = UserPatchRequest.builder()
                .email("john_updated@gmail.com")
                .firstName("UpdatedJohn")
                .lastName("UpdatedDoe")
                .phoneNumber("0877654321")
                .about("I am a software engineer")
                .build();

        userId = given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(patchRequest)
                .when()
                .patch(baseUrl + "/me")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("email", equalTo("john_updated@gmail.com"))
                .body("firstName", equalTo("UpdatedJohn"))
                .body("lastName", equalTo("UpdatedDoe"))
                .body("phoneNumber", equalTo("0877654321"))
                .body("about", equalTo("I am a software engineer"))
                .extract().body().jsonPath().getUUID("userId");
    }


    @Test
    @Order(10)
    void shouldUpdateUserProfile_NoChange() {

        UserPatchRequest patchRequest = UserPatchRequest.builder()
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
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @Order(11)
    void updateUserProfileById_UserNotFound() {

        UserPatchRequest patchRequest = UserPatchRequest.builder()
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
                .patch(baseUrl + "/" + UUID.randomUUID())
                .then()
                .log().body()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }


    @Test
    @Order(12)
    void adminShouldUpdateUserProfileByIdSuccessfully() {

        UserPatchRequest patchRequest = UserPatchRequest.builder()
                .email("john_updated_by_admin@gmail.com")
                .build();

        userId = given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + adminAccessToken)
                .contentType(ContentType.JSON)
                .body(patchRequest)
                .when()
                .patch(baseUrl + "/" + userId)
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("email", equalTo("john_updated_by_admin@gmail.com"))
                .extract().body().jsonPath().getUUID("userId");
    }





    @Test
    @Order(13)
    void shouldCreateUserProfileImageSuccessfully()  {

        Path imagePath = Paths.get("src/test/resources/test.jpg");

        try {
            byte[] imageBytes = Files.readAllBytes(imagePath);

            RestAssured.given()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .contentType(ContentType.MULTIPART)
                    .multiPart("profileImage", "test.jpg", imageBytes, "image/jpg")
                    .when()
                    .put(baseUrl + "/me/profile-image")
                    .then()
                    .log().body()
                    .statusCode(HttpStatus.NO_CONTENT.value());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    @Order(14)
    void shouldUpdateUserProfileImageSuccessfully()  {

        Path imagePath = Paths.get("src/test/resources/test.jpg");

        try {
            byte[] imageBytes = Files.readAllBytes(imagePath);

            RestAssured.given()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .contentType(ContentType.MULTIPART)
                    .multiPart("profileImage", "test.jpg", imageBytes, "image/jpg")
                    .when()
                    .put(baseUrl + "/me/profile-image")
                    .then()
                    .log().body()
                    .statusCode(HttpStatus.NO_CONTENT.value());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }

    @Test
    @Order(15)
    void shouldDeleteUserProfileImageSuccessfully()  {

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .delete(baseUrl + "/me/profile-image" )
                .then()
                .log().body()
                .statusCode(HttpStatus.NO_CONTENT.value());

    }

    @Test
    @Order(16)
    void deleteUserProfileImage_NotFound()  {

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .delete(baseUrl + "/me/profile-image" )
                .then()
                .log().body()
                .statusCode(HttpStatus.NOT_FOUND.value());

    }


    @Test
    @Order(17)
    void updateUserProfileImageSuccessfully_InvalidExtension()  {

        Path imagePath = Paths.get("src/test/resources/test.txt");

        try {
            byte[] imageBytes = Files.readAllBytes(imagePath);

            RestAssured.given()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .contentType(ContentType.MULTIPART)
                    .multiPart("profileImage", "test.txt", imageBytes, "text/plain")
                    .when()
                    .put(baseUrl + "/me/profile-image")
                    .then()
                    .log().body()
                    .statusCode(HttpStatus.BAD_REQUEST.value());
        } catch (IOException e) {
            e.printStackTrace();
        }

    }


    @Test
    @Order(18)
    void updateUserProfileImageFails_EmptyFile() {

        byte[] emptyImageBytes = new byte[0]; // Empty byte array (0 bytes)

        RestAssured.given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.MULTIPART)
                .multiPart("profileImage", "test-empty.jpg", emptyImageBytes, "image/jpeg") // Correct MIME type
                .when()
                .put(baseUrl + "/me/profile-image")
                .then()
                .log().body()
                .statusCode(HttpStatus.BAD_REQUEST.value()); // Expect failure
    }


    @Test
    @Order(19)
    void shouldGetTotalUsersCount() {

        String res = given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + adminAccessToken)
                .when()
                .get(baseUrl + "/count")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .extract().asString();


        assertEquals(1, Integer.parseInt(res));
    }




//    -------------------------------------------Address Controller Tests--------------------------------------------------

    static  AddressRequest addressRequest = AddressRequest.builder()
            .streetAddress("Main Street")
            .city("Dublin")
            .eirCode("D01 X3Y4")
            .county(County.Dublin)
            .addressType(AddressType.HOME)
            .isDefault(true)
            .build();

    static  AddressRequest secondAddressRequest = AddressRequest.builder()
            .streetAddress("Second Avenue")
            .city("Cork")
            .eirCode("C03 P8Z9")
            .county(County.Cork)
            .addressType(AddressType.WORK)
            .isDefault(false)
            .build();

    @Test
    @Order(20)
    void shouldCreateAddressSuccessfully() {


        String location = given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(addressRequest)
                .when()
                .post(baseUrl + "/addresses")
                .then()
                .log().body()
                .statusCode(HttpStatus.CREATED.value())
                .extract().header("Location");  // Extract the Location header

        // Extract addressId from Location header (assuming format "/api/v1/users/addresses/{id}")
        addressId = Long.parseLong(location.substring(location.lastIndexOf("/") + 1));

        assertNotNull(location);
        assertFalse(location.isEmpty());



    }

    @Test
    @Order(21)
    void shouldCreateAnotherAddressSuccessfully() {

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(secondAddressRequest)
                .when()
                .post(baseUrl + "/addresses")
                .then()
                .log().body()
                .statusCode(HttpStatus.CREATED.value());
    }

    @Test
    @Order(22)
    void shouldRetrieveAllUserAddresses() {
        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .get(baseUrl + "/addresses")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("size()", greaterThanOrEqualTo(2)) // At least 2 addresses
                .body("streetAddress", hasItems("Main Street", "Second Avenue"))
                .body("city", hasItems("Dublin", "Cork"));
    }


    @Test
    @Order(23)
    void shouldRetrieveUserAddressById() {
        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .when()
                .get(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("streetAddress", equalTo(addressRequest.getStreetAddress()))
                .body("city", equalTo(addressRequest.getCity()))
                .body("county", equalTo(addressRequest.getCounty().toString()))
                .body("eirCode", equalTo("D01 X3Y4"))
                .body("addressType", equalTo("HOME"))
                .body("default", equalTo(true));
    }


    @Test
    @Order(24)
    void shouldUpdateUserAddressSuccessfully() {

        AddressPatchRequest updatedAddress = AddressPatchRequest.builder()
                .streetAddress("New Street")
                .city("Galway")
                .eirCode("G02 Y5X6")
                .county(County.Galway)
                .isDefault(false)
                .addressType(AddressType.WORK)
                .build();

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .contentType(ContentType.JSON)
                .body(updatedAddress)
                        .patch(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value());


        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .when()
                .get(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .body("streetAddress", equalTo(updatedAddress.getStreetAddress()))
                .body("city", equalTo(updatedAddress.getCity()))
                .body("eirCode", equalTo(updatedAddress.getEirCode()))
                .body("county", equalTo(updatedAddress.getCounty().toString()))
                .body("addressType", equalTo(updatedAddress.getAddressType().toString()))
                .body("default", equalTo(updatedAddress.isDefault()));
    }

    @Test
    @Order(25)
    void shouldUpdateUserAddressWithoutChangesSuccess() {


        AddressResponse currAdr = given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .contentType(ContentType.JSON)
                .when()
                .get(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.OK.value())
                .extract().as(AddressResponse.class);


        AddressPatchRequest updatedAddress = AddressPatchRequest.builder()
                .streetAddress(currAdr.getStreetAddress())
                .city(currAdr.getCity())
                .eirCode(currAdr.getEirCode())
                .county(currAdr.getCounty())
                .build();

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .contentType(ContentType.JSON)
                .body(updatedAddress)
                .when()
                .patch(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @Order(26)
    void shouldDeleteUserAddressByIdAndReturnNotFoundOnRetrieval() {
        // Step 1: Delete the address
        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .when()
                .delete(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.NO_CONTENT.value());

        // Step 2: Attempt to retrieve the deleted address and expect 404 Not Found
        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .pathParam("addressId", addressId)
                .when()
                .get(baseUrl + "/addresses/{addressId}")
                .then()
                .log().body()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }



    @Test
    @Order(27)
    void shouldFailToCreateAddressDueToInvalidData() {
        AddressRequest invalidAddressRequest = AddressRequest.builder()
                .streetAddress("") // Empty street address (invalid)
                .city("") // Empty city (invalid)
                .eirCode("123") // Invalid EirCode format
                .county(null) // Null county (invalid)
                .addressType(null) // Null address type (invalid)
                .isDefault(true)
                .build();

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .contentType(ContentType.JSON)
                .body(invalidAddressRequest)
                .when()
                .post(baseUrl + "/addresses")
                .then()
                .log().body()
                .statusCode(HttpStatus.BAD_REQUEST.value()); // Expecting a validation failure

    }


//    ------------------Final User Tests to clean up sources and check behaviour of delete/disable func-----------------------------


    @Test
    @Order(28)
    void shouldDisableUserSuccessfully(){

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + adminAccessToken)
                .when()
                .put(baseUrl + "/" + userId + "/disable")
                .then()
                .log().body()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @Order(29)
    void shouldDisableUser_NotAuthorized(){

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .put(baseUrl + "/" + userId + "/disable")
                .then()
                .log().body()
                .statusCode(HttpStatus.UNAUTHORIZED.value());
    }

    @Test
    @Order(30)
    void disableUser_NotFound(){

        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + adminAccessToken)
                .when()
                .put(baseUrl + "/" + UUID.randomUUID() + "/disable")
                .then()
                .log().body()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }


    @Test
    @Order(31)
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


    @Test
    @Order(32)
    void deleteUser(){
        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                .when()
                .delete(baseUrl + "/" + userId)
                .then()
                .log().body()
                .statusCode(HttpStatus.NO_CONTENT.value());
    }

    @Test
    @Order(33)
    void deleteUser_NotFound(){
        given()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + adminAccessToken)
                .when()
                .delete(baseUrl + "/" + userId)
                .then()
                .log().body()
                .statusCode(HttpStatus.NOT_FOUND.value());
    }


}