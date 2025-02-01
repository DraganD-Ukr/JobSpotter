package org.job_spotter.jobpost.repository;

import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost ,UUID> {
}
