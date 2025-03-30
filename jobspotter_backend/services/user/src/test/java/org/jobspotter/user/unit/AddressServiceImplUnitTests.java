package org.jobspotter.user.unit;

import org.jobspotter.user.authUtils.JWTUtils;
import org.jobspotter.user.dto.AddressPatchRequest;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.dto.AddressResponse;
import org.jobspotter.user.exception.ForbiddenException;
import org.jobspotter.user.exception.ResourceAlreadyExistsException;
import org.jobspotter.user.exception.ResourceNotFoundException;
import org.jobspotter.user.model.Address;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;
import org.jobspotter.user.model.User;
import org.jobspotter.user.repository.AddressRepository;
import org.jobspotter.user.repository.UserRepository;
import org.jobspotter.user.service.GeoCodingService;
import org.jobspotter.user.service.implementation.AddressServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.*;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;


@ExtendWith(MockitoExtension.class)
class AddressServiceImplUnitTests {

    @Mock
    private AddressRepository addressRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private GeoCodingService geoCodingService;

    @InjectMocks
    private AddressServiceImpl addressService;

    private User user;
    private User anotherUser;
    private Address address;
    private Address duplicateAddress;
    private Address anotherAddress;
    private AddressRequest addressRequest;
    private AddressRequest duplicateHomeAddressReq;
    private AddressPatchRequest addressPatchRequest;
    private UUID userId;
    private String accessToken;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        accessToken = "testToken";
        user = User.builder().userId(userId).build();
        anotherUser = User.builder().userId(UUID.randomUUID()).build();

        address = Address.builder()
                .addressId(1L)
                .user(user)
                .address("123 Test St, Test City, Test County, TestEir")
                .streetAddress("123 Test St")
                .city("Test City")
                .county(County.Dublin)
                .eirCode("TestEir")
                .longitude(1.0)
                .latitude(2.0)
                .addressType(AddressType.HOME)
                .isDefault(true)
                .build();


        anotherAddress = Address.builder()
                .addressId(2L)
                .user(anotherUser)
                .address("123 Cork St, C12 D34")
                .streetAddress("123 Cork St")
                .city("Cork")
                .county(County.Cork)
                .eirCode("C12 D34")
                .longitude(1.0)
                .latitude(2.0)
                .addressType(AddressType.HOME)
                .isDefault(true)
                .build();

        addressRequest = AddressRequest.builder()
                .streetAddress("123 Test St")
                .city("Test City")
                .county(County.Dublin)
                .eirCode("TestEir")
                .addressType(AddressType.HOME)
                .isDefault(true)
                .build();

        duplicateHomeAddressReq = AddressRequest.builder()
                .streetAddress("213 Test St")
                .city("Test City 2")
                .county(County.Dublin)
                .eirCode("A22 B34")
                .addressType(AddressType.HOME)
                .isDefault(true)
                .build();

        duplicateAddress = Address.builder()
                .addressId(3L)
                .address(addressRequest.getStreetAddress() + ", " + addressRequest.getCity() + ", " + addressRequest.getCounty() + ", " + addressRequest.getEirCode())
                .streetAddress(addressRequest.getStreetAddress())
                .city(addressRequest.getCity())
                .county(addressRequest.getCounty())
                .eirCode(addressRequest.getEirCode())
                .addressType(AddressType.WORK)
                .isDefault(addressRequest.isDefault())
                .build();


