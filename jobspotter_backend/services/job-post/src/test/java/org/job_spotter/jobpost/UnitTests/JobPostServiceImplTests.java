package org.job_spotter.jobpost.UnitTests;

import org.job_spotter.jobpost.authUtils.JWTUtils;
import org.job_spotter.jobpost.client.UserServiceClient;
import org.job_spotter.jobpost.dto.JobPostDetailedResponse;
import org.job_spotter.jobpost.dto.JobPostSearchResponse;
import org.job_spotter.jobpost.exception.InvalidRequestException;
import org.job_spotter.jobpost.exception.ResourceNotFoundException;
import org.job_spotter.jobpost.exception.UnauthorizedException;
import org.job_spotter.jobpost.model.*;
import org.job_spotter.jobpost.repository.ApplicantRepository;
import org.job_spotter.jobpost.repository.JobPostRepository;
import org.job_spotter.jobpost.repository.JobPostSpecificationRepository;
import org.job_spotter.jobpost.service.Implementation.JobPostImpl;
import org.job_spotter.jobpost.service.NotificationService;
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

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Stream;


import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

/**
 * Unit tests for {@link JobPostImpl#getJobPostById(Long)} method.
 */
@ExtendWith(MockitoExtension.class)
public class JobPostServiceImplTests {

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
    void getDetailedJobPostById_Success() {

        JobPost expectedJobPost = getDummyJobPost();

        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(expectedJobPost));

        JobPostDetailedResponse respondedJobPost = jobPostImpl.getJobPostById(1L);


        assertAll("Verify JobPostDetailedResponse",
                () -> assertEquals(expectedJobPost.getJobPostId(), respondedJobPost.getJobPostId()),
                () -> assertEquals(expectedJobPost.getJobPosterId(), respondedJobPost.getJobPosterId()),
                () -> assertEquals(expectedJobPost.getTags(), respondedJobPost.getTags()),
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
    void getDetailedJobPostById_JobPostNotFound() {
        Long nonExistingId = 2L;
        when(jobPostRepository.findById(nonExistingId)).thenReturn(Optional.empty());

        ResourceNotFoundException exception = assertThrows(ResourceNotFoundException.class,
                () -> jobPostImpl.getJobPostById(nonExistingId));
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
        // Arrange: Create a dummy job post.
        String accessToken = "dummyToken";

        JobPost testJobPost = getDummyJobPostWithApplicant();

        // Stub repository to return our dummy job post.
        when(jobPostRepository.findById(1L)).thenReturn(Optional.of(testJobPost));

        try(MockedStatic<JWTUtils> jwtUtilsMockedStatic = Mockito.mockStatic(JWTUtils.class)){

            adminJobPosterTestToggle(isAdmin, testJobPost, jwtUtilsMockedStatic, accessToken);

            // Act: Call the method.
            var responseJobPost = jobPostImpl.getMyJobPostDetails(accessToken, 1L);

            // Assert: Group assertions to verify the responseJobPost.
            assertAll("Verify MyJobPostDetailedResponse",
                    () -> assertEquals(testJobPost.getJobPostId(), responseJobPost.getJobPostId()),
                    () -> assertEquals(testJobPost.getJobPosterId(), responseJobPost.getJobPosterId()),
                    () -> assertEquals(testJobPost.getTags(), responseJobPost.getTags()),
                    () -> assertEquals(testJobPost.getTitle(), responseJobPost.getTitle()),
                    () -> assertEquals(testJobPost.getDescription(), responseJobPost.getDescription()),
                    () -> assertEquals(testJobPost.getAddress(), responseJobPost.getAddress()),
                    () -> assertEquals(testJobPost.getLongitude(), responseJobPost.getLongitude()),
                    () -> assertEquals(testJobPost.getLatitude(), responseJobPost.getLatitude()),
                    () -> assertEquals(testJobPost.getDatePosted(), responseJobPost.getDatePosted()),
                    () -> assertEquals(testJobPost.getLastUpdatedAt(), responseJobPost.getLastUpdatedAt()),
                    () -> assertEquals(testJobPost.getMaxApplicants(), responseJobPost.getMaxApplicants()),
                    () -> assertEquals(testJobPost.getStatus(), responseJobPost.getStatus()),
                    // Verify that the applicant is mapped correctly.
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

        try(MockedStatic<JWTUtils> jwtUtilsMockedStatic = Mockito.mockStatic(JWTUtils.class)) {
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
    void searchJobPosts_success(int testnumber, String testName, String title, String tags, Double latitude, Double longitude, Double radius, Integer pageNumber, Integer pageSize, boolean expectException) {


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
                () -> assertEquals(jobPost.getStatus(), result.getStatus())
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

        // Stub the repository call
        when(jobPostSpecificationRepository.findAll(
                any(Specification.class), any(Pageable.class))
        ).thenReturn(new PageImpl<>(List.of(jobPost)));

        // Act: Call the search method.
        Page<JobPostSearchResponse> response = jobPostImpl.searchJobPosts("Test", "OTHER", 10.0, 20.0, 10.0, 0, 5);

        System.out.println(response.getContent().get(0));
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

}
