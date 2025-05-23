package org.jobspotter.jobpost.service.Implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import feign.FeignException.FeignClientException;
import jakarta.persistence.Tuple;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.jobpost.authUtils.JWTUtils;
import org.jobspotter.jobpost.client.UserServiceClient;
import org.jobspotter.jobpost.dto.*;
import org.jobspotter.jobpost.exception.*;
import org.jobspotter.jobpost.model.*;
import org.jobspotter.jobpost.repository.ApplicantRepository;
import org.jobspotter.jobpost.repository.JobPostRepository;
import org.jobspotter.jobpost.repository.JobPostSpecificationRepository;
import org.jobspotter.jobpost.repository.specification.JobPostSpecification;
import org.jobspotter.jobpost.service.JobPostService;
import org.jobspotter.jobpost.service.NotificationService;
import org.jobspotter.jobpost.service.SearchTitleSuggestionService;
import org.jobspotter.jobpost.utils.GeoUtils;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobPostImpl implements JobPostService {

    private final JWTUtils jwtUtils;
    private final JobPostRepository jobPostRepository;
    private final UserServiceClient userServiceClient;
    private final ApplicantRepository applicantRepository;
    private final JobPostSpecificationRepository jobPostSpecificationRepository;
    private final NotificationService notificationService;
    private final RedisTemplate<String, Object> redisTemplate;
    private final SearchTitleSuggestionService searchTitleSuggestionService;

    private static final String TOP_JOB_POSTS_KEY = "top10:jobposts";

    //----------------------------------------------------------------------------------------------------------------
    //                                     Job Post Get View Queries implementation
    //----------------------------------------------------------------------------------------------------------------

    /**
     * Get a job post by its ID
     *
     * @param accessToken The ID of the job post
     * @param jobPostId   The ID of the job post
     * @return The job post with the given ID
     */
    @Override
    @Cacheable(value = "jobPostCache", key = "#jobPostId")
    public JobPostDetailedResponse getJobPostById(String accessToken, Long jobPostId, String ipAddress) throws Exception {

        JobPost jobPost = getJobPostByID(jobPostId);

        // Check if the user is an admin if not, than increment the daily job post view
        if(!jwtUtils.hasAdminRole(accessToken)) {
            incrementDailyJobPostView(accessToken,jobPostId, ipAddress);
        }

//        Create the JobPostResponse object
        return JobPostDetailedResponse.builder()
                .jobPostId(jobPost.getJobPostId())
                .jobPosterId(jobPost.getJobPosterId())
                .tags(
                        jobPost.getTags().stream()
                        .map(tag -> TagDto.builder()
                                .tagId(tag.getTagId())
                                .name(tag.getName())
                                .build())
                        .collect(Collectors.toSet())
                )
                .title(jobPost.getTitle())
                .description(jobPost.getDescription())
                .address(jobPost.getAddress())
                .longitude(jobPost.getLongitude())
                .latitude(jobPost.getLatitude())
                .datePosted(jobPost.getDatePosted())
                .lastUpdatedAt(jobPost.getLastUpdatedAt())
                .applicantsCount(jobPost.getApplicants().size())
                .maxApplicants(jobPost.getMaxApplicants())
                .status(jobPost.getStatus())
                .build();

    }

    /**
     * Get a job post by its ID and return a detailed response
     * Containing all the applicants and their details as well as the job post details
     * Only the job poster or an admin can view the detailed response
     *
     * @param jobPostId The ID of the job post
     * @return The job post with the given ID
     */

    @Override
    @Cacheable(value = "myJobPostCache", key = "T(org.jobspotter.jobpost.authUtils.JWTUtils).getUserIdFromToken(#accessToken).toString() + ':' + #jobPostId")
    public MyJobPostDetailedResponse getMyJobPostDetails(String accessToken, Long jobPostId) throws Exception {

        // Fetch the job post from the repository
        JobPost jobPost = getJobPostByID(jobPostId);

        // Check if the user is the job poster or an admin
        checkIfUserIsJobPosterOrAdmin(accessToken, jobPost);

        return MyJobPostDetailedResponse.builder()
                .jobPostId(jobPost.getJobPostId())
                .jobPosterId(jobPost.getJobPosterId())
                .tags(
                        jobPost.getTags().stream()
                                .map(tag -> TagDto.builder()
                                        .tagId(tag.getTagId())
                                        .name(tag.getName())
                                        .build())
                                .collect(Collectors.toSet())
                )
                .applicants(jobPost.getApplicants().stream()
                        .map(applicant -> ApplicantDetailedResponse.builder()
                                .applicantId(applicant.getApplicantId())
                                .userId(applicant.getUserId())
                                .message(applicant.getMessage())
                                .status(applicant.getStatus())
                                .build())
                        .collect(Collectors.toList()))
                .title(jobPost.getTitle())
                .description(jobPost.getDescription())
                .address(jobPost.getAddress())
                .longitude(jobPost.getLongitude())
                .latitude(jobPost.getLatitude())
                .datePosted(jobPost.getDatePosted())
                .lastUpdatedAt(jobPost.getLastUpdatedAt())
                .maxApplicants(jobPost.getMaxApplicants())
                .status(jobPost.getStatus())
                .build();
    }

    /**
     * Get the top 10 job posts based on the number of applicants
     * Uses Redis to store the top 10 job posts
     *
     * @return A list of the top 10 job posts
     */
    @Override
    public List<JobPostTop10> getTop10JobPosts() {
        Set<Object> topJobPostIds = redisTemplate.opsForZSet()
                .reverseRange(TOP_JOB_POSTS_KEY, 0, 9); // Top 10 highest scores

        if (topJobPostIds == null || topJobPostIds.isEmpty()) {
            return Collections.emptyList();
        }

        List<Long> jobPostIds = topJobPostIds.stream()
                .filter(Objects::nonNull)
                .map(id -> Long.parseLong(id.toString()))
                .toList();

        List<JobPost> jobPosts = jobPostRepository.findAllById(jobPostIds);

        return jobPosts.stream()
                .map(jobPost -> {
                    Double viewCountDouble = redisTemplate.opsForZSet()
                            .score(TOP_JOB_POSTS_KEY, jobPost.getJobPostId());
                    Long viewCount = (viewCountDouble != null) ? viewCountDouble.longValue() : 0L;

                    return JobPostTop10.builder()
                            .jobPostId(jobPost.getJobPostId())
                            .title(jobPost.getTitle())
                            .tags(jobPost.getTags())
                            .description(jobPost.getDescription())
                            .address(jobPost.getAddress())
                            .longitude(jobPost.getLongitude())
                            .latitude(jobPost.getLatitude())
                            .applicantsCount(jobPost.getApplicants().size())
                            .maxApplicants(jobPost.getMaxApplicants())
                            .datePosted(jobPost.getDatePosted().toString())
                            .lastUpdatedAt(jobPost.getLastUpdatedAt().toString())
                            .viewCount(viewCount) // <-- Add view count here
                            .build();
                })
                .toList();
    }

    //----------------------------------------------------------------------------------------------------------------
    //                                     Job Post Search Queries implementation
    //----------------------------------------------------------------------------------------------------------------

    /**
     * Search for job posts based on the given parameters
     * Returns a paginated list of job posts with response optimised for large lists
     * Details can then be fetched on with another method using the given jobPostId
     *
     * @param title Title of the job post
     * @param tags comma separated list of tags
     * @param longitude Longitude of the user's location
     * @param latitude Latitude of the user's location
     * @param radius Radius in kilometers from the user's location
     * @param pageNumber  Page number
     * @param pageSize Number of items per page
     * @return Page of JobPostSearchResponse
     */
    @Override
    public Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize) {
        //TODO: Sort By and Sort Direction
        //TODO: Trim Discription For better request performance
        //TODO: Optimize Search Response DTO (users will be sent to view details of job post on another page)

        // Check if the Page number and size are valid
        checkIfPageNumberAndSizeAreValid(pageNumber, pageSize);

        // Split the tags string into a list of tag names
        List<String> tagList = covertTagsToListFromString(tags);



        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);


        // Build the specification for filtering
        Specification<JobPost> spec = JobPostSpecification.filterByParams(title, tagList, latitude, longitude, radius);

        // Fetch the job posts with the specification
        Page<JobPost> jobPosts = jobPostSpecificationRepository.findAll(spec, pageRequest);


        // Map the job posts to JobPostSearchResponse

        // Fetch the filtered results
        return jobPosts.map(jobPost -> JobPostSearchResponse.builder()
                .jobPostId(jobPost.getJobPostId())
                .jobPosterId(jobPost.getJobPosterId())
                .tags(jobPost.getTags())
                .applicantsCount(jobPost.getApplicants().size())
                .title(jobPost.getTitle())
                .description(jobPost.getDescription())
                .address(jobPost.getAddress())
                .longitude(jobPost.getLongitude())
                .latitude(jobPost.getLatitude())
                .relevantDistance((latitude!=null&&longitude!=null)?GeoUtils.haversine(latitude, longitude, jobPost.getLatitude(), jobPost.getLongitude(), GeoUtils.EARTH_RADIUS_KM):0)
                .datePosted(jobPost.getDatePosted())
                .lastUpdatedAt(jobPost.getLastUpdatedAt())
                .maxApplicants(jobPost.getMaxApplicants())
                .status(jobPost.getStatus())
                .build());
    }


    /**
     * Get all job posts created by the user
     * Filter by title, tags, and status
     * Returns a paginated list of job posts created by the user with response optimised for large lists
     * Details can then be fetched on with another method using the given jobPostId
     *
     * @param accessToken The access token of the user
     * @param title  The title of the job post
     * @param tags  The tags associated with the job post
     * @param status The status of the job post
     * @param pageNumber The page number
     * @param pageSize The page size
     * @return Page of MyJobPostSearchResponse
     */
    @Override
    public Page<MyJobPostSearchResponse> searchMyJobPosts(String accessToken, String title, String tags, String status, int pageNumber, int pageSize) throws Exception {
        //TODO: Sort By and Sort Direction
        //TODO: Trim Discription For better request performance


        // Get the user ID from the access token
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);


        // Check if the Page number and size are valid
        checkIfPageNumberAndSizeAreValid(pageNumber, pageSize);

        // Split the tags string into a list of tag names
        List<String> tagList = covertTagsToListFromString(tags);

        // Create a PageRequest object for pagination
        PageRequest pageRequest = PageRequest.of(pageNumber, pageSize);

        // Build the specification for filtering
        Specification<JobPost> spec = JobPostSpecification.filterByParams(userId, title, tagList, status);

        // Fetch the job posts with the specification
        Page<JobPost> jobPosts = jobPostSpecificationRepository.findAll(spec, pageRequest);

        // Map the job posts to MyJobPostSearchResponse
        return jobPosts.map(jobPost -> MyJobPostSearchResponse.builder()
                .jobPostId(jobPost.getJobPostId())
                .tags(jobPost.getTags())
                .title(jobPost.getTitle())
                .description(jobPost.getDescription())
                .address(jobPost.getAddress())
                .datePosted(jobPost.getDatePosted())
                .lastUpdatedAt(jobPost.getLastUpdatedAt())
                .ApplicantsCount(jobPost.getApplicants().size())
                .maxApplicants(jobPost.getMaxApplicants())
                .status(jobPost.getStatus())
                .build());
    }


    //This Function returns Job post based on job p[ost worked on response DTO which incudes job post details and applicant details from
    //applicant model
    @Override
    public Page<JobPostsUserWorkedOnSearchResponse> searchJobsUserWorkedOn(String accessToken, String title, String status, String sortBy, String sortDirection, int page, int size) throws Exception {

        // Get the user ID from the access token
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);


        // Check if the Page number and size are valid
        checkIfPageNumberAndSizeAreValid(page, size);

        // Define allowed sorting fields
        Set<String> allowedSortFields = Set.of("datePosted", "lastUpdatedAt", "title", "status");

        // Validate the sortBy parameter
        if (!allowedSortFields.contains(sortBy)) {
            throw new InvalidRequestException("Invalid sortBy parameter: " + sortBy);
        }

        // Create a Specification with dynamic filters
        Specification<JobPost> spec = JobPostSpecification.filterByParamsJobWorkedOn(status, title, userId);

        // Define the sort direction
        Sort.Direction direction = sortDirection.equalsIgnoreCase("desc") ? Sort.Direction.DESC : Sort.Direction.ASC;
        // Paginate and sort
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortBy));

        // Fetch the filtered and paginated results
        Page<JobPost> jobPosts = jobPostSpecificationRepository.findAll(spec, pageable);
        return jobPosts.map(jobPost -> JobPostsUserWorkedOnSearchResponse.builder()
                .jobPostId(jobPost.getJobPostId())
                .tags(jobPost.getTags())
                .title(jobPost.getTitle())
                .description(jobPost.getDescription())
                .address(jobPost.getAddress())
                .datePosted(jobPost.getDatePosted())
                .lastUpdatedAt(jobPost.getLastUpdatedAt())
                .applicantsCount(jobPost.getApplicants().size())
                .maxApplicants(jobPost.getMaxApplicants())
                .applicantStatus(jobPost.getApplicants().stream()
                        .filter(applicant -> applicant.getUserId().equals(userId))
                        .findFirst()
                        .map(Applicant::getStatus)
                        .orElse(null))
                .dateApplied(jobPost.getApplicants().stream()
                        .filter(applicant -> applicant.getUserId().equals(userId))
                        .findFirst()
                        .map(Applicant::getDateApplied)
                        .orElse(null))
                .lastApplicantStatusChange(jobPost.getApplicants().stream()
                        .filter(applicant -> applicant.getUserId().equals(userId))
                        .findFirst()
                        .map(Applicant::getDateUpdated)
                        .orElse(null))
                .status(jobPost.getStatus())
                .build()
        );

    }

    //----------------------------------------------------------------------------------------------------------------
    //                                     Job Post Operations implementation
    //----------------------------------------------------------------------------------------------------------------

    @Override
    public Long createJobPost(String accessToken, JobPostPostRequest jobPostPostRequest) {

        try {
            ResponseEntity<AddressResponse> response = userServiceClient.getAddressById(accessToken, jobPostPostRequest.getAddressId());

            AddressResponse userAddress = response.getBody();

            if (userAddress == null) {
                log.error("Error retrieving user address from user-service");
                throw new ServerException("Server error: Could not retrieve user address. Please try again later.");
            }

            Set<Tag> tags = convertTagsFromDto(jobPostPostRequest.getTags());

            UUID userId;
            try {
                userId = JWTUtils.getUserIdFromToken(accessToken);
            } catch (Exception e) {
                log.error("Error getting user ID from token: {}", e.getMessage(), e);
                throw new ServerException("Something went wrong. Please try again later.");
            }


            JobPost jobPost = JobPost.builder()
                    .jobPosterId(userId)
                    .tags(tags)
                    .title(jobPostPostRequest.getTitle())
                    .description(jobPostPostRequest.getDescription())
                    .address(userAddress.getAddress())
                    .longitude(userAddress.getLongitude())
                    .latitude(userAddress.getLatitude())
                    .maxApplicants(jobPostPostRequest.getMaxApplicants())
                    .status(JobStatus.OPEN)
                    .build();

            jobPostRepository.save(jobPost);

            log.info("Job post created successfully");

            notificationService.sendNotification(Notification.builder()
                    .message("You have successfully created a new job post '" + jobPost.getTitle() + "'.")
                    .destinationUserId(userId)
                    .jobPostId(jobPost.getJobPostId())
                    .actionUrl("/job-posts/my-job-posts/" + jobPost.getJobPostId())
                    .action("VIEW")
                    .createdAt(LocalDateTime.now())
                    .build(), KafkaTopic.JOB_POST_CREATE);

            searchTitleSuggestionService.addTitle(jobPost.getTitle());

            return jobPost.getJobPostId();
            
        } catch (FeignClientException e){

            if (e.status() == HttpStatus.NOT_FOUND.value()) {
                logAddressClientException(e);
                throw new ResourceNotFoundException(getErrorMessageFromFeignException(e));

            } else if (e.status() == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                logAddressClientException(e);
                throw new ServerException(getErrorMessageFromFeignException(e));

            } else if (e.status() == HttpStatus.UNAUTHORIZED.value()) {
                logAddressClientException(e);
                throw new UnauthorizedException(getErrorMessageFromFeignException(e));

            } else if (e.status() == HttpStatus.FORBIDDEN.value()) {
                logAddressClientException(e);
                throw new ForbiddenException(getErrorMessageFromFeignException(e));

            }
        }

        return null;

    }

    /**
     * Update a job post by its ID
     * Only the job poster and admins can update a job post
     * The job post status must be OPEN if the user is not an admin
     *
     * @param accessToken Access token of the user to check if they are an admin or job poster
     * @param jobPostId The ID of the job post to update
     * @param jobPostPatchRequest The fields to update
     * @throws Exception If the user is not an admin or job poster, or job post status is not OPEN
     */
    @Transactional
    @Override
    public void updateJobPost(String accessToken, Long jobPostId, JobPostPatchRequest jobPostPatchRequest) throws Exception {
//        Get the job post from the database
        JobPost jobPost = getJobPostByID(jobPostId);

//       Check if the user is an admin also saves weather it is an admin or not
        boolean isAdmin = checkIfUserIsJobPosterOrAdmin(accessToken, jobPost);

//       check if the job post status is OPEN if the user is not an admin
        if (!isAdmin){
            checkJobPostStatus(jobPost, JobStatus.OPEN);
        }

        // Update the job post fields
        Optional.ofNullable(jobPostPatchRequest.getTags())
                .ifPresent(tags -> jobPost.setTags(convertTagsFromDto(tags)));

        Optional.ofNullable(jobPostPatchRequest.getTitle())
                .ifPresent(jobPost::setTitle);

        Optional.ofNullable(jobPostPatchRequest.getDescription())
                .ifPresent(jobPost::setDescription);

        if (jobPostPatchRequest.getMaxApplicants() != 0) {
            jobPost.setMaxApplicants(jobPostPatchRequest.getMaxApplicants());
        }

        // Save the updated job post
        jobPostRepository.save(jobPost);

        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());
        log.info("Job post updated successfully");
    }

    /**
     * Delete a job post by its ID
     * Only the job poster and admins can delete a job post
     *
     * @param accessToken Access token of the user to check if they are an admin or job poster
     * @param jobPostId The ID of the job post to delete
     * @throws Exception If the user is not an admin or job poster, or job post status is not OPEN
     */

    @Transactional
    @Override
    public void deleteJobPost(String accessToken, Long jobPostId) throws Exception {
        // Find the job post
        JobPost jobPost = getJobPostByID(jobPostId);

        // Check if the user is an admin
        checkIfUserIsAdmin(accessToken);

        // Delete the job post
        jobPostRepository.delete(jobPost);

        // Remove the job post from the cache
        redisTemplate.delete("jobPostCache::" + jobPostId);
        redisTemplate.delete("myJobPostCache::" + JWTUtils.getUserIdFromToken(accessToken) + ":" + jobPostId);

        log.info("Job post deleted successfully");
    }

    /**
     * Apply to a job post by its ID
     * Only the job poster and admins can apply to a job post
     * The job post status must be OPEN if the user is not an admin
     *
     * @param accessToken
     * @param jobPostId   The ID of the job post to apply to
     * @param jobPostApplyRequest
     */

    @Override
    public void applyToJobPost(String accessToken, Long jobPostId, JobPostApplyRequest jobPostApplyRequest) throws Exception {


        // Extract userId
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        // Find the job post
        JobPost jobPost = getJobPostByID(jobPostId);

        // Check if job post status is open
        checkJobPostStatus(jobPost, JobStatus.OPEN);

        if (jobPost.getJobPosterId().equals(userId)) {
            log.warn("Could not apply applicant to JobPost: User cannot apply to own job post");
            throw new ForbiddenException("You cannot apply to your own job post.");
        }


        String applicantMessage = (jobPostApplyRequest != null) ? jobPostApplyRequest.getMessage() : "";

        // Create the applicant object
        Applicant applicant = Applicant.builder()
                .userId(userId)
                .message(applicantMessage)
                .status(ApplicantStatus.PENDING)
                .build();

        // Add the applicant to the job post
        boolean added = jobPost.getApplicants().add(applicant);

        if (!added) {
            log.warn("Could not apply applicant to JobPost: User already applied to job post");
            throw new ForbiddenException("You have already applied to this job post.");
        }

        // Save the applicant explicitly
        applicantRepository.save(applicant);


        jobPostRepository.save(jobPost);

        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());

        log.info("User applied to job post successfully");

        notificationService.sendNotification(Notification.builder()
                .message("You have successfully applied to the job post '" + jobPost.getTitle() + "'. Good luck!")
                .destinationUserId(userId)
                .jobPostId(jobPost.getJobPostId())
                .actionUrl("/job-posts/" + jobPost.getJobPostId())
                .action("VIEW")
                .createdAt(LocalDateTime.now())
                .build(), KafkaTopic.APPLICANT_APPLIED);

        notificationService.sendNotification(Notification.builder()
                .message("New applicant applied to your job post '" + jobPost.getTitle() + "'.")
                .destinationUserId(jobPost.getJobPosterId())
                .jobPostId(jobPost.getJobPostId())
                .actionUrl("/job-posts/my-job-posts/" + jobPost.getJobPostId())
                .action("VIEW")
                .createdAt(LocalDateTime.now())
                .build(), KafkaTopic.APPLICANT_APPLIED);

        log.info("User applied to job post successfully");
    }

    @Transactional
    @Override
    public void takeApplicantsAction(UUID userId, Long jobPostId, List<ApplicantActionRequest> applicantsActionRequest) {

//        TODO: Refactor for readability and efficiency

        // Find the job post
        JobPost jobPost = getJobPostByID(jobPostId);

        // Check if the user is the job poster
        checkIfUserIsJobPoster(userId, jobPost);

        // Check if job post status is open
        checkJobPostStatus(jobPost, JobStatus.OPEN);



        // Count the number of accepted applicants (before processing the action request)
        long acceptedApplicantsCount = jobPost.getApplicants().stream()
                .filter(a -> a.getStatus() == ApplicantStatus.ACCEPTED)
                .count();

        // Process each applicant action in the request list
        for (ApplicantActionRequest applicantActionRequest : applicantsActionRequest) {

            Long applicantId = (long) applicantActionRequest.getApplicantId();  // Get applicant's userId from the request
            ApplicantStatus requestedStatus = applicantActionRequest.getStatus();  // Get the requested status (ACCEPTED, REJECTED)

            // Find the applicant in the job post applicants set
            Applicant applicant = getApplicantById(jobPost, applicantId);

            // Check if the status is valid and handle it
            if (requestedStatus == ApplicantStatus.ACCEPTED) {
                // If the applicant is accepted, update their status
                applicant.setStatus(ApplicantStatus.ACCEPTED);
                acceptedApplicantsCount++;  // Increment accepted applicants count

                // Check if we exceed the max number of accepted applicants
                if (acceptedApplicantsCount > jobPost.getMaxApplicants()) {
                    log.warn("Cannot accept applicant: Max number of applicants exceeded.");
                    throw new ForbiddenException("Cannot accept more applicants. Max limit reached.");
                }
            } else if (requestedStatus == ApplicantStatus.REJECTED) {
                // If the applicant is rejected, update their status
                applicant.setStatus(ApplicantStatus.REJECTED);
            } else if (requestedStatus == ApplicantStatus.PENDING) {
                // If an invalid status is provided
                applicant.setStatus(ApplicantStatus.PENDING);
            } else {
                log.warn("Could not process applicant action: Invalid status");
                throw new InvalidRequestException("Invalid status provided.");
            }
        }

        // If the number of accepted applicants reaches the max limit, change the job post status to IN_PROGRESS
        if (acceptedApplicantsCount >= jobPost.getMaxApplicants()) {
            jobPost.setStatus(JobStatus.IN_PROGRESS);

            notificationService.sendNotification(Notification.builder()
                    .message("Your job post '" + jobPost.getTitle() + "' have reached the desired number of accepted applicants. Job post is now in progress.")
                    .destinationUserId(jobPost.getJobPosterId())
                    .jobPostId(jobPost.getJobPostId())
                    .actionUrl("/job-posts/my-job-posts/" + jobPost.getJobPostId())
                    .action("VIEW")
                    .createdAt(LocalDateTime.now())
                    .build(), KafkaTopic.JOB_POST_START);

            jobPost.getApplicants().stream()
                    .filter(applicant -> applicant.getStatus() == ApplicantStatus.ACCEPTED)
                    .forEach(applicant -> notificationService.sendNotification(Notification.builder()
                            .message("You have been accepted for the job post '" + jobPost.getTitle() + "'. Good luck!")
                            .destinationUserId(applicant.getUserId())
                            .jobPostId(jobPost.getJobPostId())
                            .actionUrl("/job-posts/" + jobPost.getJobPostId())
                            .action("VIEW")
                            .createdAt(LocalDateTime.now())
                            .build(), KafkaTopic.APPLICANT_CONFIRMED)
                    );

            log.info("Reached desired number of accepted applicants. Job post is now in progress.");
        }

        // Save all updated applicants in one go
        applicantRepository.saveAll(jobPost.getApplicants());

        // Save the updated job post
        jobPostRepository.save(jobPost);

        // Update the job post cache
        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());

        log.info("All applicant actions processed successfully.");
    }



    /**
     * Update the message of an applicant using the job post ID and applicant ID
     * Only the admins and applicants can update the message
     * The job post status must be OPEN if the user is not an admin
     * The applicant must exist in the job post applicants set
     * The message must be a non-empty string
     *
     * @param accessToken Access token of the user to check if they are an admin or job poster
     * @param jobPostId The ID of the job post to check where the applicant exists
     * @param applicantId The ID of the applicant to update the message
     * @param message The new message to update
     * @throws Exception If the user is not an admin or job poster, job post status is not OPEN, applicant does not exist, or message is empty
     */
    @Override
    public void updateApplicantMessage(String accessToken, Long jobPostId, Long applicantId, String message) throws Exception{
//        Get the job post from the database
        JobPost jobPost = getJobPostByID(jobPostId);

//       Check if the user is an admin or applicant
        boolean isAdmin = checkIfUserIsApplicantOrAdmin(accessToken, jobPost, applicantId);

        // If the user is not an admin, check if the job post status is OPEN
        if (!isAdmin) {
            checkJobPostStatus(jobPost, JobStatus.OPEN);
        }

        // Find the applicant in the job post applicants set
        Applicant applicant = getApplicantById(jobPost, applicantId);

        // Update the applicant message
        applicant.setMessage(message);

        // Save the updated applicant
        applicantRepository.save(applicant);

        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());

        log.info("Applicant message updated successfully");
    }

    /**
     * Delete an applicant from a job post using the job post ID and applicant ID
     * Only the job poster and admins can delete an applicant
     * The job post status must be OPEN
     * The applicant must exist in the job post applicants set
     *
     * @param accessToken Access token of the user to check if they are an admin or job poster
     * @param jobPostId The ID of the job post to check where the applicant exists
     * @param applicantId The ID of the applicant to delete
     * @throws Exception If the user is not an admin or job poster, job post status is not OPEN, or applicant does not exist
     */
    @Transactional
    @Override
    public void deleteApplicant(String accessToken, Long jobPostId, Long applicantId) throws Exception {
//        Get the job post from the database
        JobPost jobPost = getJobPostByID(jobPostId);

//       Check if the user is an admin
        checkIfUserIsAdmin(accessToken);

//       check if the job post status is OPEN
        checkJobPostStatus(jobPost, JobStatus.OPEN);

        // Find the applicant in the job post applicants set
        Applicant applicant = getApplicantById(jobPost, applicantId);

        // Remove the applicant from the job post applicants set
        jobPost.getApplicants().remove(applicant);

        // Save the the updated job post
        jobPostRepository.save(jobPost);

        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());

        log.info("Applicant deleted successfully");
    }

    @Transactional
    @Override
    public void startJobPost(String accessToken, Long jobPostId) throws Exception {
//        Get the job post from the database
        JobPost jobPost = getJobPostByID(jobPostId);

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
//        Check if the user is the job poster
        checkIfUserIsJobPoster(userId, jobPost);

//        Check if the job post status is OPEN
        checkJobPostStatus(jobPost, JobStatus.OPEN);

//        Get all applicants for the job post
        Set<Applicant> applicants = jobPost.getApplicants();

//        Check if there are any accepted applicants
        Long numOfAcceptedApplicants = applicants.stream()
                .filter(applicant -> applicant.getStatus() == ApplicantStatus.ACCEPTED)
                .count();

//        If no applicants are accepted, throw an exception
        if (numOfAcceptedApplicants.intValue() == 0) {
            log.warn("Could not start job post: No applicants accepted for job post with id {}", jobPostId);
            throw new InvalidRequestException("At least 1 applicant must be accepted to start the job post.");
        } else {

//        For each applicant with status PENDING, set status to REJECTED as the job post has started
//        and no more applicants can be accepted thus all pending applicants are rejected
            applicants.stream()
                    .filter(applicant -> applicant.getStatus() == ApplicantStatus.PENDING)
                    .forEach(applicant -> applicant.setStatus(ApplicantStatus.REJECTED));
        }

//        Save the updated applicants
        applicantRepository.saveAll(applicants);

//        Set the status of the job post to IN_PROGRESS
        jobPost.setStatus(JobStatus.IN_PROGRESS);
        jobPostRepository.save(jobPost);

        // Manual cache eviction
        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());


        notificationService.sendNotification(Notification.builder()
                .message("Your job post '" + jobPost.getTitle() + "' have started. Good luck!:")
                .destinationUserId(jobPost.getJobPosterId())
                .jobPostId(jobPost.getJobPostId())
                .actionUrl("/job-posts/my-job-posts/" + jobPost.getJobPostId())
                .action("VIEW")
                .createdAt(LocalDateTime.now())
                .build(), KafkaTopic.JOB_POST_START);

        applicants.stream()
                .filter(applicant -> applicant.getStatus() == ApplicantStatus.ACCEPTED)
                .forEach(applicant -> notificationService.sendNotification(Notification.builder()
                        .message("You have been accepted for the job post '" + jobPost.getTitle() + "'. Good luck!")
                        .destinationUserId(applicant.getUserId())
                        .jobPostId(jobPost.getJobPostId())
                        .actionUrl("/job-posts/" + jobPost.getJobPostId())
                        .action("VIEW")
                        .createdAt(LocalDateTime.now())
                        .build(), KafkaTopic.APPLICANT_CONFIRMED)
                );

        log.info("Job post started successfully");
    }

    /**
     * Cancel a job post by its ID
     * Only the job poster and admins can cancel a job post
     * The job post status must be OPEN if the user is not an admin
     * The applicants are notified of the cancellation
     *
     * @param accessToken Access token of the user to check if they are an admin or job poster
     * @param jobPostId The ID of the job post to cancel
     * @throws Exception If the user is not an admin or job poster, job post status is not OPEN, or applicants do not exist
     */
    @Transactional
    @Override
    public void cancelJobPost(String accessToken, Long jobPostId) throws Exception {

//      Get the job post from the database
        JobPost jobPost = getJobPostByID(jobPostId);

//      Check if the user is the job poster or an admin
        boolean isAdmin = checkIfUserIsJobPosterOrAdmin(accessToken, jobPost);

//      if the user is not an admin, check if the job post status is OPEN
        if(!isAdmin){
            checkJobPostStatus(jobPost, JobStatus.OPEN);
        }

//        Set the status of all applicants to REJECTED
        Set<Applicant> applicants = jobPost.getApplicants();
        applicants.forEach(applicant -> applicant.setStatus(ApplicantStatus.REJECTED));

//        Save the updated applicants
        applicantRepository.saveAll(applicants);

//        Save the updated job post
        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());