        addressPatchRequest = AddressPatchRequest.builder()
                .streetAddress("456 Updated St")
                .city("Updated City")
                .county(County.Cork)
                .eirCode("UpdatedEir")
                .addressType(AddressType.WORK)
                .isDefault(false)
                .build();
    }

    @Test
    void createAddress_success() throws Exception {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.emptyList());
            when(geoCodingService.getCoordinates(anyString())).thenReturn(Map.of("lat", 1.0, "lng", 2.0));

            // Create a new Address object to simulate the saved entity with an assigned ID
            Address savedAddress = Address.builder()
                    .addressId(1L) // Simulate JPA assigning an ID
                    .user(user)
                    .address("123 Test St, Test City, Test County, TestEir")
                    .streetAddress("123 Test St")
                    .city("Test City")
                    .county(County.Dublin)
                    .eirCode("A34 B56")
                    .longitude(1.0)
                    .latitude(2.0)
                    .addressType(AddressType.HOME)
                    .isDefault(true)
                    .build();

            when(addressRepository.save(any(Address.class))).thenReturn(savedAddress);

            Long result = addressService.createAddress(accessToken, addressRequest);

            assertEquals(1L, result);
            verify(addressRepository, times(1)).save(any(Address.class));
        }
    }

    @Test
    void createAddress_userNotFound() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class, () -> addressService.createAddress(accessToken, addressRequest));
        }
    }

    @Test
    void createAddress_addressLimitExceeded() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Arrays.asList(new Address[5]));

            assertThrows(ResourceAlreadyExistsException.class, () -> addressService.createAddress(accessToken, addressRequest));
        }
    }

    @Test
    void createAddress_Duplicate() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.singletonList(duplicateAddress));

            assertThrows(ResourceAlreadyExistsException.class, () -> addressService.createAddress(accessToken, addressRequest));
        }
    }

    @Test
    void createAddress_AnotherHomeAddress() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.singletonList(address));

            assertThrows(ResourceAlreadyExistsException.class, () -> addressService.createAddress(accessToken, duplicateHomeAddressReq));
        }
    }

    @Test
    void deleteAddress_success() throws Exception {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(addressRepository.findById(1L)).thenReturn(Optional.of(address));

            addressService.deleteAddress(accessToken, 1L);

            verify(addressRepository, times(1)).delete(address);
        }
    }

    @Test
    void deleteAddress_addressNotFound() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(addressRepository.findById(1L)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class, () -> addressService.deleteAddress(accessToken, 1L));
        }
    }

    @Test
    void deleteAddress_userNotAuthorized() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());

            when(addressRepository.findById(1L)).thenReturn(Optional.of(address));

            assertThrows(ForbiddenException.class, () -> addressService.deleteAddress(accessToken, 1L));
        }
    }

    @Test
    void updateAddress_success() throws Exception {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.singletonList(address));
            when(geoCodingService.getCoordinates(anyString())).thenReturn(Map.of("lat", 3.0, "lng", 4.0));
            when(addressRepository.save(any(Address.class))).thenReturn(address);

            ResponseEntity<?> response = addressService.updateAddress(accessToken, 1L, addressPatchRequest);

            assertEquals(HttpStatus.NO_CONTENT, response.getStatusCode());
            verify(addressRepository, times(1)).save(any(Address.class));
        }
    }

    @Test
    void updateAddress_userNotAuthorized() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());
            when(userRepository.findById(any())).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.singletonList(address));

            assertThrows(ForbiddenException.class, () -> addressService.updateAddress(accessToken, 1L, addressPatchRequest));
        }
    }

    @Test
    void updateAddress_userNotFound() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());
            when(userRepository.findById(any())).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.emptyList());

            assertThrows(ResourceNotFoundException.class, () -> addressService.updateAddress(accessToken, 1L, addressPatchRequest));
        }
    }

    @Test
    void getAddressById_success() throws Exception {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(addressRepository.findById(1L)).thenReturn(Optional.of(address));

            AddressResponse response = addressService.getAddressById(accessToken, 1L);

            assertEquals(1L, response.getAddressId());
        }
    }

    @Test
    void getAddressById_addressNotFound() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(addressRepository.findById(1L)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class, () -> addressService.getAddressById(accessToken, 1L));
        }
    }

    @Test
    void getAddressById_Unauthorized() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(addressRepository.findById(2L)).thenReturn(Optional.of(anotherAddress));

            assertThrows(ForbiddenException.class, () -> addressService.getAddressById(accessToken, 2L));
        }
    }

    @Test
    void getAllAddresses_success() throws Exception {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.of(user));
            when(addressRepository.findAllByUser(user)).thenReturn(Collections.singletonList(address));

            List<AddressResponse> responses = addressService.getAllAddresses(accessToken);

            assertEquals(1, responses.size());
        }
    }

    @Test
    void getAllAddresses_UserNotFound() {
        try (MockedStatic<JWTUtils> jwtUtils = mockStatic(JWTUtils.class)) {
            jwtUtils.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(userRepository.findById(userId)).thenReturn(Optional.empty());

            assertThrows(ResourceNotFoundException.class, () -> addressService.getAllAddresses(accessToken));

        }
    }
}
