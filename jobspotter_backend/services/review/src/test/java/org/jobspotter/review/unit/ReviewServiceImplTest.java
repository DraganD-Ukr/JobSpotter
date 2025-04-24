package org.jobspotter.review.unit;


import feign.FeignException;
import feign.Request;
import org.jobspotter.review.client.JobPostServiceClient;
import org.jobspotter.review.dto.*;
import org.jobspotter.review.exception.*;
import org.jobspotter.review.model.Rating;
import org.jobspotter.review.model.Review;
import org.jobspotter.review.model.ReviewerRole;
import org.jobspotter.review.repository.RatingRepository;
import org.jobspotter.review.repository.ReviewRepository;
import org.jobspotter.review.repository.ReviewSpecRepository;
import org.jobspotter.review.service.impl.ReviewServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;

import java.math.BigDecimal;
import java.nio.charset.Charset;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ReviewServiceImplTest {

    @Mock
    private ReviewRepository reviewRepository;

    @Mock
    private RatingRepository ratingRepository;

    @Mock
    private JobPostServiceClient jobPostServiceClient;

    @Mock
    private ReviewSpecRepository reviewSpecRepository;

    @InjectMocks
    private ReviewServiceImpl reviewService;

    @Captor
    private ArgumentCaptor<Review> reviewCaptor;

    @Captor
    private ArgumentCaptor<Rating> ratingCaptor;



    @Test
    void createReview_Successfully() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        UUID reviewedUserId = UUID.randomUUID();
        Long jobPostId = 123L;
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .reviewedUserId(reviewedUserId)
                .reviewerRole(ReviewerRole.PROVIDER)
                .jobPostId(jobPostId)
                .rating(BigDecimal.valueOf(4.5))
                .comment("Great applicant!")
                .build();

        JobPostResponse jobPostResponse = JobPostResponse.builder()
                .jobPostId(jobPostId)
                .status("COMPLETED")
                .jobPosterId(reviewerId)
                .applicants(Set.of(ApplicantResponse.builder().userId(reviewedUserId).status("ACCEPTED").build()))
                .build();
        ResponseEntity<JobPostResponse> jobPostResponseEntity = ResponseEntity.ok(jobPostResponse);

        Rating existingRating = Rating.builder()
                .userId(reviewedUserId)
                .providerRatingCount(10)
                .providerRatingSum(40.0)
                .seekerRatingCount(5)
                .seekerRatingSum(20.0)
                .build();


        when(jobPostServiceClient.getJobPostById(jobPostId)).thenReturn(jobPostResponseEntity);
        when(reviewRepository.existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, jobPostId, reviewedUserId)).thenReturn(false);
        when(ratingRepository.findByUserId(reviewedUserId)).thenReturn(existingRating);
        when(reviewRepository.save(any(Review.class))).thenAnswer(invocation -> {
            Review review = invocation.getArgument(0);
            review.setReviewId(1L); // Simulate ID being set on save
            return review;
        });
        when(ratingRepository.save(any(Rating.class))).thenReturn(existingRating);


        // When
        Long reviewId = reviewService.createReview(reviewerId, reviewRequest);

        // Then
        assertThat(reviewId).isEqualTo(1L);

        verify(jobPostServiceClient, times(1)).getJobPostById(jobPostId);
        verify(reviewRepository, times(1)).existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, jobPostId, reviewedUserId);
        verify(reviewRepository, times(1)).save(any(Review.class));
        verify(ratingRepository, times(1)).findByUserId(reviewedUserId);
        verify(ratingRepository, times(1)).save(any(Rating.class));
    }

    @Test
    void createReview_JobPostNotFound() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

        Request mockRequest = Request.create(Request.HttpMethod.GET, "/api/v1/job-posts/123", Collections.emptyMap(), null, Charset.defaultCharset(), null);

        when(jobPostServiceClient.getJobPostById(123L)).thenThrow(new FeignException.FeignClientException(404, "Not Found", mockRequest, null, null));

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Job post not found with id: 123");

        verify(jobPostServiceClient, times(1)).getJobPostById(123L);
        verifyNoInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }


    @Test
    void createReview_JobPostServiceServerError() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

