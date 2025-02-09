package org.job_spotter.jobpost.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.dto.JobPostPostRequest;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/job-posts")
@RequiredArgsConstructor
@Slf4j
public class JobPostController {

    private final JobPostService jobPostService;

    //View all job posts
    @GetMapping()
    public ResponseEntity<List<JobPost>> viewAllJobPosts() {
        log.info("Viewing all job posts");
        return ResponseEntity.ok(jobPostService.getAllJobPosts());
    }

    // Get job post by tag using query parameter 'tag'
    @GetMapping("/by-tag")
    public ResponseEntity<List<JobPost>> getJobPostByTag(@RequestParam("tag") String tag) {
        log.info("Getting job posts by tag: {}", tag);
        List<JobPost> jobPosts = jobPostService.getJobPostByTag(tag);
        if (jobPosts.isEmpty()) {
            log.info("No jobs found for tag: {}", tag);
        }
        return ResponseEntity.ok(jobPosts);
    }

    //Create job post with dummy data
    @PostMapping()
    public ResponseEntity<HttpStatus> createJobPost(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid JobPostPostRequest jobPostPostRequest
    ) throws URISyntaxException {
        log.info("Creating job post");
        Long id = jobPostService.createJobPost(jobPostPostRequest, accessToken);
        return ResponseEntity.created(new URI("/api/v1/job-posts/"+id)).build();
    }

    //Create job post with dummy data
//    @PostMapping()
//    public ResponseEntity<HttpStatus> createJobPostWithDummyData() {
//        log.info("Populating job post with dummy data");
//        jobPostService.createJobPostDomainDummyData();
//        return ResponseEntity.ok(HttpStatus.CREATED);
//    }

}
