package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.dto.ApplicantActionRequest;
import org.job_spotter.jobpost.dto.JobPostApplyRequest;
import org.job_spotter.jobpost.dto.JobPostPostRequest;
import org.job_spotter.jobpost.dto.MyJobPostResponse;
import org.job_spotter.jobpost.model.JobPost;
import org.springframework.http.HttpStatus;

import java.util.List;
import java.util.UUID;

public interface JobPostService {
    List<JobPost> getAllJobPosts();

    List<JobPost> getJobPostByTag(String tag);

    void createJobPostDomainDummyData();


    Long createJobPost(JobPostPostRequest jobPostPostRequest, String accessToken);

    HttpStatus applyToJobPost(Long id, UUID userId, JobPostApplyRequest jobPostApplyRequest);

    List<MyJobPostResponse> getMyJobPosts(UUID userId);

    JobPost takeApplicantsAction(Long jobPostId, UUID userId, List<ApplicantActionRequest> applicantsActionRequest);

    HttpStatus startJobPost(UUID userId, Long jobPostId);
}
