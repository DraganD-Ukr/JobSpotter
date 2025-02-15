package org.job_spotter.jobpost.service.Implementation;

import com.fasterxml.jackson.databind.ObjectMapper;
import feign.FeignException;
import feign.FeignException.FeignClientException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.authUtils.JWTUtils;
import org.job_spotter.jobpost.client.UserServiceClient;
import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.exception.*;
import org.job_spotter.jobpost.model.*;
import org.job_spotter.jobpost.repository.ApplicantRepository;
import org.job_spotter.jobpost.repository.JobPostRepository;
import org.job_spotter.jobpost.repository.TagRepository;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class JobPostImpl implements JobPostService {

    private final JobPostRepository jobPostRepository;
    private final TagRepository tagRepository;
    private final UserServiceClient userServiceClient;
    private final ApplicantRepository applicantRepository;


    @Override
    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    @Override
    public List<JobPost> getJobPostByTag(String tag) {
        return jobPostRepository.findAllByTags_Name(tag);
    }


    @Override
    public void createJobPostDomainDummyData() {
        // Define the allowed tags
        List<String> tagNames = List.of("Cleaner", "IT", "Handyman", "Gardening", "Delivery", "Painting");

        // Create and save tags if they don't exist
        Map<String, Tag> tagMap = new HashMap<>();
        for (String tagName : tagNames) {
            Tag existingTag = tagRepository.findByName(tagName);
            if (existingTag == null) {
                Tag newTag = tagRepository.save(new Tag(null, new HashSet<>(), tagName));
                tagMap.put(tagName, newTag);
            } else {
                tagMap.put(tagName, existingTag);
            }
        }

        // List of job locations in Ireland
        List<String> locations = List.of(
                "Dublin", "Cork", "Galway", "Limerick", "Waterford",
                "Kilkenny", "Sligo", "Wexford", "Athlone", "Drogheda"
        );

        // Create job posts with only the allowed tags
        List<JobPost> jobPosts = List.of(
                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Cleaner")))
                        .title("Window Cleaning Needed").description("Clean my house windows").address("Dublin")
                        .longitude(-6.2603).latitude(53.3498).maxApplicants(5).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Cleaner"), tagMap.get("Handyman")))
                        .title("House Cleaning & Repairs").description("Need someone to clean and fix minor issues").address("Cork")
                        .longitude(-8.472).latitude(51.8985).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("IT")))
                        .title("Need Help with Computer Issues").description("Laptop not working properly, need a technician").address("Galway")
                        .longitude(-9.0579).latitude(53.2707).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Handyman"), tagMap.get("Gardening")))
                        .title("Garden Maintenance").description("Lawn mowing and trimming required").address("Limerick")
                        .longitude(-8.6238).latitude(52.668).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Delivery")))
                        .title("Parcel Delivery").description("Need someone to deliver a package").address("Waterford")
                        .longitude(-7.1101).latitude(52.2567).maxApplicants(1).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Painting"), tagMap.get("Handyman")))
                        .title("Paint a Small Room").description("Looking for someone to paint my room").address("Kilkenny")
                        .longitude(-7.254).latitude(52.6541).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Handyman")))
                        .title("Fix a Door Handle").description("Need a handyman to fix a broken door handle").address("Sligo")
                        .longitude(-8.4695).latitude(54.2766).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Gardening")))
                        .title("Trim Overgrown Hedge").description("Garden hedge is overgrown, need trimming").address("Wexford")
                        .longitude(-6.4575).latitude(52.3361).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Cleaner")))
                        .title("Office Cleaning Needed").description("Need someone to clean an office after hours").address("Athlone")
                        .longitude(-7.9407).latitude(53.4239).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Delivery")))
                        .title("Grocery Delivery").description("Pick up groceries and deliver them to my home").address("Drogheda")
                        .longitude(-6.3478).latitude(53.7179).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("IT"), tagMap.get("Handyman")))
                        .title("Set Up Home WiFi").description("Need someone to configure and secure WiFi network").address("Dublin")
                        .longitude(-6.2603).latitude(53.3498).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Painting")))
                        .title("Fence Painting Needed").description("Looking for someone to paint my wooden fence").address("Cork")
                        .longitude(-8.472).latitude(51.8985).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Gardening"), tagMap.get("Cleaner")))
                        .title("Yard Cleanup").description("Clean up leaves and debris from my yard").address("Galway")
                        .longitude(-9.0579).latitude(53.2707).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Delivery"), tagMap.get("Handyman")))
                        .title("Furniture Pickup and Assembly").description("Pick up a table and assemble it at my home").address("Limerick")
                        .longitude(-8.6238).latitude(52.668).maxApplicants(1).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("IT")))
                        .title("Fix Printer Issue").description("My printer is not working, need troubleshooting").address("Waterford")
                        .longitude(-7.1101).latitude(52.2567).maxApplicants(1).status(JobStatus.OPEN).build()
        );

        // Save job posts
        jobPostRepository.saveAll(jobPosts);
    }

    @Override
    public Long createJobPost(JobPostPostRequest jobPostPostRequest, String accessToken) {

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

    @Override
    public HttpStatus applyToJobPost(Long jobPostId, UUID userId, JobPostApplyRequest jobPostApplyRequest) {

        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id " + jobPostId));


        if (jobPost.getStatus() != JobStatus.OPEN) {
            log.warn("Could not apply applicant to JobPost: Job post is not open for applications");
            throw new ForbiddenException("Job post is not open for applications.");
        }

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

        log.info("User applied to job post successfully");

        return HttpStatus.CREATED;
    }

    @Override
    public List<MyJobPostResponse> getMyJobPosts(UUID userId) {
//        TODO: Results may be large, consider adding pagination in the future
        List<JobPost> jobPosts = jobPostRepository.findAllByJobPosterId(userId);

        // Extract applicant IDs from the job posts
        Set<UUID> applicantIds = new HashSet<>();
        for (JobPost jobPost : jobPosts) {
            jobPost.getApplicants().forEach(applicant -> applicantIds.add(applicant.getUserId()));
        }

        try {
            // Fetch basic info for all applicants (map of UUID -> UserBasicInfoResponse)
            ResponseEntity <Map<UUID, UserBasicInfoResponse>> applicantsBasicInfoResponse = userServiceClient.getUsersBasicInfoByIds(new ArrayList<>(applicantIds));

            Map<UUID, UserBasicInfoResponse> applicantsBasicInfo = applicantsBasicInfoResponse.getBody();

            // Now, map the job posts to MyJobPostResponse
            List<MyJobPostResponse> myJobPostResponses = jobPosts.stream()
                    .map(jobPost -> {
                        // Create a list of ApplicantResponse for each job post
                        List<ApplicantResponse> applicantResponses = jobPost.getApplicants().stream()
                                .map(applicant -> {
                                    // Use the map to fetch the applicant's basic info
                                    UserBasicInfoResponse userBasicInfo = applicantsBasicInfo.get(applicant.getUserId());
                                    return ApplicantResponse.builder()
                                            .userId(applicant.getUserId())
                                            .applicantId(applicant.getApplicantId())
                                            .username(userBasicInfo != null ? userBasicInfo.getUsername() : null)
                                            .firstName(userBasicInfo != null ? userBasicInfo.getFirstName() : null)
                                            .lastName(userBasicInfo != null ? userBasicInfo.getLastName() : null)
                                            .status(applicant.getStatus())
                                            .build();
                                })
                                .collect(Collectors.toList());

                        // Create MyJobPostResponse with the applicants' info included
                        return MyJobPostResponse.builder()
                                .jobPostId(jobPost.getJobPostId())
                                .tags(jobPost.getTags())
                                .applicants(applicantResponses)  // This now contains the basic info for each applicant
                                .title(jobPost.getTitle())
                                .description(jobPost.getDescription())
                                .address(jobPost.getAddress())
                                .datePosted(jobPost.getDatePosted())
                                .lastUpdatedAt(jobPost.getLastUpdatedAt())
                                .maxApplicants(jobPost.getMaxApplicants())
                                .status(jobPost.getStatus())
                                .build();
                    })
                    .collect(Collectors.toList());

            return myJobPostResponses;  // Returning the list of job posts with populated applicants' info
        } catch (FeignClientException e) {
            if (e.status() == HttpStatus.INTERNAL_SERVER_ERROR.value()) {
                logUserClientException(e);
                throw new ServerException(getErrorMessageFromFeignException(e));

            }
        }
        return null;
    }

    @Transactional
    @Override
    public JobPost takeApplicantsAction(Long jobPostId, UUID userId, List<ApplicantActionRequest> applicantsActionRequest) {

//        TODO: Refactor for readability and efficiency

        // Find the job post
        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow(() -> new ResourceNotFoundException("Job post not found with id " + jobPostId));

        // Check if job post status is open
        if (jobPost.getStatus() != JobStatus.OPEN) {
            log.warn("Could not process applicants: Job post is not open for applications");
            throw new ForbiddenException("Job post is not open for applications.");
        }

        // Check if the user is the job poster
        if (!jobPost.getJobPosterId().equals(userId)) {
            log.warn("Could not process applicants: User is not the job poster");
            throw new UnauthorizedException("You are not authorized to take actions on this job post.");
        }

        // Count the number of accepted applicants (before processing the action request)
        long acceptedApplicantsCount = jobPost.getApplicants().stream()
                .filter(a -> a.getStatus() == ApplicantStatus.ACCEPTED)
                .count();

        // Process each applicant action in the request list
        for (ApplicantActionRequest applicantActionRequest : applicantsActionRequest) {

            Long applicantId = (long) applicantActionRequest.getApplicantId();  // Get applicant's userId from the request
            ApplicantStatus requestedStatus = applicantActionRequest.getStatus();  // Get the requested status (ACCEPTED, REJECTED)

            // Find the applicant in the job post applicants set
            Applicant applicant = jobPost.getApplicants().stream()
                    .filter(a -> a.getApplicantId().equals(applicantId))
                    .findFirst()
                    .orElseThrow(() -> new ResourceNotFoundException("Applicant not found with id " + applicantId));

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
            } else {
                // If an invalid status is provided
                log.error("Invalid applicant status in the action request: {}", requestedStatus);
                throw new IllegalArgumentException("Invalid applicant status: " + requestedStatus);
            }
        }

        // If the number of accepted applicants reaches the max limit, change the job post status to IN_PROGRESS
        if (acceptedApplicantsCount >= jobPost.getMaxApplicants()) {
            jobPost.setStatus(JobStatus.IN_PROGRESS);
            log.info("Reached desired number of accepted applicants. Job post is now in progress.");
        }

        // Save all updated applicants in one go
        applicantRepository.saveAll(jobPost.getApplicants());

        // Save the updated job post
        jobPostRepository.save(jobPost);

        log.info("All applicant actions processed successfully.");
        return jobPost; // Optionally return the updated job post
    }

    @Transactional
    @Override
    public HttpStatus startJobPost(UUID userId, Long jobPostId) {

        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow( () -> {
                    log.warn("Could not start job post: Job post not found with id {}", jobPostId);
                    return new ResourceNotFoundException("Job post not found with id " + jobPostId);
                });

//        Check if the user is the job poster
        checkIfUserIsJobPoster(userId, jobPost);

//        Check if the job post status is OPEN
        if (jobPost.getStatus() != JobStatus.OPEN) {
            log.warn("Could not start job post: Job post status is not OPEN");
            throw new ForbiddenException("Job post status is not OPEN.");
        }

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

//        TODO: Send notification to all accepted applicants

        log.info("Job post started successfully");
        return HttpStatus.NO_CONTENT;
    }

    @Transactional
    @Override
    public HttpStatus cancelJobPost(UUID userId, Long jobPostId) {

        JobPost jobPost = jobPostRepository.findById(jobPostId)
                .orElseThrow( () -> {
                    log.warn("Could not cancel job post: Job post not found with id {}", jobPostId);
                    return new ResourceNotFoundException("Job post not found with id " + jobPostId);
                });

//        Check if the user is the job poster
        checkIfUserIsJobPoster(userId, jobPost);

//        Check if the job post status is OPEN
        if (jobPost.getStatus() != JobStatus.OPEN) {
            log.warn("Could not cancel job post: Job post status is not OPEN");
            throw new ForbiddenException("Job post status is not OPEN.");
        }

//        Set the status of all applicants to REJECTED
        Set<Applicant> applicants = jobPost.getApplicants();
        applicants.forEach(applicant -> applicant.setStatus(ApplicantStatus.REJECTED));

//        Save the updated applicants
        applicantRepository.saveAll(applicants);

//        Set the status of the job post to CANCELLED
        jobPost.setStatus(JobStatus.CANCELLED);
        jobPostRepository.save(jobPost);

        log.info("Job post cancelled successfully");
        return HttpStatus.NO_CONTENT;
    }

    @Override
    public HttpStatus finishJobPost(UUID userId, Long id) {

        JobPost jobPost = jobPostRepository.findById(id)
                .orElseThrow(() -> {
                    log.warn("Could not finish job post: Job post not found with id {}", id);
                    return new ResourceNotFoundException("Job post not found with id " + id);
                });

        checkIfUserIsJobPoster(userId, jobPost);

        if (jobPost.getStatus() != JobStatus.IN_PROGRESS) {
            log.warn("Could not finish job post: Job post status is not IN_PROGRESS");
            throw new ForbiddenException("Job post status is not IN_PROGRESS.");
        }

        jobPost.setStatus(JobStatus.COMPLETED);

        jobPostRepository.save(jobPost);

//       TODO: Send notifications to all participating applicants

        return HttpStatus.NO_CONTENT;
    }


//    ----------------------------------------- Helper methods -----------------------------------------

    private void checkIfUserIsJobPoster(UUID userId, JobPost jobPost) {
        if (!jobPost.getJobPosterId().equals(userId)) {
            log.warn("Could not process applicants: User is not the job poster");
            throw new UnauthorizedException("You are not authorized to take actions on this job post.");
        }
    }

    private static void logAddressClientException(FeignClientException e) {
        log.error("(job-posts): Error getting address from user-service: {}, {}", e.getMessage(), e.status());
    }

    private static void logUserClientException(FeignClientException e) {
        log.error("(job-posts): Error getting users(basic infos) from user-service: {}, {}", e.getMessage(), e.status());
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