//        Set the status of the job post to CANCELLED
        jobPost.setStatus(JobStatus.CANCELLED);
        jobPostRepository.save(jobPost);

        notificationService.sendNotification(Notification.builder()
                .message("Your job post '" + jobPost.getTitle() + "' have been cancelled.")
                .destinationUserId(jobPost.getJobPosterId())
                .jobPostId(jobPost.getJobPostId())
                .actionUrl("/job-posts/my-job-posts/" + jobPost.getJobPostId())
                .action("VIEW")
                .createdAt(LocalDateTime.now())
                .build(), KafkaTopic.JOB_POST_CANCEL);

        log.info("Job post cancelled successfully");
    }


    @Transactional
    @Override
    public void finishJobPost(String accessToken, Long jobPostId) throws Exception{

        JobPost jobPost = getJobPostByID(jobPostId);

        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        checkIfUserIsJobPoster(userId, jobPost);

        checkJobPostStatus(jobPost, JobStatus.IN_PROGRESS);

        jobPost.setStatus(JobStatus.COMPLETED);

        jobPostRepository.save(jobPost);

        updateJobPostCacheDynamic(jobPost, jobPost.getJobPosterId());

        notificationService.sendNotification(Notification.builder()
                .message("Your job post '" + jobPost.getTitle() + "' have been completed. Thank you for using JobSpotter.")
                .destinationUserId(jobPost.getJobPosterId())
                .jobPostId(jobPost.getJobPostId())
                .actionUrl("/job-posts/my-job-posts/" + jobPost.getJobPostId())
                .action("VIEW")
                .createdAt(LocalDateTime.now())
                .build(), KafkaTopic.JOB_POST_FINISH);

        jobPost.getApplicants().forEach(applicant -> notificationService.sendNotification(Notification.builder()
                .message("The job post '" + jobPost.getTitle() + "' have been completed. Thank you for using JobSpotter.")
                .destinationUserId(applicant.getUserId())
                .jobPostId(jobPost.getJobPostId())
                .actionUrl("/job-posts/" + jobPost.getJobPostId())
                .action("VIEW")
                .createdAt(LocalDateTime.now())
                .build(), KafkaTopic.JOB_POST_FINISH)
        );

        log.info("Job post finished successfully");
    }

    @Override
    public Applicant getApplicantById(String accessToken, Long applicantId) throws Exception {
//        Check if the user is an admin
        checkIfUserIsAdmin(accessToken);

        Applicant applicant = applicantRepository.findById(applicantId)
                .orElseThrow(() -> {
                    log.warn("Applicant not found with id {}", applicantId);
                    return new ResourceNotFoundException("Applicant not found with id " + applicantId);
                });

        return applicant;
    }



