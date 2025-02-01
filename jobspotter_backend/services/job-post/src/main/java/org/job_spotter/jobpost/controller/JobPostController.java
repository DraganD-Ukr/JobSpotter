package org.job_spotter.jobpost.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/job-post")
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
    @PostMapping()
    public ResponseEntity<HttpStatus> createJobPost() {
        log.info("Populating job post with dummy data");
        jobPostService.createJobPost();
        return ResponseEntity.ok(HttpStatus.CREATED);
    }
}
