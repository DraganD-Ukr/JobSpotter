package org.job_spotter.jobpost.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.authUtils.JWTUtils;
import org.job_spotter.jobpost.dto.ErrorResponse;
import org.job_spotter.jobpost.dto.JobPostApplyRequest;
import org.job_spotter.jobpost.dto.JobPostPostRequest;
import org.job_spotter.jobpost.dto.MyJobPostResponse;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.UUID;

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


    @Operation(summary = "Apply to job post")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully applied to job post"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden: User already applied to job post",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Job post not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PostMapping("/{id}/apply")
    public ResponseEntity<HttpStatus> applyToJobPost(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long id,
            @RequestBody(required = false) @Valid JobPostApplyRequest jobPostApplyRequest
    ) throws Exception {
        log.info("Applying to job post");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        jobPostService.applyToJobPost(id, userId, jobPostApplyRequest);

        return ResponseEntity.noContent().build();
    }


    @GetMapping("/my-job-posts")
    public ResponseEntity<List<MyJobPostResponse>> getMyJobPosts(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        log.info("Getting my job posts");
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return ResponseEntity.ok(jobPostService.getMyJobPosts(userId));
    }

    //Create job post with dummy data
//    @PostMapping()
//    public ResponseEntity<HttpStatus> createJobPostWithDummyData() {
//        log.info("Populating job post with dummy data");
//        jobPostService.createJobPostDomainDummyData();
//        return ResponseEntity.ok(HttpStatus.CREATED);
//    }

}
