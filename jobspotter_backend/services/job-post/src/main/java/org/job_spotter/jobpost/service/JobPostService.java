package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.model.JobPost;

import java.util.List;

public interface JobPostService {
    List<JobPost> getAllJobPosts();

    List<JobPost> getJobPostByTag(String tag);

    void createJobPostDomainDummyData();


}