//    --------------------------------------STATISTICS------------------------------------------------------------




    @Override
    public List<JobPostByCounty> getJobPostsByCounty() {

        List<Tuple> rawResults = jobPostRepository.getJobPostCountsByCounty();

        return rawResults.stream()
                .map(tuple -> new JobPostByCounty(
                        tuple.get("county", String.class),
                        tuple.get("jobPostCount", Number.class).longValue()
                ))
                .collect(Collectors.toList());
    }

    @Override
    public Integer getTotalJobPostsCount() {
        return jobPostRepository.getTotalJobPostsCount();
    }


    @Override
    public Integer getTotalJobPostsCountByStatus(JobStatus status) {
        return jobPostRepository.getTotalJobPostsCountByStatus(status);
    }

    @Override
    public Integer getTotalApplicantsCount() {
        return jobPostRepository.getTotalApplicantsCount();
    }


//----------------------------------------------------------------------------------------------------------------
//                                              Helper methods
//----------------------------------------------------------------------------------------------------------------

//Cache Methods
//----------------------------------------------------------------------------------------------------------------
private void updateJobPostCacheDynamic(JobPost jobPost, UUID userId) {
    String publicCacheKey = "jobPostCache::" + jobPost.getJobPostId();
    String privateCacheKey = "myJobPostCache::" + userId + ":" + jobPost.getJobPostId();

    // Handle public cache (jobPostCache)
    Object publicCachedObject = redisTemplate.opsForValue().get(publicCacheKey);
    if (publicCachedObject instanceof JobPostDetailedResponse cachedPublic) {
        cachedPublic.setStatus(jobPost.getStatus());
        cachedPublic.setLastUpdatedAt(jobPost.getLastUpdatedAt());
        cachedPublic.setApplicantsCount(jobPost.getApplicants().size());
        cachedPublic.setTitle(jobPost.getTitle());
        cachedPublic.setDescription(jobPost.getDescription());
        cachedPublic.setTags(
                jobPost.getTags().stream()
                        .map(tag -> TagDto.builder()
                                .tagId(tag.getTagId())
                                .name(tag.getName())
                                .build())
                        .collect(Collectors.toSet())
        );

        redisTemplate.opsForValue().set(publicCacheKey, cachedPublic);
        log.info("Updated jobPostCache for jobPostId {}", jobPost.getJobPostId());
    }

    // Handle private cache (myJobPostCache)
    Object privateCachedObject = redisTemplate.opsForValue().get(privateCacheKey);
    if (privateCachedObject instanceof MyJobPostDetailedResponse cachedPrivate) {
        cachedPrivate.setStatus(jobPost.getStatus());
        cachedPrivate.setLastUpdatedAt(jobPost.getLastUpdatedAt());
        cachedPrivate.setMaxApplicants(jobPost.getMaxApplicants());
        cachedPrivate.setApplicants(
                jobPost.getApplicants().stream()
                        .map(applicant -> ApplicantDetailedResponse.builder()
                                .applicantId(applicant.getApplicantId())
                                .userId(applicant.getUserId())
                                .message(applicant.getMessage())
                                .status(applicant.getStatus())
                                .build())
                        .collect(Collectors.toList())
        );
        cachedPrivate.setTitle(jobPost.getTitle());
        cachedPrivate.setDescription(jobPost.getDescription());
        cachedPrivate.setTags(
                jobPost.getTags().stream()
                        .map(tag -> TagDto.builder()
                                .tagId(tag.getTagId())
                                .name(tag.getName())
                                .build())
                        .collect(Collectors.toSet())
        );

        redisTemplate.opsForValue().set(privateCacheKey, cachedPrivate);
        log.info("Updated myJobPostCache for userId {} and jobPostId {}", userId, jobPost.getJobPostId());
    }
}


