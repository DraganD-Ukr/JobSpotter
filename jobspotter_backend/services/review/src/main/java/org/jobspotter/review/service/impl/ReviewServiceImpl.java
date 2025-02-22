package org.jobspotter.review.service.impl;


import feign.FeignException;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.jobspotter.review.client.JobPostServiceClient;
import org.jobspotter.review.dto.ApplicantResponse;
import org.jobspotter.review.dto.JobPostResponse;
import org.jobspotter.review.dto.ReviewPostRequest;
import org.jobspotter.review.exception.*;
import org.jobspotter.review.model.Rating;
import org.jobspotter.review.model.Review;
import org.jobspotter.review.model.ReviewerRole;
import org.jobspotter.review.repository.RatingRepository;
import org.jobspotter.review.repository.ReviewRepository;
import org.jobspotter.review.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@AllArgsConstructor
@Service
public class ReviewServiceImpl implements ReviewService {

    private static final Logger log = LoggerFactory.getLogger(ReviewServiceImpl.class);
    private final ReviewRepository reviewRepository;
    private final RatingRepository ratingRepository;
    private final JobPostServiceClient jobPostServiceClient;

    @Override
    @Transactional
    public Long createReview(UUID userId, ReviewPostRequest reviewRequest) {

        JobPostResponse jobPost = null;
//        Try to get the job post from the job-post service and handle response exceptions
        try {
            jobPost = jobPostServiceClient.getJobPostById(reviewRequest.getJobPostId()).getBody();
        } catch (FeignException.FeignClientException e) {

            if (e.status() == 404) {
                log.warn("Job post not found with id: " + reviewRequest.getJobPostId());
                throw new ResourceNotFoundException("Job post not found with id: " + reviewRequest.getJobPostId());

            } else{
                log.error("Job Post Service responded with 500: {}. {}", e.getMessage(), e.toString());
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
                .rating(reviewRequest.getRating())
                .comment(reviewRequest.getComment())
                .build();
        reviewRepository.save(review);



//        Get the ratings of the user being reviewed
        Rating rating = ratingRepository.findByUserId(userId);

        Rating updated = updateRating(reviewRequest, rating, reviewRequest.getReviewedUserId());

//        Save the updated rating
        ratingRepository.save(updated);

//        TODO: send notification to the user being reviewed

        return review.getReviewId();
    }

    /**
     * Update the rating of the user being reviewed based on provided request and existing ratings
     * @param request Review request
     * @param toUpdate Rating to update
     */
    private Rating updateRating(ReviewPostRequest request, Rating toUpdate, UUID userId) {

//        If the user being reviewed does not have a rating, create a new rating Object
        Rating updatedRating = toUpdate;

        if (updatedRating == null) {
            updatedRating = Rating.builder()
                    .userId(userId)
                    .seekerRatingCount(0)
                    .seekerRatingSum(0)
                    .providerRatingCount(0)
                    .providerRatingSum(0)
                    .build();
        }

//        If the reviewer is a seeker, update the provider rating count and sum
        if (request.getReviewerRole().equals(ReviewerRole.SEEKER)) {
            updatedRating.setProviderRatingCount(updatedRating.getSeekerRatingCount() + 1);
            updatedRating.setProviderRatingSum(updatedRating.getSeekerRatingSum() + request.getRating());

//            If the reviewer is a provider, update the seeker rating count and sum
        } else if (request.getReviewerRole().equals(ReviewerRole.PROVIDER)) {
            updatedRating.setSeekerRatingCount(updatedRating.getProviderRatingCount() + 1);
            updatedRating.setSeekerRatingSum(updatedRating.getProviderRatingSum() + request.getRating());
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


//        Check if the user is seeker
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

        }

//        Check if the user is provider and if he is authorized to review the user
        if (reviewRequest.getReviewerRole().equals(ReviewerRole.SEEKER) && !jobPost.getJobPosterId().equals(reviewRequest.getReviewedUserId())) {
            log.warn("User with id: {} is not authorized to review user with id: {} under job post with id: {}", userId, reviewRequest.getReviewedUserId(), reviewRequest.getJobPostId());
            throw new UnauthorizedException("Could not create rating: Provided reviewed user id does not match the job poster id");
        }



    }

}
