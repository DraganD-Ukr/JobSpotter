package org.jobspotter.jobpost.client;

import org.springframework.cloud.openfeign.FeignClient;

@FeignClient(name = "review-service")
public interface ReviewServiceClient {

    //Get Re

}
