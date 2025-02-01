package org.job_spotter.jobpost.service.Implementation;

import lombok.RequiredArgsConstructor;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.model.JobStatus;
import org.job_spotter.jobpost.service.JobPostService;

import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;

import org.job_spotter.jobpost.repository.JobPostRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class JobPostImpl implements JobPostService {

    private final JobPostRepository jobPostRepository;

    @Override
    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    @Override
    public void createJobPost() {
        List<JobPost> jobPosts = List.of(
                JobPost.builder()
                        .jobPosterId(UUID.randomUUID())
                        .tags(new HashSet<>())
                        .applicants(new HashSet<>())
                        .title("Software Engineer")
                        .description("Develop and maintain web applications")
                        .address("123 Tech Street, San Francisco, CA")
                        .longitude(-122.4194)
                        .latitude(37.7749)
                        .maxApplicants(10)
                        .status(JobStatus.OPEN)
                        .build(),
                JobPost.builder()
                        .jobPosterId(UUID.randomUUID())
                        .tags(new HashSet<>())
                        .applicants(new HashSet<>())
                        .title("Data Scientist")
                        .description("Analyze large datasets and build predictive models")
                        .address("456 Data Avenue, New York, NY")
                        .longitude(-74.0060)
                        .latitude(40.7128)
                        .maxApplicants(8)
                        .status(JobStatus.OPEN)
                        .build(),
                JobPost.builder()
                        .jobPosterId(UUID.randomUUID())
                        .tags(new HashSet<>())
                        .applicants(new HashSet<>())
                        .title("Product Manager")
                        .description("Oversee product development and roadmap")
                        .address("789 Market Street, Los Angeles, CA")
                        .longitude(-118.2437)
                        .latitude(34.0522)
                        .maxApplicants(5)
                        .status(JobStatus.OPEN)
                        .build()
        );
        jobPostRepository.saveAll(jobPosts);
    }
}