private void incrementDailyJobPostView(String accessTocken,Long jobPostId, String ipAddress) {
    if (ipAddress == null || ipAddress.isEmpty()) {
        return; // No IP? Don't proceed.
    }

    String viewKey;

    try {
        UUID userId = JWTUtils.getUserIdFromToken(accessTocken); // Try to get the logged-in user ID
        if (userId != null) {
            viewKey = "viewed:user:" + userId + ":job:" + jobPostId;
        } else {
            viewKey = "viewed:ip:" + ipAddress + ":job:" + jobPostId;
        }
    } catch (Exception e) {
        // No user (anonymous), fallback to IP
        viewKey = "viewed:ip:" + ipAddress + ":job:" + jobPostId;
    }

    Boolean hasViewed = redisTemplate.hasKey(viewKey);

    if (Boolean.FALSE.equals(hasViewed)) {
        // First view today
        redisTemplate.opsForValue().set(viewKey, "1", Duration.ofHours(24));
        redisTemplate.opsForZSet().incrementScore(TOP_JOB_POSTS_KEY, jobPostId, 1);
    } else {
        log.info("View already recorded today for key: {}", viewKey);
    }
}

@Scheduled(cron = "0 0 0 * * *")
public void resetTopViews() {
    redisTemplate.delete(TOP_JOB_POSTS_KEY);
}


