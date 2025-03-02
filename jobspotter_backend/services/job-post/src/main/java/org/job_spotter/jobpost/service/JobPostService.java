package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

public interface JobPostService {

    //Job Post View Queries
    MyJobPostDetailedResponse getMyJobPostDetails(UUID userId, Long jobPostId);

    JobPostDetailedResponse getJobPostById(Long id);

    Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize);

    Page<MyJobPostResponse> getMyJobPosts(UUID userId,String title, String tags, String status, int page, int size);

    Page<JobPostsUserWorkedOnResponse> getJobsUserWorkedOn(UUID userId, int page, int size, String sortBy, String sortDirection, String status, String title);


    //Job Post Operations
    Long createJobPost(JobPostPostRequest jobPostPostRequest, String accessToken);

    HttpStatus applyToJobPost(Long id, UUID userId, JobPostApplyRequest jobPostApplyRequest);

    JobPost takeApplicantsAction(Long jobPostId, UUID userId, List<ApplicantActionRequest> applicantsActionRequest);

    HttpStatus startJobPost(UUID userId, Long jobPostId);

    HttpStatus cancelJobPost(UUID userId, Long jobPostId);

    HttpStatus finishJobPost(UUID userId, Long id);



}
