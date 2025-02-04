package org.jobspotter.user.service;

import org.jobspotter.user.dto.AddressRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.UUID;

public interface AddressService {

    public ResponseEntity<HttpStatus> createAddress(UUID userId, AddressRequest addressRequest);

}
