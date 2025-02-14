package org.job_spotter.jobpost.client;

import org.job_spotter.jobpost.dto.UserBasicInfoResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@FeignClient(name = "user-service")
public interface UserServiceClient {

    @GetMapping("/api/v1/users")
    ResponseEntity<Map<UUID, UserBasicInfoResponse>> getUsersBasicInfoByIds(
            @RequestParam List<UUID> userIds
    );

}