// Validation Methods
//----------------------------------------------------------------------------------------------------------------
    private void checkIfPageNumberAndSizeAreValid(int pageNumber, int pageSize) {
        if (pageNumber < 0 || pageSize < 1) {
            throw new InvalidRequestException("Invalid page number or page size.");
        }
    }

    private boolean checkIfUserIsJobPosterOrAdmin(String accessToken, JobPost jobPost) throws Exception {
        boolean isJobPoster = jobPost.getJobPosterId().equals(JWTUtils.getUserIdFromToken(accessToken));
        boolean isAdmin = jwtUtils.hasAdminRole(accessToken);

        if (!isJobPoster && !isAdmin) {
            log.warn("Could not process applicants: User is not the job poster or an admin");
            throw new UnauthorizedException("You are not authorized to take actions.");
        }

        return isAdmin;
    }
    private boolean checkIfUserIsApplicantOrAdmin(String accessToken, JobPost jobPost, Long applicantId) throws Exception {
        boolean isApplicant = getApplicantById(jobPost, applicantId).getUserId().equals(jwtUtils.getUserIdFromToken(accessToken));
        boolean isAdmin = jwtUtils.hasAdminRole(accessToken);

        if (!isApplicant && !isAdmin) {
            log.warn("Could not process applicants: User is not an applicant or an admin");
            throw new UnauthorizedException("You are not authorized to take actions .");
        }

        return isAdmin;
    }

    private void checkIfUserIsAdmin(String accessToken) throws Exception {
        if (!jwtUtils.hasAdminRole(accessToken)) {
            log.warn("Could not process applicants: User is not an admin");
            throw new UnauthorizedException("You are not authorized to take actions.");
        }
    }

    private void checkIfUserIsApplicant(UUID userId, JobPost jobPost, Long applicantId) {
        if (!getApplicantById(jobPost, applicantId).getUserId().equals(userId)) {
            log.warn("Could not process applicants: User is not the applicant");
            throw new UnauthorizedException("You are not authorized to take actions.");
        }
    }

    private void checkIfUserIsJobPoster(UUID userId, JobPost jobPost) {
        if (!jobPost.getJobPosterId().equals(userId)) {
            log.warn("Could not process applicants: User is not the job poster");
            throw new UnauthorizedException("You are not authorized to take actions.");
        }
    }



    private static void checkJobPostStatus(JobPost jobPost, JobStatus jobStatus) {
        if (jobPost.getStatus() != jobStatus) {
            log.warn("Could not process action: JobStatus is not {}", jobStatus);
            throw new ForbiddenException("JobStatus does not allow for this action.");
        }
    }
