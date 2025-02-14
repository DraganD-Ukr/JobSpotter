package org.job_spotter.jobpost.client;

import org.job_spotter.jobpost.dto.AddressResponse;
import org.job_spotter.jobpost.dto.UserBasicInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users/addresses/{user-id}")
    ResponseEntity<AddressResponse> getAddressById(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable("user-id") Long id
    );

    @GetMapping("/api/v1/users")
    ResponseEntity<Map<UUID, UserBasicInfoResponse>> getUsersBasicInfoByIds(
            @RequestParam List<UUID> userIds
    );

}
