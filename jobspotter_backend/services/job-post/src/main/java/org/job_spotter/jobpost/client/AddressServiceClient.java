package org.job_spotter.jobpost.client;

import org.job_spotter.jobpost.dto.AddressResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "user-service", url = "http://user-service/api/v1/job-posts")
public interface AddressServiceClient {

    @GetMapping
    AddressResponse getAddressById(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam("id") Long id
    );

}
