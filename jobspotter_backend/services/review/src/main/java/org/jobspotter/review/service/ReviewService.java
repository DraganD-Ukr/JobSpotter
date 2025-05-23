package org.jobspotter.review.service;

import org.jobspotter.review.dto.RatingsResponse;
import org.jobspotter.review.dto.ReviewEditRequest;
import org.jobspotter.review.dto.ReviewPostRequest;
import org.jobspotter.review.dto.ReviewResponse;
import org.jobspotter.review.model.ReviewerRole;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ReviewService {

    Long createReview(UUID userId, ReviewPostRequest reviewRequest);

    RatingsResponse getRatingsByUserId(UUID userId);

    Page<ReviewResponse> getReviewsByUserId(UUID reviewedUserId, ReviewerRole reviewerRole, Double minRating, Double maxRating, String dateCreatedMin, String dateCreatedMax, String searchQuery, int pageNum, int pageSize);

    Long updateReview(UUID userId, ReviewEditRequest reviewRequest, Long reviewId);

    void deleteReview(UUID userId, Long reviewId);

    Page<ReviewResponse> getReviewsByJobPostId(Long jobPostId, int pageNum, int pageSize);
}
