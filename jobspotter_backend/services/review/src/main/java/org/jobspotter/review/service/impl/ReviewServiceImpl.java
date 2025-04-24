package org.jobspotter.review.service.impl;


import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.jobspotter.review.client.JobPostServiceClient;
import org.jobspotter.review.dto.*;
import org.jobspotter.review.exception.*;
import org.jobspotter.review.model.Rating;
import org.jobspotter.review.model.Review;
import org.jobspotter.review.model.ReviewerRole;
import org.jobspotter.review.model.specification.ReviewSpecification;
import org.jobspotter.review.repository.RatingRepository;
import org.jobspotter.review.repository.ReviewRepository;
import org.jobspotter.review.repository.ReviewSpecRepository;
import org.jobspotter.review.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewServiceImpl.class);
    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;
    private final JobPostServiceClient jobPostServiceClient;
    private final ReviewSpecRepository reviewSpecRepository;

    @Override
    @Transactional
    public Long createReview(UUID userId, ReviewPostRequest reviewRequest) {

        log.info("Creating review for user with id: {}", userId);

        JobPostResponse jobPost = null;
//        Try to get the job post from the job-post service and handle response exceptions
        try {
            jobPost = jobPostServiceClient.getJobPostById(reviewRequest.getJobPostId()).getBody();
        } catch (FeignException.FeignClientException e) {

            if (e.status() == 404) {
                log.warn("Job post not found with id: " + reviewRequest.getJobPostId());
                throw new ResourceNotFoundException("Job post not found with id: " + reviewRequest.getJobPostId());

            } else{
                log.error("Job Post Service responded with {}: {}. {}", e.status(), e.getMessage(), e.toString());
                throw new ServerException("Something went wrong, please try again later");
            }

        }

//        Validate the review request
        validateReviewRequest(reviewRequest, jobPost, userId);


//        Save the review
        Review review = Review.builder()
                .reviewerId(userId)
                .reviewedUserId(reviewRequest.getReviewedUserId())
                .reviewerRole(reviewRequest.getReviewerRole())
                .jobPostId(reviewRequest.getJobPostId())
                .rating(Double.parseDouble(String.valueOf(reviewRequest.getRating())))
                .comment(reviewRequest.getComment())
                .build();
        reviewRepository.save(review);



//        Get the ratings of the user being reviewed
        Rating rating = ratingRepository.findByUserId(reviewRequest.getReviewedUserId());

        Rating updated = updateRatingFromPostRequest(reviewRequest, rating);

//        Save the updated rating
        ratingRepository.save(updated);

//        TODO: send notification to the user being reviewed

        return review.getReviewId();
    }


    @Override
    public RatingsResponse getRatingsByUserId(UUID userId) {
        log.info("Getting ratings for user with id: {}", userId);

        Rating rating = ratingRepository.findByUserId(userId);

        if (rating == null) {
            log.warn("Rating not found for user with id: {}", userId);
            return RatingsResponse.builder()
                    .seekerRatingCount(0)
                    .avgSeekerRating(0.0)
                    .providerRatingCount(0)
                    .avgProviderRating(0.0)
                    .build();
        }

        double avgSeekerRating = rating.getSeekerRatingCount() == 0
                ? 0.0
                : new BigDecimal((double) rating.getSeekerRatingSum() / rating.getSeekerRatingCount())
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();

        double avgProviderRating = rating.getProviderRatingCount() == 0
                ? 0.0
                : new BigDecimal((double) rating.getProviderRatingSum() / rating.getProviderRatingCount())
                .setScale(2, RoundingMode.HALF_UP)
                .doubleValue();

        return RatingsResponse.builder()
                .seekerRatingCount(rating.getSeekerRatingCount())
                .avgSeekerRating(avgSeekerRating)
                .providerRatingCount(rating.getProviderRatingCount())
                .avgProviderRating(avgProviderRating)
                .build();
    }


