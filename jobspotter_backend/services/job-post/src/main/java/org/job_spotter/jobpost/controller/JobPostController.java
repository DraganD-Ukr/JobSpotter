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
import org.job_spotter.jobpost.model.JobTagEnum;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/job-posts")
@RequiredArgsConstructor
@Slf4j
public class JobPostController {

    private final JobPostService jobPostService;

    //-----------------------------------------------------------------------------------------------------------------
    //                                           Job Post Viewing Endpoints
    //-----------------------------------------------------------------------------------------------------------------
    //Get Job Post tag enums
    @Operation(
            summary = "Get all job tag enums",
            description = "Returns a map of all job tag enum constants and their display names."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved job tag enums",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Map.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/tags")
    public ResponseEntity<Map<String, String>> getAllJobTags() {
        return ResponseEntity.ok(JobTagEnum.getAllEnumValues());
    }


    //Get Detailed job post by id
    @Operation(
            summary = "Get Detailed job post by id from perspective of Applicants.",
            description = "Gets job post by provided id in path. "
                    + "This method returns detailed job post information."
                    + "This method is used by applicants to view job post details."
                    + "Therefore does not contain information about other applicants."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully got job post by id",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = JobPostDetailedResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not Found: Job post not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    //TODO: Return response based on the perspective of the applicant
    @GetMapping("/{id}")
    public ResponseEntity<JobPostDetailedResponse> getJobPostById(
            @PathVariable Long id
    ) {
        log.info("Getting job post by id: {}", id);

        return ResponseEntity.ok(jobPostService.getJobPostById(id));
    }

    //Get job post details with JobPostId
    @Operation(
            summary = "Gets job post details with JobPostId",
            description = "Get job post details with job post id given in path. "
                    + "This method Returns a detailed job post information. along with applicants information."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved job post details along with applicants information",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = MyJobPostResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    //Get job post with detailed information
    @GetMapping("/my-job-post/{id}")
    public ResponseEntity<MyJobPostDetailedResponse> getMyJobPostDetails(

            @RequestHeader("Authorization") String accessToken,

            @Parameter(description = "Job post id")
            @PathVariable Long id
            ) throws Exception {

        log.info("Getting my job post details");
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return ResponseEntity.ok(jobPostService.getMyJobPostDetails(userId, id));
    }

    //Search job posts using query parameters 'title', 'tag' , 'latitude' , 'longitude' , 'radius' and 'page' and 'size'
    @Operation(
            summary = "Search job posts",
            description = "Search job posts using query parameters 'title', 'tag' , 'latitude' , 'longitude' , 'radius' and 'page' and 'size'. "
                    + "This method returns a list of job posts that match the search criteria."
                    + " - If title is provided, the search will be based on the title."
                    + " - If tags are provided, the search will be based on the tags."
                    + " - If latitude, longitude and radius are provided, the search will be based on the user's location."
                    + " - If page and size are provided, the search will be paginated. Default page is 0 and size is 10."
                    + "All parameters are optional. Combining multiple parameters will narrow down the search."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully searched job posts",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = JobPostSearchResponse.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/search")
    public ResponseEntity<Page<JobPostSearchResponse>> searchJobPosts(
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "tags", required = false) String tags,
            @RequestParam(required = false) Double latitude,   // User’s lat
            @RequestParam(required = false) Double longitude,  // User’s long
            @RequestParam(required = false) Double radius,  // Radius in km
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int size){


        Page<JobPostSearchResponse> results = jobPostService.searchJobPosts(title, tags, latitude, longitude, radius, pageNumber, size);
        return ResponseEntity.ok(results);
    }


    @Operation(
            summary = "Get job posts created by user",
            description = "Retrieves all job posts created by the authenticated user. Job posts also contain basic info of applicants. "
                    + "This method depends on the user-service."
                    + "This method returns a paginated list of job posts created by the user."
                    + " - If title is provided, the search will be based on the title."
                    + " - If tags are provided, the search will be based on the tags."
                    + " - If status is provided, the search will be based on the status."
                    + " - If page and size are provided, the search will be paginated. Default page is 0 and size is 10."
                    + "All parameters are optional. Combining multiple parameters will narrow down the search."

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
    public ResponseEntity<Page<MyJobPostResponse>> getMyJobPosts(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "tags", required = false) String tags,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(defaultValue = "0") int pageNumber,
            @RequestParam(defaultValue = "10") int size
    ) throws Exception {
        log.info("Getting my job posts");
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return ResponseEntity.ok(jobPostService.getMyJobPosts(userId, title, tags, status, pageNumber, size));
    }



    @GetMapping("/history")
    public ResponseEntity<Page<JobPostsUserWorkedOnResponse>> getJobsUserWorkedOn(

            @RequestHeader("Authorization") String accessToken,
            @RequestParam(value = "title", required = false) String title,
            @RequestParam(value = "tags",required = false) String tags,
            @RequestParam(value = "status", required = false) String status,
            @RequestParam(value = "sortBy", defaultValue = "datePosted") String sortBy,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortDirection,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size


    ) throws Exception {
        log.info("Getting my worked jobs");
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return ResponseEntity.ok(jobPostService.getJobsUserWorkedOn(userId, page, size, sortBy, sortDirection, status, title));
    }

    //-----------------------------------------------------------------------------------------------------------------
    //                                           Job Post Management Endpoints
    //-----------------------------------------------------------------------------------------------------------------
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




    @Operation(
            summary = "Cancel job post. Will be marked as CANCELLED",
            description = "Cancel a job post. The job post to cancel needs to have status OPEN."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully cancelled jobPost"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized: User is not the owner of the job post",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden: Job post is not open",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not Found: Job post not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PutMapping("/my-job-posts/{id}/cancel")
    public ResponseEntity<HttpStatus> cancelJobPost(
            @RequestHeader("Authorization") String accessToken,

            @Parameter(description = "Job post id")
            @PathVariable Long id
    ) throws Exception {

        log.info("Cancelling job post");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        jobPostService.cancelJobPost(userId, id);

        return ResponseEntity.noContent().build();
    }



    @Operation(
            summary = "Finish job post. Will be marked as COMPLETED",
            description = "Cancel a job post. The job post to finish needs to have status IN_PROGRESS."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Successfully finished Job Post"),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized: User is not the owner of the job post",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden: Job post is not in progress",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not Found: Job post not found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PutMapping("/my-job-posts/{id}/finish")
    public ResponseEntity<HttpStatus> finishJobPost(
            @RequestHeader("Authorization") String accessToken,

            @Parameter(description = "Job post id")
            @PathVariable Long id
    ) throws Exception {
        log.info("Finishing job post");

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        jobPostService.finishJobPost(userId, id);
        return ResponseEntity.noContent().build();
    }




}
