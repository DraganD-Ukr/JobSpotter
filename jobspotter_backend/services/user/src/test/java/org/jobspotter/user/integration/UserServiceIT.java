package org.jobspotter.user.integration;

import io.restassured.http.ContentType;
import org.jobspotter.user.UserApplication;
import org.jobspotter.user.dto.*;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;
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

import java.util.List;
import java.util.UUID;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest(classes = UserApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@Testcontainers
public class UserServiceIT {




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
    public static UUID userId;
    public static Long addressId;


    //    -------------------------------------------User Controller Tests--------------------------------------------------

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
                .log().body()
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
                .log().body()
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
                .log().body()
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

    @Test
    @Order(6)
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
                .body(userId + ".firstName", equalTo("UpdatedJohn"))
                .body(userId + ".lastName", equalTo("UpdatedDoe"));

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
    @Order(7)
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
    @Order(8)
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
    @Order(9)
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
    @Order(10)
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
    @Order(11)
    void shouldUpdateUserAddressSuccessfully() {

        AddressPatchRequest updatedAddress = AddressPatchRequest.builder()
                .streetAddress("New Street")
                .city("Galway")
                .eirCode("G02 Y5X6")
                .county(County.Galway)
                .isDefault(false)
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
                .body("addressType", equalTo(addressRequest.getAddressType().toString()))
                .body("default", equalTo(updatedAddress.isDefault()));
    }

    @Test
    @Order(12)
    void shouldUpdateUserAddressWithoutChangesSuccessfully() {

        AddressPatchRequest updatedAddress = AddressPatchRequest.builder()
                .streetAddress("New Street")
                .city("Galway")
                .eirCode("G02 Y5X6")
                .county(County.Galway)
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
                .statusCode(HttpStatus.OK.value());
    }

    @Test
    @Order(13)
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
    @Order(14)
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


}