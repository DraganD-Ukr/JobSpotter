package org.jobspotter.review.repository;

import org.jobspotter.review.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByUserId(UUID reviewedUserId);
}
