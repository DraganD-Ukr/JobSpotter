package org.jobspotter.review.repository;

import org.jobspotter.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByReviewerIdAndJobPostIdAndReviewedUserId(UUID userId, Long jobPostId, UUID reviewedUserId);

}