//        Also pass request object to FeignException constructor
        Request mockRequest = Request.create(Request.HttpMethod.GET, "/api/v1/job-posts/123", Collections.emptyMap(), null, Charset.defaultCharset(), null);

        when(jobPostServiceClient.getJobPostById(123L)).thenThrow(new FeignException.FeignClientException(500, "Server Error", mockRequest , null, null));

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(ServerException.class)
                .hasMessage("Something went wrong, please try again later");

        verify(jobPostServiceClient, times(1)).getJobPostById(123L);
        verifyNoInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void createReview_AlreadyReviewed() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

        JobPostResponse jobPostResponse = JobPostResponse.builder()
                .jobPostId(123L)
                .status("COMPLETED")
                .jobPosterId(reviewerId)
                .applicants(Set.of(ApplicantResponse.builder().userId(reviewRequest.getReviewedUserId()).status("ACCEPTED").build()))
                .build();
        ResponseEntity<JobPostResponse> jobPostResponseEntity = ResponseEntity.ok(jobPostResponse);


        when(jobPostServiceClient.getJobPostById(123L)).thenReturn(jobPostResponseEntity);
        when(reviewRepository.existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, 123L, reviewRequest.getReviewedUserId())).thenReturn(true);

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(ResourceAlreadyExistsException.class)
                .hasMessage("Could not create rating: You have already reviewed this user");

        verify(jobPostServiceClient, times(1)).getJobPostById(123L);
        verify(reviewRepository, times(1)).existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, 123L, reviewRequest.getReviewedUserId());
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void createReview_JobPostNotCompleted() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

        JobPostResponse jobPostResponse = JobPostResponse.builder()
                .jobPostId(123L)
                .status("ACTIVE") // Job post not completed
                .jobPosterId(reviewerId)
                .applicants(Set.of(ApplicantResponse.builder().userId(reviewRequest.getReviewedUserId()).status("ACCEPTED").build()))
                .build();
        ResponseEntity<JobPostResponse> jobPostResponseEntity = ResponseEntity.ok(jobPostResponse);


        when(jobPostServiceClient.getJobPostById(123L)).thenReturn(jobPostResponseEntity);

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("Could not create rating: Job post is not completed");

        verify(jobPostServiceClient, times(1)).getJobPostById(123L);
        verify(reviewRepository, times(1)).existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, 123L, reviewRequest.getReviewedUserId());
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void createReview_UnauthorizedReviewer_ApplicantNotFound() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

        JobPostResponse jobPostResponse = JobPostResponse.builder()
                .jobPostId(123L)
                .status("COMPLETED")
                .jobPosterId(reviewerId)
                .applicants(Collections.emptySet()) // Applicant not found
                .build();
        ResponseEntity<JobPostResponse> jobPostResponseEntity = ResponseEntity.ok(jobPostResponse);


        when(jobPostServiceClient.getJobPostById(123L)).thenReturn(jobPostResponseEntity);

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Could not create rating: You are not authorized to review this user as a provider");

        verify(jobPostServiceClient, times(1)).getJobPostById(123L);
        verify(reviewRepository, times(1)).existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, 123L, reviewRequest.getReviewedUserId());
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void createReview_UnauthorizedReviewer_ApplicantNotAccepted() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        UUID reviewedUserId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(reviewedUserId)
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

        JobPostResponse jobPostResponse = JobPostResponse.builder()
                .jobPostId(123L)
                .status("COMPLETED")
                .jobPosterId(reviewerId)
                .applicants(Set.of(ApplicantResponse.builder().userId(reviewedUserId).status("PENDING").build())) // Applicant not accepted
                .build();
        ResponseEntity<JobPostResponse> jobPostResponseEntity = ResponseEntity.ok(jobPostResponse);


        when(jobPostServiceClient.getJobPostById(123L)).thenReturn(jobPostResponseEntity);

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(ForbiddenException.class)
                .hasMessage("Could not create rating: Applicant was not accepted to the job post");

        verify(reviewRepository, times(1)).existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, 123L, reviewedUserId);
        verify(jobPostServiceClient, times(1)).getJobPostById(123L);
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void createReview_UnauthorizedReviewer_ProviderReviewsProvider() {
        // Given
        UUID reviewerId = UUID.randomUUID();
        UUID reviewedUserId = UUID.randomUUID();
        ReviewPostRequest reviewRequest = ReviewPostRequest.builder()
                .jobPostId(123L)
                .reviewedUserId(reviewedUserId) // Reviewed user is JobPoster (Provider)
                .reviewerRole(ReviewerRole.SEEKER) // Reviewer is Seeker
                .rating(BigDecimal.valueOf(4.0))
                .comment("Good job!")
                .build();

        JobPostResponse jobPostResponse = JobPostResponse.builder()
                .jobPostId(123L)
                .status("COMPLETED")
                .jobPosterId(UUID.randomUUID()) // Different Job Poster ID
                .applicants(Collections.emptySet())
                .build();
        ResponseEntity<JobPostResponse> jobPostResponseEntity = ResponseEntity.ok(jobPostResponse);


        when(jobPostServiceClient.getJobPostById(123L)).thenReturn(jobPostResponseEntity);

        // When, Then
        assertThatThrownBy(() -> reviewService.createReview(reviewerId, reviewRequest))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Could not create rating: Provided reviewed user id does not match the job poster id");

        verify(reviewRepository, times(1)).existsByReviewerIdAndJobPostIdAndReviewedUserId(reviewerId, 123L, reviewedUserId);
        verify(jobPostServiceClient, times(1)).getJobPostById(123L);

        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }


    @Test
    void getRatingsByUserId_RatingFound() {
        // Given
        UUID userId = UUID.randomUUID();
        Rating existingRating = Rating.builder()
                .userId(userId)
                .providerRatingCount(10)
                .providerRatingSum(45.0)
                .seekerRatingCount(5)
                .seekerRatingSum(20.0)
                .build();
        when(ratingRepository.findByUserId(userId)).thenReturn(existingRating);

        // When
        RatingsResponse ratingsResponse = reviewService.getRatingsByUserId(userId);

        // Then
        assertThat(ratingsResponse).isNotNull();
        assertThat(ratingsResponse.getAvgProviderRating()).isEqualTo(4.5);
        assertThat(ratingsResponse.getAvgSeekerRating()).isEqualTo(4.0);
        assertThat(ratingsResponse.getProviderRatingCount()).isEqualTo(10);
        assertThat(ratingsResponse.getSeekerRatingCount()).isEqualTo(5);

        verify(ratingRepository, times(1)).findByUserId(userId);
    }

    @Test
    void getRatingsByUserId_RatingNotFound() {
        // Given
        UUID userId = UUID.randomUUID();
        when(ratingRepository.findByUserId(userId)).thenReturn(null);

        // When
        RatingsResponse ratingsResponse = reviewService.getRatingsByUserId(userId);

        // Then
        assertThat(ratingsResponse).isNotNull();
        assertThat(ratingsResponse.getAvgProviderRating()).isEqualTo(0.0);
        assertThat(ratingsResponse.getAvgSeekerRating()).isEqualTo(0.0);
        assertThat(ratingsResponse.getProviderRatingCount()).isEqualTo(0);
        assertThat(ratingsResponse.getSeekerRatingCount()).isEqualTo(0);

        verify(ratingRepository, times(1)).findByUserId(userId);
    }


    @Test
    void getReviewsByUserId_Successfully() {
        // Given
        UUID reviewedUserId = UUID.randomUUID();
        ReviewerRole reviewerRole = ReviewerRole.SEEKER;
        Double minRating = 3.0;
        Double maxRating = 4.0;
        String dateCreatedMin = "2023-01-01";
        String dateCreatedMax = "2023-01-31";
        String searchQuery = "test search";
        int pageNum = 0;
        int pageSize = 10;

        List<Review> reviewList = Arrays.asList(
                Review.builder().reviewId(1L).reviewedUserId(reviewedUserId).reviewerRole(reviewerRole).rating(3.5).comment("Review 1").build(),
                Review.builder().reviewId(2L).reviewedUserId(reviewedUserId).reviewerRole(reviewerRole).rating(4.0).comment("Review 2").build()
        );
        Page<Review> reviewPage = new PageImpl<>(reviewList, PageRequest.of(pageNum, pageSize), reviewList.size());

        when(reviewSpecRepository.findAll(any(Specification.class), any(PageRequest.class))).thenReturn(reviewPage);

        // When
        Page<ReviewResponse> responsePage = reviewService.getReviewsByUserId(reviewedUserId, reviewerRole, minRating, maxRating, dateCreatedMin, dateCreatedMax, searchQuery, pageNum, pageSize);

        // Then
        assertThat(responsePage).isNotNull();
        assertThat(responsePage.getContent()).hasSize(2);
        assertThat(responsePage.getTotalElements()).isEqualTo(2);
        assertThat(responsePage.getContent().get(0).getReviewId()).isEqualTo(1L);
        assertThat(responsePage.getContent().get(1).getReviewId()).isEqualTo(2L);

        verify(reviewSpecRepository, times(1)).findAll(any(Specification.class), any(PageRequest.class));
    }

    @Test
    void updateReview_Successfully() {
        // Given
        UUID userId = UUID.randomUUID();
        Long reviewId = 1L;
        ReviewEditRequest reviewRequest = ReviewEditRequest.builder()
                .rating(BigDecimal.valueOf(5.0))
                .comment("Updated comment")
                .build();

        UUID reviewedUserId = UUID.randomUUID();
        Review existingReview = Review.builder()
                .reviewId(reviewId)
                .reviewerId(userId)
                .reviewedUserId(reviewedUserId)
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(4.0)
                .comment("Original comment")
                .build();
        Rating existingRating = Rating.builder()
                .userId(reviewedUserId)
                .providerRatingSum(40.0)
                .providerRatingCount(10)
                .seekerRatingSum(20.0)
                .seekerRatingCount(5)
                .build();


        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(existingReview));
        when(ratingRepository.findByUserId(reviewedUserId)).thenReturn(existingRating);
        when(reviewRepository.save(any(Review.class))).thenReturn(existingReview);
        when(ratingRepository.save(any(Rating.class))).thenReturn(existingRating);


        // When
        reviewService.updateReview(userId, reviewRequest, reviewId);

        verify(reviewRepository, times(1)).findById(reviewId);
        verify(ratingRepository, times(1)).findByUserId(reviewedUserId);

