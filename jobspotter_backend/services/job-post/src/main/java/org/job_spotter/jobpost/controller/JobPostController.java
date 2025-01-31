package org.job_spotter.jobpost.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/job-post")
@RequiredArgsConstructor
@Slf4j
public class JobPostController {

    //View all job posts
    @GetMapping("/viewAllJobPosts")
    public ResponseEntity<Object> viewAllJobPosts() {
        log.info("Viewing all job posts");
        return null;
    }
}