//    Fetch all reviews received by a user (userId) from job seekers or job posters based on the reviewer role
    @Transactional
    @Override
    public Page<ReviewResponse> getReviewsByUserId(UUID reviewedUserId, ReviewerRole reviewerRole, Double minRating, Double maxRating, String dateCreatedMin, String dateCreatedMax, String searchQuery, int page, int size) {
        log.info("Getting reviews for user with id: {}", reviewedUserId);

        PageRequest pageRequest = PageRequest.of(page, size);

        Specification<Review> spec = ReviewSpecification.filterReviewByParams(
                reviewedUserId, String.valueOf(reviewerRole), minRating, maxRating, dateCreatedMin, dateCreatedMax, searchQuery
        );

        Page<Review> reviews = reviewSpecRepository.findAll(spec, pageRequest);

//        Map the reviews to review response objects and return result
        return reviews.map(
                review -> ReviewResponse.builder()
                .reviewId(review.getReviewId())
                .reviewerId(review.getReviewerId())
                .reviewedUserId(review.getReviewedUserId())
                .jobPostId(review.getJobPostId())
                .reviewerRole(review.getReviewerRole())
                .rating(review.getRating())
                .comment(review.getComment())
                .dateCreated(review.getDateCreated())
                .dateUpdated(review.getDateUpdated())
                .build()
        );
    }

    @Transactional
    @Override
    public Long updateReview(UUID userId, ReviewEditRequest reviewRequest, Long reviewId) {


        log.info("Updating review with id: {} for user with id: {}", reviewId, userId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        if (!review.getReviewerId().equals(userId)) {
            log.warn("User with id: {} is not authorized to update review with id: {}", userId, reviewId);
            throw new UnauthorizedException("Could not update review: You are not authorized to update this review");
        }

        Rating userRatings = ratingRepository.findByUserId(review.getReviewedUserId());
        updateReviewFromDto(review, reviewRequest, userRatings);

        reviewRepository.save(review);
        ratingRepository.save(userRatings);

        return review.getReviewId();
    }

    @Transactional
    @Override
    public void deleteReview(UUID userId, Long reviewId) {
        log.info("Deleting review with id: {} for user with id: {}", reviewId, userId);

        Review review = reviewRepository.findById(reviewId)
                .orElseThrow(() -> new ResourceNotFoundException("Review not found with id: " + reviewId));

        if (!review.getReviewerId().equals(userId)) {
            log.warn("User with id: {} is not authorized to delete review with id: {}", userId, reviewId);
            throw new UnauthorizedException("Could not delete review: You are not authorized to delete this review");
        }

        Rating userRatings = ratingRepository.findByUserId(review.getReviewedUserId());

        if (review.getReviewerRole().equals(ReviewerRole.SEEKER)) {
            userRatings.setProviderRatingSum(userRatings.getProviderRatingSum() - review.getRating());
            userRatings.setProviderRatingCount(userRatings.getProviderRatingCount() - 1);
        } else {
            userRatings.setSeekerRatingSum(userRatings.getSeekerRatingSum() - review.getRating());
            userRatings.setSeekerRatingCount(userRatings.getSeekerRatingCount() - 1);
        }

        reviewRepository.delete(review);
        ratingRepository.save(userRatings);
    }

    @Override
    public Page<ReviewResponse> getReviewsByJobPostId(Long jobPostId, int pageNum, int pageSize) {

        return reviewRepository.findAllByJobPostId(jobPostId, PageRequest.of(pageNum, pageSize))
                .map(review -> ReviewResponse.builder()
                        .reviewId(review.getReviewId())
                        .reviewerId(review.getReviewerId())
                        .reviewedUserId(review.getReviewedUserId())
                        .jobPostId(review.getJobPostId())
                        .reviewerRole(review.getReviewerRole())
                        .rating(review.getRating())
                        .comment(review.getComment())
                        .dateCreated(review.getDateCreated())
                        .dateUpdated(review.getDateUpdated())
                        .build()
                );

    }




    /* -------------------------------------------Helper Methods-------------------------------------------------------*/

    private void updateReviewFromDto(Review review, ReviewEditRequest reviewRequest, Rating rating) {

        if (StringUtils.hasText(reviewRequest.getComment())) {
            review.setComment(reviewRequest.getComment());
        }

        if (reviewRequest.getRating() != null) {


//            Update the rating of the user being reviewed based on the role of the reviewer
            if (review.getReviewerRole().equals(ReviewerRole.SEEKER)) {
                rating.setProviderRatingSum(rating.getProviderRatingSum() - review.getRating() + Double.parseDouble(reviewRequest.getRating().toString()));
            } else {
                rating.setSeekerRatingSum(rating.getSeekerRatingSum() - review.getRating() + Double.parseDouble(reviewRequest.getRating().toString()));
            }
//            Update the rating of review only after updating the rating of the user being reviewed
            review.setRating(Double.parseDouble(reviewRequest.getRating().toString()));
        }
    }

    /**
     * Update the rating of the user being reviewed based on provided request and existing ratings
     * @param request Review request
     * @param toUpdate Rating to update
     */
    private Rating updateRatingFromPostRequest(ReviewPostRequest request, Rating toUpdate) {

//        If the user being reviewed does not have a rating, create a new rating Object
        Rating updatedRating = toUpdate;

        if (updatedRating == null) {
            updatedRating = Rating.builder()
                    .userId(request.getReviewedUserId())
                    .seekerRatingCount(0)
                    .seekerRatingSum((0.0))
                    .providerRatingCount(0)
                    .providerRatingSum((0.0))
                    .build();
        }

// Update the rating based on the reviewer role
        if (request.getReviewerRole().equals(ReviewerRole.SEEKER)) {
            updatedRating.setProviderRatingCount(updatedRating.getProviderRatingCount() + 1);
            updatedRating.setProviderRatingSum(updatedRating.getProviderRatingSum() + Double.parseDouble(String.valueOf(request.getRating())));

        } else {
            updatedRating.setSeekerRatingCount(updatedRating.getSeekerRatingCount() + 1);
            updatedRating.setSeekerRatingSum(updatedRating.getSeekerRatingSum() + Double.parseDouble(String.valueOf(request.getRating())));
        }

        return updatedRating;
    }


    /**
     * Validates the review request. Handles logic validations such as if the job post is completed, if the user is authorized to review the job post, if the applicant was accepted to the job post and if the user has already reviewed the job post.
     * Trows relevant exceptions if the validations fail
     *
     * @param reviewRequest Review request
     * @param jobPost Job post to leave review on
     * @param userId User id of the reviewer
     *
     * @throws ForbiddenException If the job post is not completed or if the applicant was not accepted to the job post.
     * @throws UnauthorizedException If the user is not authorized to review the job post.
     * @throws ResourceAlreadyExistsException If the user has already reviewed the job post.
     */
    private void validateReviewRequest(ReviewPostRequest reviewRequest, JobPostResponse jobPost, UUID userId) {


//        Check if the user has already reviewed the job post with same reviewed user id (job poster can review many applicants under same job post)
        if (reviewRepository.existsByReviewerIdAndJobPostIdAndReviewedUserId(userId, reviewRequest.getJobPostId(), reviewRequest.getReviewedUserId())) {
            log.warn("User with id: {} has already reviewed the user with id: {} under job post with id: {}", userId, reviewRequest.getReviewedUserId(), reviewRequest.getJobPostId());
            throw new ResourceAlreadyExistsException("Could not create rating: You have already reviewed this user");
        }

//        Check if the job post is completed
        if (!jobPost.getStatus().equals("COMPLETED")) {
            log.warn("Job post with id: {} is not completed", reviewRequest.getJobPostId());
            throw new ForbiddenException("Could not create rating: Job post is not completed");
        }


//        Check if the user is provider
        if (reviewRequest.getReviewerRole().equals(ReviewerRole.PROVIDER) ) {

//        Find the applicant in the job post applicants set
            Optional<ApplicantResponse> applicant = jobPost.getApplicants().stream()
                    .filter(a -> a.getUserId().equals(reviewRequest.getReviewedUserId()))
                    .findFirst();

//            Check if he is present in the applicants set
            if (applicant.isEmpty()) {
                log.warn("User with id: {} is not an applicant in job post with id: {}", reviewRequest.getReviewedUserId(), reviewRequest.getJobPostId());
                throw new UnauthorizedException("Could not create rating: You are not authorized to review this user as a provider");
            }
//            Check if the applicant was accepted to the job post
            else if (!applicant.get().getStatus().equals("ACCEPTED")) {
                log.warn("User with id: {} was not accepted to the job post with id: {}", reviewRequest.getReviewedUserId(), reviewRequest.getJobPostId());
                throw new ForbiddenException("Could not create rating: Applicant was not accepted to the job post");
            }
//            Check if the user id match the job poster id
            else if (!userId.equals(jobPost.getJobPosterId())) {
                log.warn("User with id: {} is not authorized to review user with id: {} under job post with id: {}", userId, reviewRequest.getReviewedUserId(), reviewRequest.getJobPostId());
                throw new UnauthorizedException("Could not create rating: You are not authorized to review this user");
            }

        }

//        Check if the user is provider and if he is authorized to review the user
        if (reviewRequest.getReviewerRole().equals(ReviewerRole.SEEKER)
                &&
            !jobPost.getJobPosterId().equals(reviewRequest.getReviewedUserId())
        ) {
            log.warn("User with id: {} is not authorized to review user with id: {} under job post with id: {}", userId, reviewRequest.getReviewedUserId(), reviewRequest.getJobPostId());
            throw new UnauthorizedException("Could not create rating: Provided reviewed user id does not match the job poster id");
        }



    }

}