//        Wont work cause we return not updated object, instead capture what was passed to .save()

        verify(reviewRepository, times(1)).save(reviewCaptor.capture());
        verify(ratingRepository, times(1)).save(ratingCaptor.capture());

        Review updatedReview = reviewCaptor.getValue();
        Rating updatedRating = ratingCaptor.getValue();

//        Verify updated ratings
        assertThat(updatedReview.getRating()).isEqualTo(5.0);
        assertThat(updatedReview.getComment()).isEqualTo("Updated comment");
        assertThat(updatedRating.getProviderRatingSum()).isEqualTo(40.0);
        assertThat(updatedRating.getProviderRatingCount()).isEqualTo(10);
        assertThat(updatedRating.getSeekerRatingSum()).isEqualTo(21.0);
        assertThat(updatedRating.getSeekerRatingCount()).isEqualTo(5);

//        Verify updated review
        assertThat(updatedReview.getReviewId()).isEqualTo(reviewId);
        assertThat(updatedReview.getRating()).isEqualTo(5.0);
        assertThat(updatedReview.getComment()).isEqualTo("Updated comment");
        assertThat(updatedReview.getReviewerId()).isEqualTo(userId);
        assertThat(updatedReview.getReviewedUserId()).isEqualTo(reviewedUserId);
        assertThat(updatedReview.getReviewerRole()).isEqualTo(ReviewerRole.PROVIDER);




    }

    @Test
    void updateReview_ReviewNotFound() {
        // Given
        UUID userId = UUID.randomUUID();
        Long reviewId = 1L;
        ReviewEditRequest reviewRequest = ReviewEditRequest.builder()
                .rating(BigDecimal.valueOf(5.0))
                .comment("Updated comment")
                .build();

        when(reviewRepository.findById(reviewId)).thenReturn(Optional.empty());

        // When, Then
        assertThatThrownBy(() -> reviewService.updateReview(userId, reviewRequest, reviewId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Review not found with id: " + reviewId);

        verify(reviewRepository, times(1)).findById(reviewId);
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void updateReview_UnauthorizedUser() {
        // Given
        UUID userId = UUID.randomUUID();
        UUID otherUserId = UUID.randomUUID();
        Long reviewId = 1L;
        ReviewEditRequest reviewRequest = ReviewEditRequest.builder()
                .rating(BigDecimal.valueOf(5.0))
                .comment("Updated comment")
                .build();

        Review existingReview = Review.builder()
                .reviewId(reviewId)
                .reviewerId(otherUserId) // Different reviewer ID
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(4.0)
                .comment("Original comment")
                .build();


        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(existingReview));

        // When, Then
        assertThatThrownBy(() -> reviewService.updateReview(userId, reviewRequest, reviewId))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Could not update review: You are not authorized to update this review");

        verify(reviewRepository, times(1)).findById(reviewId);
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }


    @Test
    void deleteReview_Successfully() {
        // Given
        UUID userId = UUID.randomUUID();
        Long reviewId = 1L;
        UUID reviewedUserId = UUID.randomUUID();


        Review existingReview = Review.builder()
                .reviewId(reviewId)
                .reviewerId(userId)
                .reviewedUserId(reviewedUserId)
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(4.0)
                .comment("Original comment")
                .build();
        Rating existingRating = Rating.builder()
                .userId(reviewedUserId)
                .providerRatingSum(40.0)
                .providerRatingCount(10)
                .seekerRatingSum(20.0)
                .seekerRatingCount(5)
                .build();


        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(existingReview));
        when(ratingRepository.findByUserId(reviewedUserId)).thenReturn(existingRating);
        doNothing().when(reviewRepository).delete(existingReview);
        when(ratingRepository.save(any(Rating.class))).thenReturn(existingRating);


        // When
        reviewService.deleteReview(userId, reviewId);

        // Then
        verify(reviewRepository, times(1)).findById(reviewId);
        verify(ratingRepository, times(1)).findByUserId(reviewedUserId);
        verify(reviewRepository, times(1)).delete(existingReview);
        verify(ratingRepository, times(1)).save(existingRating);
    }


    @Test
    void deleteReview_ReviewNotFound() {
        // Given
        UUID userId = UUID.randomUUID();
        Long reviewId = 1L;

        when(reviewRepository.findById(reviewId)).thenReturn(Optional.empty());

        // When, Then
        assertThatThrownBy(() -> reviewService.deleteReview(userId, reviewId))
                .isInstanceOf(ResourceNotFoundException.class)
                .hasMessage("Review not found with id: " + reviewId);

        verify(reviewRepository, times(1)).findById(reviewId);
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void deleteReview_UnauthorizedUser() {
        // Given
        UUID userId = UUID.randomUUID();
        UUID otherUserId = UUID.randomUUID();
        Long reviewId = 1L;


        Review existingReview = Review.builder()
                .reviewId(reviewId)
                .reviewerId(otherUserId) // Different reviewer ID
                .reviewedUserId(UUID.randomUUID())
                .reviewerRole(ReviewerRole.PROVIDER)
                .rating(4.0)
                .comment("Original comment")
                .build();


        when(reviewRepository.findById(reviewId)).thenReturn(Optional.of(existingReview));

        // When, Then
        assertThatThrownBy(() -> reviewService.deleteReview(userId, reviewId))
                .isInstanceOf(UnauthorizedException.class)
                .hasMessage("Could not delete review: You are not authorized to delete this review");

        verify(reviewRepository, times(1)).findById(reviewId);
        verifyNoMoreInteractions(reviewRepository);
        verifyNoInteractions(ratingRepository);
    }

    @Test
    void getReviewsByJobPostId_Successfully() {
        // Given
        Long jobPostId = 123L;
        int pageNum = 0;
        int pageSize = 10;

        List<Review> reviewList = Arrays.asList(
                Review.builder().reviewId(1L).jobPostId(jobPostId).comment("Review 1 for job post").build(),
                Review.builder().reviewId(2L).jobPostId(jobPostId).comment("Review 2 for job post").build()
        );
        Page<Review> reviewPage = new PageImpl<>(reviewList, PageRequest.of(pageNum, pageSize), reviewList.size());

        when(reviewRepository.findAllByJobPostId(jobPostId, PageRequest.of(pageNum, pageSize))).thenReturn(reviewPage);

        // When
        Page<ReviewResponse> responsePage = reviewService.getReviewsByJobPostId(jobPostId, pageNum, pageSize);

        // Then
        assertThat(responsePage).isNotNull();
        assertThat(responsePage.getContent()).hasSize(2);
        assertThat(responsePage.getTotalElements()).isEqualTo(2);
        assertThat(responsePage.getContent().get(0).getReviewId()).isEqualTo(1L);
        assertThat(responsePage.getContent().get(1).getReviewId()).isEqualTo(2L);

        verify(reviewRepository, times(1)).findAllByJobPostId(jobPostId, PageRequest.of(pageNum, pageSize));
    }
}