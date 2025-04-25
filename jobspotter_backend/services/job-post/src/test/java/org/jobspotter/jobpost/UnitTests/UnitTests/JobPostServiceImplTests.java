package org.jobspotter.jobpost.UnitTests.UnitTests;

import feign.FeignException;
import feign.Request;
import feign.RequestTemplate;
import org.jobspotter.jobpost.authUtils.JWTUtils;
import org.jobspotter.jobpost.client.UserServiceClient;
import org.jobspotter.jobpost.dto.*;
import org.jobspotter.jobpost.exception.ForbiddenException;
import org.jobspotter.jobpost.exception.InvalidRequestException;
import org.jobspotter.jobpost.exception.ResourceNotFoundException;
import org.jobspotter.jobpost.exception.UnauthorizedException;
import org.jobspotter.jobpost.model.*;
import org.jobspotter.jobpost.repository.ApplicantRepository;
import org.jobspotter.jobpost.repository.JobPostRepository;
import org.jobspotter.jobpost.repository.JobPostSpecificationRepository;
import org.jobspotter.jobpost.service.Implementation.JobPostImpl;
import org.jobspotter.jobpost.service.NotificationService;
import org.jobspotter.jobpost.service.SearchTitleSuggestionService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.data.redis.core.ZSetOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

import static org.mockito.Mockito.*;

import org.mockito.MockedStatic;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;
import static org.mockito.Mockito.mockStatic;

/**
 * Unit tests for  method.
 */
@ExtendWith(MockitoExtension.class)
public class JobPostServiceImplTests {

    @Mock
    private RedisTemplate<String, Object> redisTemplate;

    @Mock
    private JWTUtils jwtUtils;

    @Mock
    private JobPostRepository jobPostRepository;

    @Mock
    private UserServiceClient userServiceClient;

    @Mock
    private ApplicantRepository applicantRepository;

    @Mock
    private JobPostSpecificationRepository jobPostSpecificationRepository;

    @Mock
    private NotificationService notificationService;

    @Mock
    private SearchTitleSuggestionService searchTitleSuggestionService;

    @InjectMocks
    private JobPostImpl jobPostImpl;


    //==================================================================================================================
    //                                     TESTS FOR MAIN JOB POST SERVICE METHODS
    //==================================================================================================================


    //Test Methods for getJobPostById
    //==================================================================================================================


    /**
     * Testing for a successful retrieval of a job post.
     * <p>
     * Given a valid job post exists in the repository,
     * when getJobPostById is called then a detailed response is returned with the correct values.
     * </p>
     */
    @Test
    void getDetailedJobPostById_Success() throws Exception {
        String accessToken = "dummyToken"; // Mocked token
        JobPost expectedJobPost = getDummyJobPost();

        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(expectedJobPost));
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(false);

        ValueOperations<String, Object> valueOperations = mock(ValueOperations.class);
        ZSetOperations<String, Object> zSetOperations = mock(ZSetOperations.class);

        when(redisTemplate.hasKey(anyString())).thenReturn(false); // Simulate key doesn't exist yet
        when(redisTemplate.opsForValue()).thenReturn(valueOperations);
        when(redisTemplate.opsForZSet()).thenReturn(zSetOperations);

        // Mock void method correctly
        doNothing().when(valueOperations).set(anyString(), any(), any(Duration.class));

        // incrementScore returns Double so normal mocking is fine
        when(zSetOperations.incrementScore(anyString(), any(), anyDouble())).thenReturn(1.0);



        JobPostDetailedResponse respondedJobPost = jobPostImpl.getJobPostById(accessToken, 1L , "127.0.0.1"); // example IP

        assertAll("Verify JobPostDetailedResponse",
                () -> assertEquals(expectedJobPost.getJobPostId(), respondedJobPost.getJobPostId()),
                () -> assertEquals(expectedJobPost.getJobPosterId(), respondedJobPost.getJobPosterId()),
                () -> {
                    Set<String> expectedTagNames = expectedJobPost.getTags().stream()
                            .map(Tag::getName)
                            .collect(Collectors.toSet());

                    Set<String> actualTagNames = respondedJobPost.getTags().stream()
                            .map(TagDto::getName)
                            .collect(Collectors.toSet());

                    assertEquals(expectedTagNames, actualTagNames);
                },
                () -> assertEquals(expectedJobPost.getTitle(), respondedJobPost.getTitle()),
                () -> assertEquals(expectedJobPost.getDescription(), respondedJobPost.getDescription()),
                () -> assertEquals(expectedJobPost.getAddress(), respondedJobPost.getAddress()),
                () -> assertEquals(expectedJobPost.getLongitude(), respondedJobPost.getLongitude()),
                () -> assertEquals(expectedJobPost.getLatitude(), respondedJobPost.getLatitude()),
                () -> assertEquals(expectedJobPost.getDatePosted(), respondedJobPost.getDatePosted()),
                () -> assertEquals(expectedJobPost.getLastUpdatedAt(), respondedJobPost.getLastUpdatedAt()),
                () -> assertEquals(expectedJobPost.getApplicants().size(), respondedJobPost.getApplicantsCount()),
                () -> assertEquals(expectedJobPost.getMaxApplicants(), respondedJobPost.getMaxApplicants()),
                () -> assertEquals(expectedJobPost.getStatus(), respondedJobPost.getStatus())
        );