//  Logging Methods
//----------------------------------------------------------------------------------------------------------------
    private static void logAddressClientException(FeignClientException e) {
        log.error("(job-posts): Error getting address from user-service: {}, {}", e.getMessage(), e.status());
    }

    private static void logUserClientException(FeignClientException e) {
        log.error("(job-posts): Error getting users(basic infos) from user-service: {}, {}", e.getMessage(), e.status());
    }

// Converters
//----------------------------------------------------------------------------------------------------------------
    private List<String> covertTagsToListFromString(String tags) {
        return (tags != null && !tags.isEmpty())
                ? Arrays
                .stream(tags.split(","))
                .map(String::trim)
                .map(tagName -> {
                    try {
                        return JobTagEnum.valueOf(tagName.toUpperCase()).getDisplayName();
                    } catch (IllegalArgumentException e) {
                        log.warn("Invalid tag name: {}", tagName);
                        throw new IllegalArgumentException("Invalid tag name: " + tagName);
                    }
                })
                .toList()
                : null;
    }

    private Set<Tag> convertTagsFromDto(Set<JobTagEnum> tags){
        Set<Tag> tagSet = new HashSet<>();
        for (JobTagEnum tagEnum : tags) {
            Tag tag = Tag.builder()
                    .tagId(tagEnum.getId())
                    .name(tagEnum.getDisplayName())
                    .build();
            tagSet.add(tag);
        }
        return tagSet;
    }

