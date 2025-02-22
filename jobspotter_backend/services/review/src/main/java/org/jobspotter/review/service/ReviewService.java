package org.jobspotter.review.service;

import org.jobspotter.review.dto.RatingsResponse;
import org.jobspotter.review.dto.ReviewPostRequest;

import java.util.UUID;

public interface ReviewService {

    Long createReview(UUID userId, ReviewPostRequest reviewRequest);

    RatingsResponse getRatingsByUserId(UUID userId);
}
