package org.jobspotter.review.client;


import org.jobspotter.review.dto.JobPostResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name = "job-post-service")
public interface JobPostServiceClient {

    @GetMapping("/api/v1/job-posts/{id}")
    ResponseEntity <JobPostResponse> getJobPostById(
            @PathVariable("id") Long id
    );

}
