package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.model.Applicant;
import org.job_spotter.jobpost.model.JobStatus;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface JobPostService {

    //Job Post View Queries
    JobPostDetailedResponse getJobPostById(Long jobPostId);

    MyJobPostDetailedResponse getMyJobPostDetails(String accessToken, Long jobPostId) throws Exception;


    //Job Post Search Queries
    Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize);

    Page<MyJobPostSearchResponse> searchMyJobPosts(String accessToken, String title, String tags, String status, int page, int size) throws Exception;

    Page<JobPostsUserWorkedOnSearchResponse> searchJobsUserWorkedOn(String accessToken, String title, String status, String sortBy, String sortDirection, int page, int size) throws Exception;

    //Job Post Operations
    Long createJobPost(String accessToken, JobPostPostRequest jobPostPostRequest);

    void updateJobPost(String accessToken, Long jobPostId, JobPostPatchRequest jobPostPatchRequest) throws Exception;

    void deleteJobPost(String accessToken, Long jobPostId) throws Exception;

    void applyToJobPost(UUID userId, Long jobPostId, JobPostApplyRequest jobPostApplyRequest);

    void takeApplicantsAction(UUID userId, Long jobPostId, List<ApplicantActionRequest> applicantsActionRequest);

    void updateApplicantMessage(String accessToken, Long jobPostId, Long applicantId, String message) throws Exception;

    void deleteApplicant(String accessToken, Long jobPostId, Long applicantId) throws Exception;

    void startJobPost(UUID userId, Long jobPostId) ;

    void cancelJobPost(String accessToken, Long jobPostId) throws Exception;

    void finishJobPost(UUID userId, Long jobPostId);

    Applicant getApplicantById(String accessToken, Long applicantId) throws Exception;

    List<JobPostByCounty> getJobPostsByCounty();

    Integer getTotalJobPostsCount();

    Integer getTotalApplicantsCount();

    Integer getTotalJobPostsCountByStatus(JobStatus status);
}
