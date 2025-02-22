package org.jobspotter.review.repository;

import org.jobspotter.review.dto.ReviewResponse;
import org.jobspotter.review.model.Review;
import org.jobspotter.review.model.ReviewedUserRole;
import org.jobspotter.review.model.ReviewerRole;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    boolean existsByReviewerIdAndJobPostIdAndReviewedUserId(UUID userId, Long jobPostId, UUID reviewedUserId);

    Page<Review> findByReviewedUserIdAndReviewerRole(UUID reviewedUserId, ReviewerRole reviewerRole, PageRequest pageRequest);
}
