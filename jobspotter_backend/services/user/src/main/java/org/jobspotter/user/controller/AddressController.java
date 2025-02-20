package org.jobspotter.user.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.jobspotter.user.authUtils.JWTUtils;
import org.jobspotter.user.dto.AddressPatchRequest;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.dto.AddressResponse;
import org.jobspotter.user.dto.ErrorResponse;
import org.jobspotter.user.service.AddressService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/users/addresses")
@RequiredArgsConstructor
public class AddressController {

    private final AddressService addressService;

    @Operation(summary = "Create a new address. User can have up to 5 addresses and only one can be with 'HOME' type. Only one default address is allowed.")
        @ApiResponses(value = {
                @ApiResponse(responseCode = "201", description = "Created"),
                @ApiResponse(responseCode = "400", description = "Bad request",
                        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
                ),
                @ApiResponse(responseCode = "404", description = "User Not found",
                        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
                ),
                @ApiResponse(responseCode = "409", description = "Conflict: address already exists or is a duplicate",
                        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
                ),
                @ApiResponse(responseCode = "500", description = "Internal server error",
                        content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
                )
        })
    @PostMapping
    public ResponseEntity<HttpStatus> createAddress(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid AddressRequest addressRequest
            ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        Long addressId = addressService.createAddress(userId, addressRequest);

        return ResponseEntity.created(new URI("/api/v1/users/addresses/" + addressId)).build();
    }

    @Operation(summary = "Delete address. User can have up to 5 addresses and only one can be with 'HOME' type. Only one default address is allowed.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not found: user or address does not exist",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @DeleteMapping("/{addressId}")
    public ResponseEntity<HttpStatus> deleteAddress(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long addressId
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.deleteAddress(userId, addressId);
    }


    @Operation(summary = "Update address")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "No content"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not found: user or address does not exist",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "409", description = "Conflict: address is a duplicate or address type conflicts with existing address/addresses",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PatchMapping("/{addressId}")
    public ResponseEntity<?> updateAddress(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long addressId,
            @RequestBody @Valid AddressPatchRequest addressRequest
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.updateAddress(userId, addressId, addressRequest);
    }


    @Operation(summary = "Get address by ID. User can get only their own addresses.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Address retrieved",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden: User does not have access to address",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not found: user or address does not exist",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/{addressId}")
    public ResponseEntity<?> getAddress(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long addressId
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.getAddressById(userId, addressId);
    }

    @Operation(summary = "Get all addresses.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Addresses retrieved",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = AddressResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "User Not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping
    public ResponseEntity<?> getAddresses(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return addressService.getAllAddresses(userId);
    }
}
