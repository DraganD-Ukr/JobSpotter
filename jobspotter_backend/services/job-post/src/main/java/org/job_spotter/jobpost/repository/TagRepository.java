package org.job_spotter.jobpost.repository;
import org.job_spotter.jobpost.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}
