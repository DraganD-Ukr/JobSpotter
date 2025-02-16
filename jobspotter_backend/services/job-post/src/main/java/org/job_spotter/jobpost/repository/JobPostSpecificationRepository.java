package org.job_spotter.jobpost.repository;

import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostSpecificationRepository extends JpaRepository<JobPost, Long>, JpaSpecificationExecutor<JobPost> {
}
