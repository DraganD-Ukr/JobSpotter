package org.jobspotter.jobpost.service;

import org.jobspotter.jobpost.dto.*;
import org.jobspotter.jobpost.model.Applicant;
import org.jobspotter.jobpost.model.JobStatus;
import org.springframework.data.domain.Page;

import java.util.List;
import java.util.UUID;

public interface JobPostService {

    //Job Post View Queries
    JobPostDetailedResponse getJobPostById(String accessToken, Long jobPostId, String ipAddress) throws Exception;

    MyJobPostDetailedResponse getMyJobPostDetails(String accessToken, Long jobPostId) throws Exception;

    List<JobPostTop10> getTop10JobPosts();

    //Job Post Search Queries
    Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize);

    Page<MyJobPostSearchResponse> searchMyJobPosts(String accessToken, String title, String tags, String status, int page, int size) throws Exception;

    Page<JobPostsUserWorkedOnSearchResponse> searchJobsUserWorkedOn(String accessToken, String title, String status, String sortBy, String sortDirection, int page, int size) throws Exception;

    //Job Post Operations
    Long createJobPost(String accessToken, JobPostPostRequest jobPostPostRequest);

    void updateJobPost(String accessToken, Long jobPostId, JobPostPatchRequest jobPostPatchRequest) throws Exception;

    void deleteJobPost(String accessToken, Long jobPostId) throws Exception;

    void applyToJobPost(String accessToken, Long jobPostId, JobPostApplyRequest request) throws Exception;

    void takeApplicantsAction(UUID userId, Long jobPostId, List<ApplicantActionRequest> applicantsActionRequest);

    void updateApplicantMessage(String accessToken, Long jobPostId, Long applicantId, String message) throws Exception;

    void deleteApplicant(String accessToken, Long jobPostId, Long applicantId) throws Exception;

    void startJobPost(String accessToken, Long jobPostId) throws Exception ;

    void cancelJobPost(String accessToken, Long jobPostId) throws Exception;

    void finishJobPost(String accessToken, Long jobPostId) throws Exception;

    Applicant getApplicantById(String accessToken, Long applicantId) throws Exception;

    List<JobPostByCounty> getJobPostsByCounty();

    Integer getTotalJobPostsCount();

    Integer getTotalApplicantsCount();

    Integer getTotalJobPostsCountByStatus(JobStatus status);
}
