package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

public interface JobPostService {

    //Job Post View Queries
    JobPostDetailedResponse getJobPostById(Long id);

    MyJobPostDetailedResponse getMyJobPostDetails(UUID userId, Long jobPostId);

    //Job Post Search Queries
    Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize);

    Page<MyJobPostSearchResponse> searchMyJobPosts(UUID userId, String title, String tags, String status, int page, int size);

    Page<JobPostsUserWorkedOnSearchResponse> searchJobsUserWorkedOn(UUID userId, String title, String status, String sortBy, String sortDirection, int page, int size);

    //Job Post Operations
    Long createJobPost(JobPostPostRequest jobPostPostRequest, String accessToken);

    HttpStatus applyToJobPost(UUID userId, Long id, JobPostApplyRequest jobPostApplyRequest);

    JobPost takeApplicantsAction(UUID userId, Long jobPostId, List<ApplicantActionRequest> applicantsActionRequest);

    HttpStatus startJobPost(UUID userId, Long jobPostId);

    HttpStatus cancelJobPost(UUID userId, Long jobPostId);

    HttpStatus finishJobPost(UUID userId, Long id);

}
