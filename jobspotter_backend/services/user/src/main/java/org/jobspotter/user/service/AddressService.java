package org.jobspotter.user.service;

import org.jobspotter.user.dto.AddressPatchRequest;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.dto.AddressResponse;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AddressService {

    /**
     * Create a new address for a user
     * @param accessToken the access token of user
     * @param addressRequest the address request
     * @return the address id
     */
    Long createAddress(String accessToken, AddressRequest addressRequest) throws Exception;

    /**
     * Delete an address
     * @param accessToken the access token of user
     * @param addressId the address id
     */
   void deleteAddress(String accessToken, Long addressId) throws Exception;

    /**
     * Update an address
     * @param accessToken access token of user
     * @param addressId the address id
     * @param addressRequest the address request
     * @return the updated address, error response or no content
     */
    ResponseEntity<?> updateAddress(String accessToken, Long addressId, AddressPatchRequest addressRequest) throws Exception;

    /**
     * Get an address by id
     * @param accessToken the access token of user
     * @param addressId the address id
     * @return the address response
     */
    AddressResponse getAddressById(String accessToken, Long addressId) throws Exception;

    /**
     * Get all addresses for a user
     * @param accessToken access token of user
     * @return the list of address responses
     */
    List<AddressResponse> getAllAddresses(String accessToken) throws Exception;
}
