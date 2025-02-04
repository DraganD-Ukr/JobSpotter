package org.jobspotter.user.service.implementation;

import lombok.RequiredArgsConstructor;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.exception.ResourceAlreadyExistsException;
import org.jobspotter.user.exception.ResourceNotFoundException;
import org.jobspotter.user.exception.UnauthorizedException;
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
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private static final Logger log = LoggerFactory.getLogger(AddressServiceImpl.class);
    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final GeoCodingService geoCodingService;

    @Override
    public ResponseEntity<HttpStatus> createAddress(UUID userId, AddressRequest addressRequest) {

//        Check if user exists
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

//        Check if user already has 5 addresses
        List<Address> addresses = addressRepository.findAllByUser(user);
        if (addresses.size() >= 5) {
            throw new ResourceAlreadyExistsException("Address limit exceeded: user with id " + userId + " already has 5 addresses. Remove an address to add a new one.");
        }

//        Or if user already has an address with type HOME
        if (addressRequest.getAddressType().equals(AddressType.HOME)) {
            addresses.stream().forEach(address -> {
                if (address.getAddressType().equals(AddressType.HOME)) {
                    throw new ResourceAlreadyExistsException("Address with type HOME already exists");
                }
            });
        }

//        Format address to a single string
        String fullAddress =  formatAddress(
                addressRequest.getStreetAddress(),
                addressRequest.getCity(),
                addressRequest.getCounty(),
                addressRequest.getEirCode()
        );

//        Get coordinates from address
        Map<String, Double> coordinates = geoCodingService.getCoordinates(fullAddress);

        Double lat = coordinates.get("lat");
        Double lng = coordinates.get("lng");

//        Set the address object
        Address address = Address.builder()
                .user(user)
                .address(fullAddress)
                .streetAddress(addressRequest.getStreetAddress())
                .city(addressRequest.getCity())
                .county(addressRequest.getCounty())
                .eirCode(addressRequest.getEirCode())
                .addressType(addressRequest.getAddressType())
                .latitude(lat)
                .longitude(lng)
                .build();


//          Save the address
        addressRepository.save(address);

        return ResponseEntity.status(HttpStatus.CREATED).build();

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
            throw new ResourceNotFoundException("User not found with id: " + userId);

        } else if(user.getUserId()!=userId) {
            log.warn("User with ID {} not authorized to delete address with id {}", userId, addressId);
            throw new UnauthorizedException("User with id "+ userId +" not authorized to delete address with id " + addressId);

        } else {
            addressRepository.delete(address);
            log.info("Address with ID {} deleted successfully", addressId);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }

    }

    private String formatAddress(String strAdr, String city, County county, String eirCode) {
        return strAdr + ", " + city + ", " + county.toString() + ", " + eirCode;
    }


}
