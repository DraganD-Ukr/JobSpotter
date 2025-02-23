package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.dto.*;
import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

public interface JobPostService {

    //Job Post Search Functions
    List<JobPost> getAllJobPosts();

    JobPostDetailedResponse getMyJobPostDetails(Long jobPostId);

    Page<JobPostSearchResponse> searchJobPosts(String title, String tags, Double latitude, Double longitude, Double radius, int pageNumber, int pageSize);

    Page<JobPostsUserWorkedOnResponse> getJobsUserWorkedOn(UUID userId, int page, int size, String sortBy, String sortDirection, String status, String title);

    List<MyJobPostResponse> getMyJobPosts(UUID userId);

    //Job Post Functions
    Long createJobPost(JobPostPostRequest jobPostPostRequest, String accessToken);

    HttpStatus applyToJobPost(Long id, UUID userId, JobPostApplyRequest jobPostApplyRequest);


    JobPost takeApplicantsAction(Long jobPostId, UUID userId, List<ApplicantActionRequest> applicantsActionRequest);

    HttpStatus startJobPost(UUID userId, Long jobPostId);

    HttpStatus cancelJobPost(UUID userId, Long jobPostId);

    HttpStatus finishJobPost(UUID userId, Long id);


    //Deprecated
    //    List<JobPost> getJobPostByTag(String tag);

    //    void createJobPostDomainDummyData();
}
