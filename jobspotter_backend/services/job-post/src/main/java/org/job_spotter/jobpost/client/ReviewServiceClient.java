package org.job_spotter.jobpost.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient(name = "review-service")
public interface ReviewServiceClient {

    //Get Re

}
