package org.job_spotter.jobpost.UnitTests;

import org.job_spotter.jobpost.authUtils.JWTUtils;
import org.job_spotter.jobpost.client.UserServiceClient;
import org.job_spotter.jobpost.dto.JobPostDetailedResponse;
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
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.*;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
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





    //==================================================================================================================
    //                                               Dummy Data
    //==================================================================================================================

    /**
     * Creates a dummy job post for testing purposes
     *
     * @return a dummy job post
     */
    private JobPost getDummyJobPost() {
        UUID jobPosterId = UUID.randomUUID();
        Set<Tag> tags = Set.of(Tag.builder().tagId(1L).name("Test Tag").build());
        LocalDateTime now = LocalDateTime.now();

        Applicant applicant = Applicant.builder()
                .applicantId(100L)
                .userId(UUID.randomUUID())
                .message("Interested in the job")
                .status(ApplicantStatus.PENDING)
                .build();
        Set<Applicant> applicants = new HashSet<>();
        applicants.add(applicant);

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
                .applicants(applicants)
                .build();
    }

}
