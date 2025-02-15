package org.job_spotter.jobpost.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.authUtils.JWTUtils;
import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Map;
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


    @Operation(
            summary = "Create job post",
            description = "Create a job post. "
                    + "This method depends on user-service."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created job post"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden: User not authorized to use someone else's address",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Address not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PostMapping()
    public ResponseEntity<HttpStatus> createJobPost(
            @RequestHeader("Authorization") String accessToken,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Job post needed information")
            @RequestBody @Valid JobPostPostRequest jobPostPostRequest
    ) throws URISyntaxException {
        log.info("Creating job post");
        Long id = jobPostService.createJobPost(jobPostPostRequest, accessToken);
        return ResponseEntity.created(new URI("/api/v1/job-posts/"+id)).build();
    }


    @Operation(
            summary = "Apply to job post",
            description = "Apply to a job post. "
                    + "This method is transactional."
    )
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

            @Parameter(description = "Job post id")
            @PathVariable Long id,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "Job post apply request: is optional and contains cover letter(message)")
            @RequestBody(required = false) @Valid JobPostApplyRequest jobPostApplyRequest
    ) throws Exception {
        log.info("Applying to job post");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        jobPostService.applyToJobPost(id, userId, jobPostApplyRequest);

        return ResponseEntity.noContent().build();
    }


    @Operation(
            summary = "Get job posts created by user",
            description = "Retrieves all job posts created by the authenticated user. Job posts also contain basic info of applicants. "
                    + "This method depends on the user-service."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully got job posts created by user",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MyJobPostResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/my-job-posts")
    public ResponseEntity<List<MyJobPostResponse>> getMyJobPosts(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        log.info("Getting my job posts");
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return ResponseEntity.ok(jobPostService.getMyJobPosts(userId));
    }


    @Operation(
            summary = "Manage applicants of user's job post",
            description = "Approve or reject applicants of a job post. A list of applicants and their actions are provided in the request body. " +
                    "If number of confirmed applicants exceeds the number of maximum confirmed applicants, changes are not made and 400 returned. " +
                    "This method is transactional."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully updated(managed) applicants",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MyJobPostResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PostMapping("/my-job-posts/{id}/applicants/approve-reject")
    public ResponseEntity<HttpStatus> approveRejectApplicant(
            @RequestHeader("Authorization") String accessToken,

            @Parameter(description = "Job post id")
            @PathVariable Long id,

            @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "List of applicants and their actions")
            @RequestBody List <ApplicantActionRequest> applicantsActionRequest
            ) throws Exception {
        log.info("Accepting applicant");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        jobPostService.takeApplicantsAction(id, userId, applicantsActionRequest);

        return ResponseEntity.noContent().build();
    }


    @Operation(
            summary = "Start job post. Will be marked as In Progress",
            description = "Start a job post. The job post to start needs to have status OPEN and have at least one confirmed applicant."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully started jobPost"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized: User is not the owner of the job post",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden: Job post is not open",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PutMapping ("/my-job-posts/{id}/start")
    public ResponseEntity<HttpStatus> startJobPost(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable Long id
    ) throws Exception {

        log.info("Starting job post");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        jobPostService.startJobPost(userId, id);

        return ResponseEntity.noContent().build();
    }


    //Create job post with dummy data
//    @PostMapping()
//    public ResponseEntity<HttpStatus> createJobPostWithDummyData() {
//        log.info("Populating job post with dummy data");
//        jobPostService.createJobPostDomainDummyData();
//        return ResponseEntity.ok(HttpStatus.CREATED);
//    }

}
