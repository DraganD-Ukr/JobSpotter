package org.jobspotter.user.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jobspotter.user.authUtils.JWTUtils;
import org.jobspotter.user.dto.AddressPatchRequest;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;
    private final JWTUtils jwtUtils;

    @PostMapping
    public ResponseEntity<HttpStatus> createAddress(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid AddressRequest addressRequest
            ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.createAddress(userId, addressRequest);
    }

    @DeleteMapping("/{addressId}")
    public ResponseEntity<HttpStatus> deleteAddress(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long addressId
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.deleteAddress(userId, addressId);
    }


    @PatchMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long addressId,
            @RequestBody @Valid AddressPatchRequest addressRequest
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.updateAddress(userId, addressId, addressRequest);
    }

    @GetMapping("/{addressId}")
    public ResponseEntity<?> getAddress(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long addressId
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.getAddressById(userId, addressId);
    }
}