//Get Methods
//----------------------------------------------------------------------------------------------------------------
    private JobPost getJobPostByID(Long jobPostId) {
        return jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> {
                    log.warn("Job post not found with id {}", jobPostId);
                    return new ResourceNotFoundException("Job post not found with id " + jobPostId);
                });
    }

    private Applicant getApplicantById(JobPost jobPost, Long applicantId) {
        return jobPost.getApplicants().stream()
                .filter(applicant -> applicant.getApplicantId().equals(applicantId))
                .findFirst()
                .orElseThrow(() -> {
                    log.warn("Applicant not found with id {}", applicantId);
                    return new ResourceNotFoundException("Applicant not found with id " + applicantId);
                });
    }

    private String getErrorMessageFromFeignException(FeignException ex) {
        try {
            // Deserialize the content of the exception body into a Map
            String content = new String(ex.content());

            // Assuming the error response is a JSON object like {"message": "some error message"}
            ObjectMapper objectMapper = new ObjectMapper();
            Map<String, Object> errorResponse = objectMapper.readValue(content, Map.class);

            // Return the message from the error response (assuming it's in the 'message' field)
            return (String) errorResponse.get("message");
        } catch (Exception e) {
            // If there's an error deserializing the response, return a generic message
            return "An unknown error occurred while parsing the error response.";
        }
    }


}

