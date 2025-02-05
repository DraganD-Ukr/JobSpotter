package org.jobspotter.user.service;

import org.jobspotter.user.dto.AddressPatchRequest;
import org.jobspotter.user.dto.AddressRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface AddressService {

    ResponseEntity<HttpStatus> createAddress(UUID userId, AddressRequest addressRequest);

    ResponseEntity<HttpStatus> deleteAddress(UUID userId, Long addressId);

    ResponseEntity<?> updateAddress(UUID userId, Long addressId, AddressPatchRequest addressRequest);
}
