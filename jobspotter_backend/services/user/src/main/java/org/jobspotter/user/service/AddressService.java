package org.jobspotter.user.service;

import org.jobspotter.user.dto.AddressPatchRequest;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.dto.AddressResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.UUID;

public interface AddressService {

    Long createAddress(UUID userId, AddressRequest addressRequest);

    ResponseEntity<HttpStatus> deleteAddress(UUID userId, Long addressId);

    ResponseEntity<?> updateAddress(UUID userId, Long addressId, AddressPatchRequest addressRequest);

    ResponseEntity<AddressResponse> getAddressById(UUID userId, Long addressId);

    ResponseEntity<List<AddressResponse>> getAllAddresses(UUID userId);
}