        verify(jobPostRepository).findById(1L);
    }



    /**
     * Testing for a job post not found scenario.
     * <p>
     * Given a job post does not exist in the repository,
     * when getJobPostById is called then a ResourceNotFoundException is thrown.
     * </p>
     */
    @Test
    void getDetailedJobPostById_JobPostNotFound() throws Exception {
        String accessToken = "dummyToken";
        Long nonExistingId = 2L;

        when(jobPostRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> jobPostImpl.getJobPostById(accessToken, nonExistingId, "0"));

        assertTrue(exception.getMessage().contains("Job post not found with id " + nonExistingId));

        verify(jobPostRepository).findById(nonExistingId);
    }



    // Test Methods for getMyJobPostDetails
    //==================================================================================================================

    /**
     * Testing for a successful retrieval of a job post detailed view by the job poster and the admin.
     * <p>
     * Returns the job post details for the job poster.
     * Provided the job post exists and the requester is an authorised job poster and admin.
     * Tests for both scenarios where the requester is the job poster and an admin.
     * </p>
     */
    @ParameterizedTest
    @ValueSource(booleans = {true, false})
    void getMyJobPostDetails_Success(boolean isAdmin) throws Exception {
        String accessToken = "dummyToken";

        JobPost testJobPost = getDummyJobPostWithApplicant();

        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(testJobPost));


        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            // Mock static getUserIdFromToken
            adminJobPosterTestToggle(isAdmin, testJobPost, jwtUtilsMockedStatic, accessToken);

            // Also mock jwtUtils.hasAdminRole here (non-static method)
            when(jwtUtils.hasAdminRole(accessToken)).thenReturn(isAdmin);

            var responseJobPost = jobPostImpl.getMyJobPostDetails(accessToken, 1L);

            assertAll("Verify MyJobPostDetailedResponse",
                    () -> assertEquals(testJobPost.getJobPostId(), responseJobPost.getJobPostId()),
                    () -> assertEquals(testJobPost.getJobPosterId(), responseJobPost.getJobPosterId()),

//                    Convert tags of job post we are testing to TagDto
                    () -> {
                        Set<TagDto> expectedTagNames = testJobPost.getTags().stream()
                                .map(
                                        tag -> TagDto.builder()
                                                .tagId(tag.getTagId())
                                                .name(tag.getName())
                                                .build()
                                )
                                .collect(Collectors.toSet());
                        assertEquals(expectedTagNames, responseJobPost.getTags());
                    },

                    () -> assertEquals(testJobPost.getTitle(), responseJobPost.getTitle()),
                    () -> assertEquals(testJobPost.getDescription(), responseJobPost.getDescription()),
                    () -> assertEquals(testJobPost.getAddress(), responseJobPost.getAddress()),
                    () -> assertEquals(testJobPost.getLongitude(), responseJobPost.getLongitude()),
                    () -> assertEquals(testJobPost.getLatitude(), responseJobPost.getLatitude()),
                    () -> assertEquals(testJobPost.getDatePosted(), responseJobPost.getDatePosted()),
                    () -> assertEquals(testJobPost.getLastUpdatedAt(), responseJobPost.getLastUpdatedAt()),
                    () -> assertEquals(testJobPost.getMaxApplicants(), responseJobPost.getMaxApplicants()),
                    () -> assertEquals(testJobPost.getStatus(), responseJobPost.getStatus()),
                    () -> assertEquals(1, responseJobPost.getApplicants().size())
            );

            verify(jobPostRepository).findById(1L);
        }
    }




    /**
     * Testing for the unauthorized scenario when the requester is neither the job poster nor an admin.
     * <p>
     * Given a valid job post exists in the repository but the requester is not the job poster and does not have admin rights,
     * when getMyJobPostDetails is called then an UnauthorizedException is thrown.
     * </p>
     */
    @Test
    void getMyJobPostDetails_Unauthorized() throws Exception {


        JobPost jobPost = getDummyJobPost();

        try(MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            // Arrange: Create a dummy job post.
            String accessToken = "dummyToken";

            // Use a different UUID for the token, so the user is not the job poster.
            UUID differentUserId = UUID.randomUUID();

            // Stub repository to return our dummy job post.
            when(jobPostRepository.findById(1L)).thenReturn(Optional.of(jobPost));

            // Return a user ID that is different from the job poster
            jwtUtilsMockedStatic.when(()->JWTUtils.getUserIdFromToken(accessToken)).thenReturn(differentUserId);

            // And return false for admin role.
            when(jwtUtils.hasAdminRole(accessToken)).thenReturn(false);

            // Act & Assert: Expect UnauthorizedException to be thrown.
            Exception exception = assertThrows(UnauthorizedException.class,
                    () -> jobPostImpl.getMyJobPostDetails(accessToken, 1L));
            assertTrue(exception.getMessage().contains("You are not authorized"));

            verify(jobPostRepository).findById(1L);
        }

    }


    // Test Methods for searchJobPosts
    //==================================================================================================================

    /**
     * Testing for a successful search of job posts.
     * <p>
     * Given a valid job post exists in the repository,
     * when searchJobPosts is called then a detailed response is returned with the correct values.
     * using different parameters for the search.
     * </p>
     */
    @ParameterizedTest(name = "#{0} - {1}")
    @MethodSource("searchJobPostsTestParameters")
    void searchJobPosts_success(int testnumber, String testName, String title, String tags, Double latitude, Double longitude, Double radius, Integer pageNumber, Integer pageSize) {


        int totalNumberOfJobPosts = 5;
        // Arrange: Create a dummy job post.
        Page<JobPost> page = getDummyJobPostsPage(totalNumberOfJobPosts);
        JobPost jobPost = page.getContent().getFirst();

        // Stub the repository call
        when(jobPostSpecificationRepository.findAll(
                any(Specification.class), any(Pageable.class))
        ).thenReturn(page);

        // Act: Call the search method.
        Page<JobPostSearchResponse> response = jobPostImpl.searchJobPosts(title, tags, latitude, longitude, radius, pageNumber, pageSize);

        // Assert
        assertNotNull(response);
        assertEquals(totalNumberOfJobPosts, response.getTotalElements());

        JobPostSearchResponse result = response.getContent().getFirst();

        assertAll("Verify mapped JobPostSearchResponse",
                () -> assertEquals(jobPost.getJobPostId(), result.getJobPostId()),
                () -> assertEquals(jobPost.getJobPosterId(), result.getJobPosterId()),
                () -> assertEquals(jobPost.getTitle(), result.getTitle()),
                () -> assertEquals(jobPost.getDescription(), result.getDescription()),
                () -> assertEquals(jobPost.getAddress(), result.getAddress()),
                () -> assertEquals(jobPost.getLongitude(), result.getLongitude()),
                () -> assertEquals(jobPost.getLatitude(), result.getLatitude()),
                () -> assertEquals(jobPost.getMaxApplicants(), result.getMaxApplicants()),
                () -> assertEquals(jobPost.getStatus(), result.getStatus()),
                () -> assertEquals(jobPost.getApplicants().size(), result.getApplicantsCount())
        );


        verify(jobPostSpecificationRepository).findAll(any(Specification.class), any(PageRequest.class));



    }




    /**
     * Testing for a Invalid page number or page size scenario.
     *
     * <p>
     *     Given a valid job post exists in the repository,
     *     when searchJobPosts is called with invalid page number or page size then an InvalidRequestException is thrown.
     * </p>
     *
     */
    @Test
    void searchJobPosts_InvalidPageNumberOrSize(){
        // Negative page number should throw exception.
        InvalidRequestException exception1 = assertThrows(InvalidRequestException.class, () ->
                jobPostImpl.searchJobPosts("Test", "Test Tag", 10.0, 20.0, 100.0, -1, 10));
        assertTrue(exception1.getMessage().contains("Invalid page number or page size"));

        // Negative page size should throw exception.
        InvalidRequestException exception2 = assertThrows(InvalidRequestException.class, () ->
                jobPostImpl.searchJobPosts("Test", "Test Tag", 10.0, 20.0, 100.0, 0, -1));
        assertTrue(exception2.getMessage().contains("Invalid page number or page size"));
    }

    /**
     * Testing for if the search results return other than open job posts.
     * <p>
     *     Given a valid job post exists in the repository,
     *     when searchJobPosts is called and the job post is not open then the job post is not returned.
     *     The search should only return open job posts.
     * </p>
     *
     */
    @Test
    void searchJobPosts_NotOpenJobPost(){
        // Arrange: Create a dummy job post.
        JobPost jobPost = getDummyJobPost();
        jobPost.setStatus(JobStatus.CANCELLED);

        // Stub the repository call to return an empty page (simulating filtering of non-OPEN jobs)
        when(jobPostSpecificationRepository.findAll(
                any(Specification.class), any(Pageable.class))
        ).thenReturn(new PageImpl<>(Collections.emptyList()));

        // Act: Call the search method.
        Page<JobPostSearchResponse> response = jobPostImpl.searchJobPosts("Test", "OTHER", 10.0, 20.0, 10.0, 0, 5);

        // Assert
        assertNotNull(response);
        assertEquals(0, response.getTotalElements());

        verify(jobPostSpecificationRepository).findAll(any(Specification.class), any(PageRequest.class));
    }


    //Test Methods for SearchMyJobPosts
    //==================================================================================================================

    /**
     * Testing for a successful search of job posts by the job poster.
     * <p>
     * Given a valid job post exists in the repository,
     * when searchMyJobPosts is called then a detailed response is returned with the correct values.
     * </p>
     */

    @ParameterizedTest(name = "#{0} - {1}")
    @MethodSource("searchMyJobPostsTestParameters")
    void searchMyJobPosts_Success(int testNumber, String testName, String title, String tags, String status, int pageNumber, int pageSize) throws Exception {
        String accessToken = "dummyToken";
        UUID userId = UUID.randomUUID();

        int totalJobPosts = 3;
        Page<JobPost> page = getDummyJobPostsPage(totalJobPosts);
        JobPost jobPost = page.getContent().getFirst();

        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(jobPostSpecificationRepository.findAll(
                    any(Specification.class), any(Pageable.class))
            ).thenReturn(page);

            Page<MyJobPostSearchResponse> response = jobPostImpl.searchMyJobPosts(accessToken, title, tags, status, pageNumber, pageSize);

            assertNotNull(response);
            assertEquals(totalJobPosts, response.getTotalElements());

            MyJobPostSearchResponse result = response.getContent().getFirst();

            assertAll("Verify MyJobPostSearchResponse",
                    () -> assertEquals(jobPost.getJobPostId(), result.getJobPostId()),
                    () -> assertEquals(jobPost.getTags(), result.getTags()),
                    () -> assertEquals(jobPost.getTitle(), result.getTitle()),
                    () -> assertEquals(jobPost.getDescription(), result.getDescription()),
                    () -> assertEquals(jobPost.getAddress(), result.getAddress()),
                    () -> assertEquals(jobPost.getDatePosted(), result.getDatePosted()),
                    () -> assertEquals(jobPost.getLastUpdatedAt(), result.getLastUpdatedAt()),
                    () -> assertEquals(jobPost.getApplicants().size(), result.getApplicantsCount()),
                    () -> assertEquals(jobPost.getMaxApplicants(), result.getMaxApplicants()),
                    () -> assertEquals(jobPost.getStatus(), result.getStatus())
            );
        }
    }

    /**
     * Testing for a Invalid page number or page size scenario.
     *
     * <p>
     *     Given a valid job post exists in the repository,
     *     when searchMyJobPosts is called with invalid page number or page size then an InvalidRequestException is thrown.
     * </p>
     *
     */

    @Test
    void searchMyJobPosts_InvalidPageNumberOrSize() throws Exception {
        String accessToken = "dummyToken";
        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());

            assertThrows(InvalidRequestException.class,
                    () -> jobPostImpl.searchMyJobPosts(accessToken, "Title", "OTHER", "OPEN", -1, 10));

            assertThrows(InvalidRequestException.class,
                    () -> jobPostImpl.searchMyJobPosts(accessToken, "Title", "OTHER", "OPEN", 0, 0));
        }
    }

    // Test Methods for searchJobsUserWorkedOn
    //=================================================================================================================='

    /**
     * Testing for a successful search of job posts by the user.
     * <p>
     * Given a valid job post exists in the repository,
     * when searchJobsUserWorkedOn is called then a detailed response is returned with the correct values.
     * </p>
     */
    @ParameterizedTest(name = "#{0} - {1}")
    @MethodSource("searchJobsUserWorkedOnTestParameters")
    void searchJobsUserWorkedOn_Success(int testNumber, String testName, String title, String status, String sortBy, String sortDirection, int page, int size) throws Exception {
        String accessToken = "dummyToken";
        UUID userId = UUID.randomUUID();

        Page<JobPost> dummyPage = getDummyJobPostsPageWithApplicant(3, userId);  // helper returns JobPosts where user is an applicant
        JobPost jobPost = dummyPage.getContent().getFirst();

        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

            when(jobPostSpecificationRepository.findAll(any(Specification.class), any(Pageable.class)))
                    .thenReturn(dummyPage);

            Page<JobPostsUserWorkedOnSearchResponse> response = jobPostImpl.searchJobsUserWorkedOn(
                    accessToken, title, status, sortBy, sortDirection, page, size);

            assertNotNull(response);
            assertEquals(3, response.getTotalElements());

            JobPostsUserWorkedOnSearchResponse result = response.getContent().getFirst();

            assertAll("Verify JobPostsUserWorkedOnSearchResponse mapping",
                    () -> assertEquals(jobPost.getJobPostId(), result.getJobPostId()),
                    () -> assertEquals(jobPost.getTags(), result.getTags()),
                    () -> assertEquals(jobPost.getTitle(), result.getTitle()),
                    () -> assertEquals(jobPost.getDescription(), result.getDescription()),
                    () -> assertEquals(jobPost.getAddress(), result.getAddress()),
                    () -> assertEquals(jobPost.getDatePosted(), result.getDatePosted()),
                    () -> assertEquals(jobPost.getLastUpdatedAt(), result.getLastUpdatedAt()),
                    () -> assertEquals(jobPost.getApplicants().size(), result.getApplicantsCount()),
                    () -> assertEquals(jobPost.getMaxApplicants(), result.getMaxApplicants()),
                    () -> assertEquals(JobStatus.OPEN, result.getStatus()),
                    () -> assertEquals(ApplicantStatus.PENDING, result.getApplicantStatus()),
                    () -> assertNotNull(result.getDateApplied()),
                    () -> assertNotNull(result.getLastApplicantStatusChange())
            );
        }
    }

    /**
     * Testing for a Invalid page number or page size scenario.
     *
     * <p>
     *     Given a valid job post exists in the repository,
     *     when searchJobsUserWorkedOn is called with invalid page number or page size then an InvalidRequestException is thrown.
     * </p>
     *
     */
    @Test
    void searchJobsUserWorkedOn_InvalidSortBy_ThrowsException() {
        String accessToken = "dummyToken";

        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(UUID.randomUUID());

            InvalidRequestException exception = assertThrows(InvalidRequestException.class, () ->
                    jobPostImpl.searchJobsUserWorkedOn(accessToken, null, null, "invalidSort", "asc", 0, 5));

            assertTrue(exception.getMessage().contains("Invalid sortBy parameter"));
        }
    }

    // Test Methods for createJobPost
    //==================================================================================================================

    /**
     * Testing for a successful creation of a job post.
     * <p>
     * Given a valid job post request,
     * when createJobPost is called then the job post is created successfully and the ID is returned.
     * </p>
     */
    @Test
    void createJobPost_Success() {
        String accessToken = "dummyAccessToken";
        UUID userId = UUID.randomUUID();

        JobPostPostRequest request = getDummyJobPostPostRequest();
        AddressResponse addressResponse = getDummyAddressResponse();

        // Mock token decoding and address fetch
        try (MockedStatic<JWTUtils> jwtUtilsMocked = mockStatic(JWTUtils.class)) {
            jwtUtilsMocked.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(userId);
            when(userServiceClient.getAddressById(accessToken, request.getAddressId()))
                    .thenReturn(ResponseEntity.ok(addressResponse));

            // Mock the save to return the job post with an ID
            ArgumentCaptor<JobPost> jobPostCaptor = ArgumentCaptor.forClass(JobPost.class);
            when(jobPostRepository.save(any(JobPost.class))).thenAnswer(invocation -> {
                JobPost savedPost = invocation.getArgument(0);
                savedPost.setJobPostId(99L);
                return savedPost;
            });

            Long returnedId = jobPostImpl.createJobPost(accessToken, request);

            assertNotNull(returnedId);
            assertEquals(99L, returnedId);


            verify(jobPostRepository).save(jobPostCaptor.capture());
            verify(searchTitleSuggestionService).addTitle(request.getTitle());
            JobPost savedJob = jobPostCaptor.getValue();

            assertAll("Verify saved job post",
                    () -> assertEquals(userId, savedJob.getJobPosterId()),
                    () -> assertEquals("New Job Post", savedJob.getTitle()),
                    () -> assertEquals("Looking for a skilled worker", savedJob.getDescription()),
                    () -> assertEquals("123 Main St", savedJob.getAddress()),
                    () -> assertEquals(JobStatus.OPEN, savedJob.getStatus())
            );
        }
    }

    /**
     * Testing for an invalid request scenario.
     * <p>
     * Given an invalid job post request,
     * when createJobPost is called then an InvalidRequestException is thrown.
     * </p>
     */
    @Test
    void createJobPost_InvalidAddress_ThrowsResourceNotFoundException() {
        String accessToken = "dummyAccessToken";
        JobPostPostRequest request = getDummyJobPostPostRequest();

        // Dummy request and response body for FeignClientException
        Request fakeFeignRequest = Request.create(
                Request.HttpMethod.GET,
                "/addresses/999",
                new HashMap<>(),
                null,
                new RequestTemplate()
        );

        byte[] errorBody = "{\"message\":\"Address Not Found\"}".getBytes();

        FeignException.FeignClientException notFoundException = new FeignException.FeignClientException(
                HttpStatus.NOT_FOUND.value(),
                "Address Not Found",
                fakeFeignRequest,
                errorBody,
                null
        );

        when(userServiceClient.getAddressById(accessToken, request.getAddressId()))
                .thenThrow(notFoundException);

        // Act & Assert
        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> jobPostImpl.createJobPost(accessToken, request));

        verify(searchTitleSuggestionService, never()).addTitle(request.getTitle());
        assertTrue(exception.getMessage().contains("Address Not Found"));
    }

    // Test Methods for updateJobPost
    //==================================================================================================================
    /**
     * Testing for a successful update of a job post.
     * <p>
     * Given a valid job post exists in the repository,
     * when updateJobPost is called then the job post is updated successfully.
     * </p>
     */
    @Test
    void updateJobPost_AsJobPoster_Success() throws Exception {
        // Arrange
        String accessToken = "token";
        UUID jobPosterId = UUID.randomUUID();
        Long jobPostId = 1L;

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(jobPosterId)
                .status(JobStatus.OPEN)
                .build();

        JobPostPatchRequest patchRequest = new JobPostPatchRequest();
        patchRequest.setTitle("Updated Title");
        patchRequest.setDescription("Updated Description");
        patchRequest.setMaxApplicants(10);
        patchRequest.setTags(Set.of(JobTagEnum.OTHER));

        try (MockedStatic<JWTUtils> jwtStatic = mockStatic(JWTUtils.class)) {
            jwtStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(jobPosterId);
            when(jwtUtils.hasAdminRole(accessToken)).thenReturn(false);
            when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

            // Act
            jobPostImpl.updateJobPost(accessToken, jobPostId, patchRequest);

            // Assert
            assertEquals("Updated Title", jobPost.getTitle());
            assertEquals("Updated Description", jobPost.getDescription());
            assertEquals(10, jobPost.getMaxApplicants());
            assertEquals(1, jobPost.getTags().size());

            verify(jobPostRepository).save(jobPost);
        }
    }

    /**
     * Testing for an invalid request scenario.
     * <p>
     * Given a job post is not found in the repository,
     * when updateJobPost is called then a ResourceNotFoundException is thrown.
     * </p>
     */
    @Test
    void updateJobPost_NotOpenStatus_ThrowsForbiddenException() throws Exception {
        String accessToken = "token";
        UUID jobPosterId = UUID.randomUUID();
        Long jobPostId = 1L;

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(jobPosterId)
                .status(JobStatus.COMPLETED)
                .build();

        JobPostPatchRequest patchRequest = new JobPostPatchRequest();

        try (MockedStatic<JWTUtils> jwtStatic = mockStatic(JWTUtils.class)) {
            jwtStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(jobPosterId);
            when(jwtUtils.hasAdminRole(accessToken)).thenReturn(false);
            when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

            // Act & Assert
            assertThrows(ForbiddenException.class,
                    () -> jobPostImpl.updateJobPost(accessToken, jobPostId, patchRequest));
        }
    }

    @Test
    void updateJobPost_AsAdmin_CanUpdateNonOpenStatus() throws Exception {
        Long jobPostId = 1L;
        UUID jobPosterId = UUID.randomUUID();

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(jobPosterId)
                .status(JobStatus.IN_PROGRESS)
                .build();

        JobPostPatchRequest patchRequest = new JobPostPatchRequest();
        patchRequest.setTitle("Updated title");

        String accessToken = "";
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(true); // stub admin

        try (MockedStatic<JWTUtils> jwtStatic = mockStatic(JWTUtils.class)) {
            jwtStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(jobPosterId); //  stub static call

            when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

            // Run
            jobPostImpl.updateJobPost(accessToken, jobPostId, patchRequest);

            // Verify
            assertEquals("Updated title", jobPost.getTitle());
            verify(jobPostRepository).save(jobPost);
        }
    }

    // Test Methods for deleteJobPost
    //==================================================================================================================
    /**
     * Testing for an invalid request scenario.
     * <p>
     * Given a job post is not found in the repository,
     * when updateJobPost is called then a ResourceNotFoundException is thrown.
     * </p>
     */
    @Test
    void deleteJobPost_AsAdmin_DeletesSuccessfully() throws Exception {
        Long jobPostId = 1L;
        String accessToken = "valid-admin-token";
        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .status(JobStatus.OPEN)
                .build();

        // Stub JWT role check
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(true);
        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

        // Act
        jobPostImpl.deleteJobPost(accessToken, jobPostId);

        // Assert
        verify(jobPostRepository).delete(jobPost);
    }

    /**
     * Testing for a successful deletion of a job post by the job poster.
     * <p>
     * Given a valid job post exists in the repository,
     * when deleteJobPost is called then the job post is deleted successfully.
     * </p>
     */
    @Test
    void deleteJobPost_JobPostNotFound_ThrowsNotFound() {
        Long jobPostId = 999L;
        String accessToken = "admin-token";

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> jobPostImpl.deleteJobPost(accessToken, jobPostId));
    }

    // Test Methods for applyJobPost
    //==================================================================================================================
    /**
     * Testing for a successful application to a job post.
     * <p>
     * Given a valid job post exists in the repository,
     * when applyJobPost is called then the application is created successfully.
     * </p>
     */
    @Test
    void applyToJobPost_Success() {
        // Arrange
        JobPost jobPost = getDummyJobPost(); // Status OPEN
        UUID userId = UUID.randomUUID();
        JobPostApplyRequest applyRequest = new JobPostApplyRequest("Excited to apply!");

        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(jobPost));

        // Act
        jobPostImpl.applyToJobPost(userId, 1L, applyRequest);

        // Assert
        assertEquals(1, jobPost.getApplicants().size());

        Applicant savedApplicant = jobPost.getApplicants().iterator().next();
        assertEquals(userId, savedApplicant.getUserId());
        assertEquals("Excited to apply!", savedApplicant.getMessage());
        assertEquals(ApplicantStatus.PENDING, savedApplicant.getStatus());

        verify(applicantRepository).save(any(Applicant.class));
        verify(jobPostRepository).save(jobPost);
        verify(notificationService, times(2)).sendNotification(any(), eq(KafkaTopic.APPLICANT_APPLIED));

    }

    /**
     * Testing for a successful application to a job post when the job post is not open.
     * <p>
     * Given a valid job post exists in the repository but is not open,
     * when applyJobPost is called then a ForbiddenException is thrown.
     * </p>
     */
    @Test
    void applyToJobPost_NotOpenStatus_ShouldThrowForbiddenException() {
        // Arrange
        UUID userId = UUID.randomUUID();
        JobPost jobPost = getDummyJobPost();
        jobPost.setStatus(JobStatus.COMPLETED); // Not OPEN

        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(jobPost));

        // Act & Assert
        ForbiddenException exception = assertThrows(ForbiddenException.class,
                () -> jobPostImpl.applyToJobPost(userId, 1L, new JobPostApplyRequest("Applying to closed job")));

        assertTrue(exception.getMessage().contains("JobStatus does not allow for this action"));

        verify(applicantRepository, never()).save(any());
        verify(jobPostRepository, never()).save(any());
    }

    /**
     * Testing for a successful application to a job post when the user is already an applicant.
     * <p>
     * Given a valid job post exists in the repository and the user is already an applicant,
     * when applyJobPost is called then an InvalidRequestException is thrown.
     * </p>
     */
    @Test
    void applyToJobPost_AlreadyApplied_ShouldThrowForbiddenException() {
        // Arrange
        UUID userId = UUID.randomUUID();
        JobPost jobPost = getDummyJobPost();
        jobPost.getApplicants().add(Applicant.builder()
                .userId(userId)
                .status(ApplicantStatus.PENDING)
                .build());

        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(jobPost));

        // Act & Assert
        ForbiddenException exception = assertThrows(ForbiddenException.class,
                () -> jobPostImpl.applyToJobPost(userId, 1L, new JobPostApplyRequest("Applying again")));

        assertTrue(exception.getMessage().contains("already applied"));

        verify(applicantRepository, never()).save(any());
        verify(jobPostRepository, never()).save(any());
    }

    // Test Methods for takeActionOnApplication
    //==================================================================================================================
    /**
     * Testing for a successful action on an applicant.
     * <p>
     * Given a valid job post and applicant exist in the repository,
     * when takeApplicantsAction is called then the applicant's status is updated successfully.
     * </p>
     */
    @Test
    void takeApplicantsAction_Success() {
        // Arrange
        UUID userId = UUID.randomUUID();
        Long jobPostId = 1L;
        Long applicantId = 100L;

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(userId)
                .status(JobStatus.OPEN)
                .maxApplicants(1)
                .applicants(new HashSet<>())
                .build();

        Applicant applicant = Applicant.builder()
                .applicantId(applicantId)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        jobPost.getApplicants().add(applicant);

        ApplicantActionRequest actionRequest = ApplicantActionRequest.builder()
                .applicantId(applicant.getApplicantId().intValue()) // <-- intValue() here
                .status(ApplicantStatus.ACCEPTED)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

        // Act
        jobPostImpl.takeApplicantsAction(userId, jobPostId, List.of(actionRequest));

        // Assert
        assertEquals(ApplicantStatus.ACCEPTED, applicant.getStatus());
        assertEquals(JobStatus.IN_PROGRESS, jobPost.getStatus());

        verify(applicantRepository).saveAll(any());
        verify(jobPostRepository).save(jobPost);

        verify(notificationService).sendNotification(any(), eq(KafkaTopic.JOB_POST_START));
        verify(notificationService).sendNotification(any(), eq(KafkaTopic.APPLICANT_CONFIRMED));
    }

    /**
     * Testing for a successful action on an applicant when the job post is not open.
     * <p>
     * Given a valid job post and applicant exist in the repository but the job post is not open,
     * when takeApplicantsAction is called then a ForbiddenException is thrown.
     * </p>
     */
    @Test
    void takeApplicantsAction_InvalidApplicant_ThrowsResourceNotFoundException() {
        // Arrange
        UUID userId = UUID.randomUUID();
        Long jobPostId = 1L;

        // Create a dummy JobPost with 1 applicant (ID = 100L)
        Applicant applicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>();
        applicants.add(applicant);

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(userId)
                .maxApplicants(5)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

        // Act
        List<ApplicantActionRequest> actionRequests = List.of(
                new ApplicantActionRequest(999, ApplicantStatus.ACCEPTED) // Invalid applicantId
        );

        // Assert
        assertThrows(ResourceNotFoundException.class, () ->
                jobPostImpl.takeApplicantsAction(userId, jobPostId, actionRequests)
        );

        verify(jobPostRepository).findById(jobPostId);
    }

    /**
     * Testing for a successful action on an applicant when the job post has too many accepted applicants.
     * <p>
     * Given a valid job post and applicant exist in the repository but the job post has too many accepted applicants,
     * when takeApplicantsAction is called then a ForbiddenException is thrown.
     * </p>
     */
    @Test
    void takeApplicantsAction_TooManyAcceptedApplicants_ThrowsForbiddenException() {
        // Arrange
        UUID userId = UUID.randomUUID();
        Long jobPostId = 1L;

        // JobPost with maxApplicants = 1
        Applicant acceptedApplicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.ACCEPTED)
                .build();

        Applicant newApplicant = Applicant.builder()
                .applicantId(101L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>(Set.of(acceptedApplicant, newApplicant));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(userId)
                .maxApplicants(1) // Already filled
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

        // Act
        List<ApplicantActionRequest> actionRequests = List.of(
                new ApplicantActionRequest(101, ApplicantStatus.ACCEPTED) // Trying to accept one more
        );

        // Assert
        assertThrows(ForbiddenException.class, () ->
                jobPostImpl.takeApplicantsAction(userId, jobPostId, actionRequests)
        );

        verify(jobPostRepository).findById(jobPostId);
    }

    /**
     * Testing for a successful action on an applicant when the job post is not open.
     * <p>
     * Given a valid job post and applicant exist in the repository but the job post is not open,
     * when takeApplicantsAction is called then a hrowsInvalidRequestException is thrown.
     * </p>
     */
    @Test
    void takeApplicantsAction_InvalidStatus_ThrowsInvalidRequestException() {
        // Arrange
        UUID userId = UUID.randomUUID();
        Long jobPostId = 1L;

        Applicant applicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>();
        applicants.add(applicant);

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(userId)
                .maxApplicants(5)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));

        // Act
        // Here, we pass a status that your business logic considers invalid.
        List<ApplicantActionRequest> actionRequests = List.of(
                new ApplicantActionRequest(100, null) // null = invalid
        );

        // Assert
        assertThrows(InvalidRequestException.class, () ->
                jobPostImpl.takeApplicantsAction(userId, jobPostId, actionRequests)
        );

        verify(jobPostRepository).findById(jobPostId);
    }
    // Test Methods for UpadateApplicant message
    //==================================================================================================================
    /**
     * Testing for a successful update of an applicant's message.
     * <p>
     * Given a valid job post and applicant exist in the repository,
     * when updateApplicantStatus is called then the applicant's message is updated successfully.
     * </p>
     */
    @Test
    void updateApplicantMessage_Success() throws Exception {
        // Arrange
        String accessToken = "dummyAccessToken";
        Long jobPostId = 1L;
        Long applicantId = 100L;
        String newMessage = "Updated message";

        UUID applicantUserId = UUID.randomUUID();

        Applicant applicant = Applicant.builder()
                .applicantId(applicantId)
                .userId(applicantUserId)
                .status(ApplicantStatus.PENDING)
                .message("Old message")
                .build();

        Set<Applicant> applicants = new HashSet<>(Collections.singletonList(applicant));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(UUID.randomUUID())
                .maxApplicants(5)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(true); // Make user admin to skip user check

        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(applicantUserId);

            // Act
            jobPostImpl.updateApplicantMessage(accessToken, jobPostId, applicantId, newMessage);

            // Assert
            assertEquals(newMessage, applicant.getMessage());

            verify(applicantRepository).save(applicant);
            verify(jobPostRepository).findById(jobPostId);
        }
    }


    //Delete Applicant
    //==================================================================================================================
    /**
     * Testing for a successful deletion of an applicant.
     * <p>
     * Given a valid job post and applicant exist in the repository,
     * when deleteApplicant is called then the applicant is deleted successfully.
     * </p>
     */
    @Test
    void deleteApplicant_Success() throws Exception {
        // Arrange
        String accessToken = "dummyAccessToken";
        Long jobPostId = 1L;
        Long applicantId = 100L;

        Applicant applicant = Applicant.builder()
                .applicantId(applicantId)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>(Set.of(applicant));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(true);

        // Act
        jobPostImpl.deleteApplicant(accessToken, jobPostId, applicantId);

        // Assert
        assertTrue(jobPost.getApplicants().isEmpty(), "Applicant should be removed");
        verify(jobPostRepository).save(jobPost);
        verify(jobPostRepository).findById(jobPostId);
    }

    /**
     * Testing for a successful deletion of an applicant when the job post is not open.
     * <p>
     * Given a valid job post and applicant exist in the repository but the job post is not open,
     * when deleteApplicant is called then a invalidApplicant_ThrowsResourceNotFoundException is thrown.
     * </p>
     */
    //Applicant Not Found
    @Test
    void deleteApplicant_InvalidApplicant_ThrowsResourceNotFoundException() throws Exception {
        // Arrange
        String accessToken = "dummyAccessToken";
        Long jobPostId = 1L;
        Long invalidApplicantId = 999L;

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .status(JobStatus.OPEN)
                .applicants(new HashSet<>()) // No applicants
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(true);

        // Act & Assert
        assertThrows(ResourceNotFoundException.class, () ->
                jobPostImpl.deleteApplicant(accessToken, jobPostId, invalidApplicantId));

        verify(jobPostRepository).findById(jobPostId);
    }

    /**
     * Testing for a successful deletion of an applicant when the job post is not open.
     * <p>
     * Given a valid job post and applicant exist in the repository but the job post is not open,
     * when deleteApplicant is called then a ForbiddenException is thrown.
     * </p>
     */
    @Test
    void deleteApplicant_JobNotOpen_ThrowsForbiddenException() throws Exception {
        // Arrange
        String accessToken = "dummyAccessToken";
        Long jobPostId = 1L;
        Long applicantId = 100L;

        Applicant applicant = Applicant.builder()
                .applicantId(applicantId)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>(Set.of(applicant));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .status(JobStatus.COMPLETED) // NOT OPEN
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(true);

        // Act & Assert
        assertThrows(ForbiddenException.class, () ->
                jobPostImpl.deleteApplicant(accessToken, jobPostId, applicantId));

        verify(jobPostRepository).findById(jobPostId);
    }

    // Test Methods for startJobPost
    //==================================================================================================================
    /**
     * Testing for a successful start of a job post.
     * <p>
     * Given a valid job post exists in the repository,
     * when startJobPost is called then the job post is started successfully.
     * </p>
     */
    @Test
    void startJobPost_Success() throws Exception {
        // Arrange
        String accessToken = "mocked-access-token";
        UUID userId = UUID.randomUUID();
        Long jobPostId = 1L;

        Applicant acceptedApplicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.ACCEPTED)
                .build();

        Applicant pendingApplicant = Applicant.builder()
                .applicantId(101L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>(Set.of(acceptedApplicant, pendingApplicant));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(userId)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        when(jwtUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

        // Act
        jobPostImpl.startJobPost(accessToken, jobPostId);

        // Assert
        assertEquals(JobStatus.IN_PROGRESS, jobPost.getStatus(), "Job post should be IN_PROGRESS");

        assertTrue(jobPost.getApplicants().stream()
                        .noneMatch(applicant -> applicant.getStatus() == ApplicantStatus.PENDING),
                "All PENDING applicants must be REJECTED");

        verify(applicantRepository).saveAll(applicants);
        verify(jobPostRepository).save(jobPost);
    }


    //no accepted applicants
    /**
     * Testing for a successful start of a job post when there are no accepted applicants.
     * <p>
     * Given a valid job post exists in the repository but has no accepted applicants,
     * when startJobPost is called then an InvalidRequestException is thrown.
     * </p>
     */
    @Test
    void startJobPost_NoAcceptedApplicants_ThrowsInvalidRequestException() throws Exception {
        // Arrange
        String accessToken = "mocked-access-token";
        UUID userId = UUID.randomUUID();
        Long jobPostId = 1L;

        Applicant pendingApplicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .status(ApplicantStatus.PENDING)
                .build();

        Set<Applicant> applicants = new HashSet<>(Set.of(pendingApplicant));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(userId)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        when(jwtUtils.getUserIdFromToken(accessToken)).thenReturn(userId);

        // Act & Assert
        InvalidRequestException exception = assertThrows(InvalidRequestException.class,
                () -> jobPostImpl.startJobPost(accessToken, jobPostId));

        assertTrue(exception.getMessage().contains("At least 1 applicant must be accepted"));

        verify(jobPostRepository).findById(jobPostId);
    }

//Canncel Job Post
    //===================================================================================================================
    /**
     * Testing for a successful cancellation of a job post.
     * <p>
     * Given a valid job post exists in the repository,
     * when cancelJobPost is called then the job post is cancelled successfully.
     * </p>
     */
    @Test
    void cancelJobPost_Success_AsPosterOrAdmin() throws Exception {
        // Arrange
        String accessToken = "dummyToken";
        UUID jobPosterId = UUID.randomUUID();
        Long jobPostId = 1L;

        Set<Applicant> applicants = new HashSet<>(Arrays.asList(
                Applicant.builder().applicantId(100L).status(ApplicantStatus.PENDING).build(),
                Applicant.builder().applicantId(101L).status(ApplicantStatus.ACCEPTED).build()
        ));

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(jobPosterId)
                .status(JobStatus.OPEN)
                .applicants(applicants)
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = Mockito.mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(jobPosterId);
            when(jwtUtils.hasAdminRole(accessToken)).thenReturn(false);

            // Act
            jobPostImpl.cancelJobPost(accessToken, jobPostId);

            // Assert
            assertEquals(JobStatus.CANCELLED, jobPost.getStatus(), "JobPost status should be CANCELLED");
            assertTrue(jobPost.getApplicants().stream().allMatch(a -> a.getStatus() == ApplicantStatus.REJECTED),
                    "All applicants should be REJECTED");

            verify(applicantRepository).saveAll(applicants);
            verify(jobPostRepository).save(jobPost);
        }
    }

    // Test for forbidden exception when job post is in progress or completed
    /**
     * Testing for a successful cancellation of a job post when the job post is complete or in progress.
     * <p>
     * Given a valid job post exists in the repository but is not open,
     * when cancelJobPost is called then a ForbiddenException is thrown.
     * </p>
     */
    @Test
    void cancelJobPost_JobNotOpen_ThrowsForbiddenException() throws Exception {
        // Arrange
        String accessToken = "dummyToken";
        UUID jobPosterId = UUID.randomUUID();
        Long jobPostId = 1L;

        JobPost jobPost = JobPost.builder()
                .jobPostId(jobPostId)
                .jobPosterId(jobPosterId)
                .status(JobStatus.IN_PROGRESS) // Not OPEN
                .applicants(new HashSet<>())
                .build();

        when(jobPostRepository.findById(jobPostId)).thenReturn(Optional.of(jobPost));
        try (MockedStatic<JWTUtils> jwtUtilsMockedStatic = Mockito.mockStatic(JWTUtils.class)) {
            jwtUtilsMockedStatic.when(() -> JWTUtils.getUserIdFromToken(accessToken)).thenReturn(jobPosterId);
            when(jwtUtils.hasAdminRole(accessToken)).thenReturn(false);

            // Act & Assert
            ForbiddenException exception = assertThrows(ForbiddenException.class,
                    () -> jobPostImpl.cancelJobPost(accessToken, jobPostId));
            assertTrue(exception.getMessage().contains("JobStatus does not allow"));
        }

        verify(jobPostRepository).findById(jobPostId);
    }

    //
    //
    //==================================================================================================================
    //                                               Helper Methods
    //==================================================================================================================

    //Parameterized Streams for multi optioned tests
    //==================================================================================================================

    /**
     * Provides test parameters for the searchJobPosts_success test.
     *
     * @return a stream of arguments for the test.
     */
    static Stream<Arguments> searchJobPostsTestParameters() {
        return Stream.of(
                Arguments.of(1,"All Parameters", "Test", "OTHER", 10.0, 20.0, 10.0, 0, 5),
                Arguments.of(2,"Empty Title", "", "OTHER", null, null, null, 0, 5),
                Arguments.of(3,"Empty Tag", "Test", "", 10.0, 20.0, 10.0, 0, 5),
                Arguments.of(4,"Empty Title and Tag", "", "", 10.0, 20.0, 10.0, 0, 5),
                Arguments.of(5,"Only Location", null, null, 10.0, 20.0, 10.0, 0, 5),
                Arguments.of(6,"No Location", "Test", "", null, null, null, 0, 5),
                Arguments.of(7,"Some Location Parameters 1", "Test", "OTHER", 10.0, 20.0, null, 0, 5),
                Arguments.of(8,"Some Location Parameters 2", "Test", "OTHER", 10.0, null, 10.0, 0, 5),
                Arguments.of(10,"Some Location Parameters 3", "Test", "OTHER", null, 20.0, 10.0, 0, 5),
                Arguments.of(11,"No search Parameters ", null, null, null, null, null, 0, 5)
        );
    }

    /**
     * Provides test parameters for the searchMyJobPosts_success test.
     *
     * @return a stream of arguments for the test.
     */

    static Stream<Arguments> searchMyJobPostsTestParameters() {
        return Stream.of(
                Arguments.of(1, "All Parameters", "Test", "OTHER", "OPEN", 0, 5),
                Arguments.of(2, "Empty Title", "", "OTHER", "OPEN", 0, 5),
                Arguments.of(3, "Empty Tag", "Test", "", "OPEN", 0, 5),
                Arguments.of(4, "Empty Status", "Test", "OTHER", "", 0, 5),
                Arguments.of(5, "All Empty Filters", "", "", "", 0, 5),
                Arguments.of(6, "Null Filters", null, null, null, 0, 5)
        );
    }

    /**
     * Provides test parameters for the searchJobsUserWorkedOn_success test.
     *
     * @return a stream of arguments for the test.
     */
    static Stream<Arguments> searchJobsUserWorkedOnTestParameters() {
        return Stream.of(
                Arguments.of(1, "All filters", "Test", "OPEN", "title", "asc", 0, 5),
                Arguments.of(2, "No filters", null, null, "datePosted", "desc", 0, 5),
                Arguments.of(3, "Only sort", null, null, "status", "asc", 0, 5),
                Arguments.of(4, "Only title", "Example", null, "datePosted", "asc", 0, 5)
        );
    }


    //Toggler Method for Admin and Job Poster Test
    //==================================================================================================================
    /**
     * Helper method to toggle the user as an admin or job poster.
     *
     * @param isAdmin whether the user is an admin or not.
     * @param testJobPost the job post to be used for the test.
     * @param jwtUtilsMockedStatic the mocked static object for JWTUtils.
     * @param accessToken the access token to be used for the test.
     * @throws Exception if an error occurs.
     */
    private void adminJobPosterTestToggle(boolean isAdmin, JobPost testJobPost, MockedStatic<JWTUtils> jwtUtilsMockedStatic, String accessToken) throws Exception {
        UUID loggedInUserId = testJobPost.getJobPosterId();

        // If the user is an admin, then the user ID is different from the job poster.
        if(isAdmin){
            loggedInUserId = UUID.randomUUID();
        }

        // Stub JWTUtils so that the token returns the same user ID as the job poster.
        jwtUtilsMockedStatic.when(()->JWTUtils.getUserIdFromToken(accessToken)).thenReturn(loggedInUserId);

        // Return false for admin role so that the check passes because the user is the job poster.
        when(jwtUtils.hasAdminRole(accessToken)).thenReturn(isAdmin);
    }

    /**
     * Creates a dummy job post for testing purposes
     *
     * @return a dummy job post
     */
    private JobPost getDummyJobPost() {
        UUID jobPosterId = UUID.randomUUID();
        Set<Tag> tags = Set.of(Tag.builder().tagId(1L).name("OTHER").build());
        LocalDateTime now = LocalDateTime.now();

        return JobPost.builder()
                .jobPostId(1L)
                .jobPosterId(jobPosterId)
                .tags(tags)
                .title("Test Job")
                .description("Test Description")
                .address("Test Address")
                .longitude(10.0)
                .latitude(20.0)
                .datePosted(now)
                .lastUpdatedAt(now)
                .maxApplicants(5)
                .status(JobStatus.OPEN)
                .applicants(new HashSet<>())
                .build();
    }

    /**
     * Creates a dummy job post with an applicant for testing purposes
     *
     * @return a dummy job post with an applicant
     */
    private JobPost getDummyJobPostWithApplicant() {

        Applicant applicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .message("Interested in the job")
                .status(ApplicantStatus.PENDING)
                .build();
        Set<Applicant> applicants = new HashSet<>();
        applicants.add(applicant);

        JobPost jobPost = getDummyJobPost();
        jobPost.setApplicants(applicants);

        return jobPost;
    }

    /**
     * Creates a page of job posts for testing purposes
     * The Number of job posts assigned to a page can be changed
     *
     * @return a dummy job post with an applicant
     */
    private Page<JobPost> getDummyJobPostsPage(int numberOfJobPosts) {

        List<JobPost> jobPosts = new ArrayList<>();

        for (int i = 0; i < numberOfJobPosts; i++) {
            JobPost jobPost = getDummyJobPost();
            jobPost.setJobPostId((long) i);
            jobPosts.add(jobPost);
        }

        return new PageImpl<>(jobPosts);

    }

    /**
     * Creates a page of job posts with an applicant for testing purposes
     * The Number of job posts assigned to a page can be changed
     *
     * @return a dummy job post with an applicant
     */
    private Page<JobPost> getDummyJobPostsPageWithApplicant(int numberOfJobPosts, UUID userId) {
        List<JobPost> posts = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        for (int i = 0; i < numberOfJobPosts; i++) {
            Applicant applicant = Applicant.builder()
                    .applicantId((long) (100 + i))
                    .userId(userId)
                    .status(ApplicantStatus.PENDING)
                    .dateApplied(now.minusDays(i))
                    .dateUpdated(now.minusHours(i))
                    .build();

            JobPost jobPost = getDummyJobPost();
            jobPost.setJobPostId((long) i);
            jobPost.setApplicants(Set.of(applicant));
            posts.add(jobPost);
        }

        return new PageImpl<>(posts);
    }

    /**
     * Creates a dummy address response for testing purposes
     *
     * @return a dummy address response
     */
    private AddressResponse getDummyAddressResponse() {
        return AddressResponse.builder()
                .address("123 Main St")
                .longitude(10.0)
                .latitude(20.0)
                .build();
    }

    /**
     * Creates a dummy job post request for testing purposes
     *
     * @return a dummy job post request
     */

    private JobPostPostRequest getDummyJobPostPostRequest() {
        return JobPostPostRequest.builder()
                .title("New Job Post")
                .description("Looking for a skilled worker")
                .tags(Set.of(JobTagEnum.OTHER)) // assuming JobTagEnum exists
                .addressId(123L)
                .maxApplicants(3)
                .build();
    }

}

