package org.jobspotter.review.repository;

import org.jobspotter.review.dto.ReviewResponse;
import org.jobspotter.review.model.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByReviewerIdAndJobPostIdAndReviewedUserId(UUID userId, Long jobPostId, UUID reviewedUserId);

    Page<ReviewResponse> findAllByJobPostId(Long jobPostId, PageRequest pageRequest);

}
