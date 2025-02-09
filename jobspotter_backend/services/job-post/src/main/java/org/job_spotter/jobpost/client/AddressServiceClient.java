package org.job_spotter.jobpost.client;

import org.job_spotter.jobpost.dto.AddressResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name = "user-service")
public interface AddressServiceClient {

    @GetMapping("/api/v1/users/addresses/{user-id}")
    AddressResponse getAddressById(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable("user-id") Long id
    );

}
