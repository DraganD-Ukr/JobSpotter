package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.model.Applicant;
import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

public interface JobPostService {

    //Job Post View Queries
    JobPostDetailedResponse getJobPostById(Long jobPostId);

    MyJobPostDetailedResponse getMyJobPostDetails(String accessToken, Long jobPostId) throws Exception;


    //Job Post Search Queries
    Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize);

    Page<MyJobPostSearchResponse> searchMyJobPosts(UUID userId, String title, String tags, String status, int page, int size);

    Page<JobPostsUserWorkedOnSearchResponse> searchJobsUserWorkedOn(UUID userId, String title, String status, String sortBy, String sortDirection, int page, int size);

    //Job Post Operations
    Long createJobPost(String accessToken, JobPostPostRequest jobPostPostRequest);

    void updateJobPost(String accessToken, Long jobPostId, JobPostPatchRequest jobPostPatchRequest) throws Exception;

    void deleteJobPost(String accessToken, Long jobPostId) throws Exception;

    HttpStatus applyToJobPost(UUID userId, Long jobPostId, JobPostApplyRequest jobPostApplyRequest);

    JobPost takeApplicantsAction(UUID userId, Long jobPostId, List<ApplicantActionRequest> applicantsActionRequest);

    void updateApplicantMessage(String accessToken, Long jobPostId, Long applicantId, String message) throws Exception;

    void deleteApplicant(String accessToken, Long jobPostId, Long applicantId) throws Exception;

    HttpStatus startJobPost(UUID userId, Long jobPostId) ;

    HttpStatus cancelJobPost(String accessToken, Long jobPostId) throws Exception;

    HttpStatus finishJobPost(UUID userId, Long jobPostId);

    Applicant getApplicantById(String accessToken, Long applicantId) throws Exception;

    List<JobPostByCounty> getJobPostsByCounty();
}
