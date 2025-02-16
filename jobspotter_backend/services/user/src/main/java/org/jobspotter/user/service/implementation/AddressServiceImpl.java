package org.jobspotter.user.service.implementation;

import lombok.RequiredArgsConstructor;
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
import org.jobspotter.user.service.AddressService;
import org.jobspotter.user.service.GeoCodingService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private static final Logger log = LoggerFactory.getLogger(AddressServiceImpl.class);
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final GeoCodingService geoCodingService;

    @Override
    public Long createAddress(UUID userId, AddressRequest addressRequest) {

//        TODO: Check for duplicate addresses
//        Check if user exists
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

//        Check if user already has 5 addresses
        List<Address> addresses = addressRepository.findAllByUser(user);
        if (addresses.size() >= 5) {
            throw new ResourceAlreadyExistsException("Address limit exceeded: user with id " + userId + " already has 5 addresses. Remove an address to add a new one.");
        }

//        Format address to a single string
        String fullAddress =  formatAddress(
                addressRequest.getStreetAddress(),
                addressRequest.getCity(),
                addressRequest.getCounty(),
                addressRequest.getEirCode()
        );

//        Set the address object
        Address address = Address.builder()
                .address(fullAddress)
                .streetAddress(addressRequest.getStreetAddress())
                .city(addressRequest.getCity())
                .county(addressRequest.getCounty())
                .eirCode(addressRequest.getEirCode())
                .addressType(addressRequest.getAddressType())
                .isDefault(addressRequest.isDefault())
                .user(user)
                .build();

//        Or if user already has an address with type HOME or duplicate address
        hasDuplicateOrHomeConflict(addresses, address);



//        Get coordinates from address
        Map<String, Double> coordinates = geoCodingService.getCoordinates(fullAddress);

        Double lat = coordinates.get("lat");
        Double lng = coordinates.get("lng");

//        Set the coordinates
        address.setLatitude(lat);
        address.setLongitude(lng);

//          Save the address
         addressRepository.save(address);

        return address.getAddressId();

    }

    @Override
    public ResponseEntity<HttpStatus> deleteAddress(UUID userId, Long addressId) {

        Address address = addressRepository.findById(addressId)
                .orElseThrow(
                        () -> new ResourceNotFoundException("Address not found with id: " + addressId)
                );

        User user = address.getUser();

        if (user==null) {
            log.warn("User not found with ID {}", userId);
            throw new ResourceNotFoundException("User does not exist");

        } else if(!user.getUserId().equals(userId)) {
            log.warn("User with ID {} not authorized to delete address with id {}", userId, addressId);
            throw new ForbiddenException("User not authorized to delete the address");

        } else {
            addressRepository.delete(address);
            log.info("Address with ID {} deleted successfully", addressId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    @Override
    public ResponseEntity<?> updateAddress(UUID userId, Long addressId, AddressPatchRequest addressRequest) {


        log.info("Updating address with ID {}", addressId);

//        Try to find the user, else throw an exception
        User user = userRepository.findById(userId)
                .orElseThrow(() -> {
                    log.warn("User not found with ID: {}", userId);
                    return new ResourceNotFoundException("User not found with id: " + userId);
                });


//        Get all addresses of the user
        List<Address> userAddresses = addressRepository.findAllByUser(user);

//        Find the address to be updated
        Optional<Address> address = userAddresses.stream()
                .filter(curAdr -> curAdr.getAddressId().equals(addressId))
                .findFirst();

//        Check if address is not empty(wrapped in Optional)
        if (address.isEmpty()) {
            log.warn("Address not found with ID {}", addressId);
            throw new ResourceNotFoundException("Address not found with id: " + addressId);
        }

        log.info("Address found with ID {}", addressId);

        Address unwrappedAddress = address.get();
//        Unwrap the optional
        Address addressToBeUpdated = new Address(
                unwrappedAddress.getAddressId(),
                unwrappedAddress.getUser(),
                unwrappedAddress.getAddress(),
                unwrappedAddress.getStreetAddress(),
                unwrappedAddress.getCity(),
                unwrappedAddress.getCounty(),
                unwrappedAddress.getEirCode(),
                unwrappedAddress.getLongitude(),
                unwrappedAddress.getLatitude(),
                unwrappedAddress.getAddressType(),
                unwrappedAddress.isDefault()
        ) ;


//        Check if user exists and is authorized to update the address
         if(!user.getUserId().equals(userId)){
            log.warn("User with ID {} not authorized to update address with id {}", userId, addressId);
            throw new ForbiddenException("User not authorized to update the address");
         }


        if (updateAddressFields(addressRequest, addressToBeUpdated)){

//            Check for duplicate or HOME conflict
            hasDuplicateOrHomeConflict(userAddresses, addressToBeUpdated);

//            Update coordinates
            Map<String, Double> coordinates = geoCodingService.getCoordinates(addressToBeUpdated.getAddress());
            addressToBeUpdated.setLatitude(coordinates.get("lat"));
            addressToBeUpdated.setLongitude(coordinates.get("lng"));

//            Save the updated address
            addressRepository.save(addressToBeUpdated);
            log.info("Address with ID {} updated successfully", addressId);

        } else {
            log.info("No changes detected in address with ID {}", addressId);
            return ResponseEntity.ok("No changes detected in the address");
        }

        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();

    }

    @Override
    public ResponseEntity<AddressResponse> getAddressById(UUID userId, Long addressId) {

        log.info("Fetching address with ID {}", addressId);


        Address address = addressRepository.findById(addressId).orElseThrow(() -> {
            log.warn("Address not found with ID {}", addressId);
            return new ResourceNotFoundException("Address not found with id: " + addressId);
        });

        if (address.getUser() == null) {
            log.warn("User not found with ID {}", userId);
            throw new ResourceNotFoundException("User does not exist");
        }
        if(!address.getUser().getUserId().equals(userId)){
            log.warn("User with ID {} not authorized to get address with id {}", userId, addressId);
            throw new ForbiddenException("User not authorized to get the address");
        }

        return ResponseEntity.ok(AddressResponse.builder()
                .addressId(address.getAddressId())
                .userId(address.getUser().getUserId())
                .address(address.getAddress())
                .streetAddress(address.getStreetAddress())
                .city(address.getCity())
                .county(address.getCounty())
                .eirCode(address.getEirCode())
                .latitude(address.getLatitude())
                .longitude(address.getLongitude())
                .addressType(address.getAddressType())
                .isDefault(address.isDefault())
                .build());
    }

    @Override
    public ResponseEntity<List<AddressResponse>> getAllAddresses(UUID userId) {


        User user = userRepository.findById(userId)
                .orElseThrow( () -> new ResourceNotFoundException("User with id " + userId + " not found"));


        List<Address> addresses = addressRepository.findAllByUser(user);

        return ResponseEntity.ok(
                addresses.stream()
                        .map(address -> AddressResponse.builder()
                                .addressId(address.getAddressId())
                                .userId(address.getUser().getUserId())
                                .address(address.getAddress())
                                .streetAddress(address.getStreetAddress())
                                .city(address.getCity())
                                .county(address.getCounty())
                                .eirCode(address.getEirCode())
                                .latitude(address.getLatitude())
                                .longitude(address.getLongitude())
                                .addressType(address.getAddressType())
                                .isDefault(address.isDefault())
                                .build()
                        )
                        .toList()
        );

    }


//    ------------------------------------------ Helper methods ----------------------------------------

    /**
     * Check if the user already has an address with type HOME or if the full address is a duplicate
     * @param addresses
     * @param addressToUpdate
     * @return
     */
    private boolean hasDuplicateOrHomeConflict(List<Address> addresses, Address addressToUpdate) {

        for(Address currAdr : addresses) {

            if (    !currAdr.getAddressId().equals(addressToUpdate.getAddressId())
                    && addressToUpdate.getAddressType().equals(AddressType.HOME)
                    && currAdr.getAddressType().equals(AddressType.HOME)
            ) {
                log.warn("User with id {} already has an address with type HOME", addressToUpdate.getUser().getUserId());
                throw new ResourceAlreadyExistsException("User already has an address with type HOME");
            }
            if (currAdr.getAddress().equals(addressToUpdate.getAddress())) {
                log.warn("Duplicate address found when trying to add a new address for user with ID {}", addressToUpdate.getUser().getUserId());
                throw new ResourceAlreadyExistsException("Duplicate address found, please provide a different address");
            }

        }
        return false;
    }

    /**
     * Update the address fields if they are different
     * @param addressPatchRequest Patch request of address
     * @param address Address to be updated
     * @return true if any of the fields are updated, false otherwise
     */
    private boolean updateAddressFields(AddressPatchRequest addressPatchRequest, Address address) {

        boolean isUpdated = false;
        boolean toUpdateCoordinates = false;


        // Compare and update fields if they are different
        if (addressPatchRequest.getStreetAddress() != null
                && !addressPatchRequest.getStreetAddress().equals(address.getStreetAddress())) {
            address.setStreetAddress(addressPatchRequest.getStreetAddress());
            isUpdated = true;
            toUpdateCoordinates = true;
        }
        if (addressPatchRequest.getCity() != null
                && !addressPatchRequest.getCity().equals(address.getCity())) {
            address.setCity(addressPatchRequest.getCity());
            isUpdated = true;
            toUpdateCoordinates = true;
        }
        if (addressPatchRequest.getCounty() != null
                && !addressPatchRequest.getCounty().equals(address.getCounty())) {
            address.setCounty(addressPatchRequest.getCounty());
            isUpdated = true;
            toUpdateCoordinates = true;
        }
        if (addressPatchRequest.getEirCode() != null
                && !addressPatchRequest.getEirCode().equals(address.getEirCode())) {
            address.setEirCode(addressPatchRequest.getEirCode());
            isUpdated = true;
            toUpdateCoordinates = true;
        }
        if (addressPatchRequest.getAddressType() != null
                && !addressPatchRequest.getAddressType().equals(address.getAddressType())) {
            address.setAddressType(addressPatchRequest.getAddressType());
            isUpdated = true;
        }
        if (addressPatchRequest.isDefault() != address.isDefault()) {
            address.setDefault(addressPatchRequest.isDefault());
            isUpdated = true;
        }

//        Update coordinates if any of the address related fields are updated
        if (toUpdateCoordinates) {
            address.setAddress(
                    formatAddress(
                            address.getStreetAddress(),
                            address.getCity(),
                            address.getCounty(),
                            address.getEirCode()
                    ));
        }

        return isUpdated;
    }

    /**
     * Format the address to a single string with a ',' separator
     * @param strAdr Street address
     * @param city City
     * @param county County
     * @param eirCode Eircode
     * @return Formatted address. E.g. "123 Main St, Dublin, Dublin, D01 F2E3"
     */
    private String formatAddress(String strAdr, String city, County county, String eirCode) {
        return strAdr + ", " + city + ", " + county.toString() + ", " + eirCode;
    }

}
