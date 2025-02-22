package org.jobspotter.review.service;

import org.jobspotter.review.dto.RatingsResponse;
import org.jobspotter.review.dto.ReviewPostRequest;
import org.jobspotter.review.dto.ReviewResponse;
import org.jobspotter.review.model.ReviewedUserRole;
import org.jobspotter.review.model.ReviewerRole;
import org.springframework.data.domain.Page;

import java.util.UUID;

public interface ReviewService {

    Long createReview(UUID userId, ReviewPostRequest reviewRequest);

    RatingsResponse getRatingsByUserId(UUID userId);

    Page<ReviewResponse> getReviewsByUserId(UUID userId, ReviewerRole reviewerRole, int page, int size);
}
