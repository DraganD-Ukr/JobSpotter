package org.jobspotter.user.service.implementation;

import lombok.RequiredArgsConstructor;
import org.jobspotter.user.dto.AddressRequest;
import org.jobspotter.user.exception.ResourceAlreadyExistsException;
import org.jobspotter.user.exception.ResourceNotFoundException;
import org.jobspotter.user.model.Address;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.User;
import org.jobspotter.user.repository.AddressRepository;
import org.jobspotter.user.repository.UserRepository;
import org.jobspotter.user.service.AddressService;
import org.jobspotter.user.service.GeoCodingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;
    private final UserRepository userRepository;
    private final GeoCodingService geoCodingService;

    @Override
    public ResponseEntity<HttpStatus> createAddress(UUID userId, AddressRequest addressRequest) {

        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

        List<Address> addresses = addressRepository.findAllByUser(user);
        if (addresses.size() >= 5) {
            throw new ResourceAlreadyExistsException("Address limit exceeded: user with id " + userId + " already has 5 addresses. Remove an address to add a new one.");
        }

        addresses.stream().forEach(address -> {
            if (address.getAddress().equals(AddressType.HOME) && addressRequest.getAddressType().equals(AddressType.HOME)) {
                throw new ResourceAlreadyExistsException("Address with type HOME already exists");
            }
        });

        Map<String, Double> coordinates = geoCodingService.getCoordinates(
                addressRequest.getStreetAddress() + ", " +
                addressRequest.getCity() + ", " +
                addressRequest.getCounty() + ", " +
                addressRequest.getEirCode()
        );

        Double lat = coordinates.get("lat");
        Double lng = coordinates.get("lng");

        Address address = Address.builder()
                .user(user)
                .address(
                        addressRequest.getStreetAddress() + ", " +
                        addressRequest.getCity() + ", " +
                        addressRequest.getCounty() + ", " +
                        addressRequest.getEirCode()
                )
                .streetAddress(addressRequest.getStreetAddress())
                .city(addressRequest.getCity())
                .county(addressRequest.getCounty())
                .eirCode(addressRequest.getEirCode())
                .addressType(addressRequest.getAddressType())
                .latitude(lat)
                .longitude(lng)
                .build();



        addressRepository.save(address);

        return ResponseEntity.status(HttpStatus.CREATED).build();

    }


}
