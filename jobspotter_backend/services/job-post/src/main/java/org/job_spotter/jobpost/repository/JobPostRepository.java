package org.job_spotter.jobpost.repository;

import org.job_spotter.jobpost.model.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, Long> {

    @Query("SELECT jp FROM JobPost jp JOIN jp.tags t WHERE t.name = :name")
    List<JobPost> findAllByTags_Name(@Param("name") String name);

    Optional<JobPost> findById(Long id);

}
