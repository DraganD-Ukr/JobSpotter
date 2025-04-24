package org.jobspotter.jobpost.repository;
import org.jobspotter.jobpost.model.Tag;
import org.springframework.data.jpa.repository.JpaRepository;


public interface TagRepository extends JpaRepository<Tag, Long> {
    Tag findByName(String name);
}
