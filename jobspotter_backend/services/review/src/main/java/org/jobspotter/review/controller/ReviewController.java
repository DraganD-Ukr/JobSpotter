package org.jobspotter.review.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.headers.Header;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.jobspotter.review.authUtils.JWTUtils;
import org.jobspotter.review.dto.ErrorResponse;
import org.jobspotter.review.dto.RatingsResponse;
import org.jobspotter.review.dto.ReviewPostRequest;
import org.jobspotter.review.dto.ReviewResponse;
import org.jobspotter.review.exception.ServerException;
import org.jobspotter.review.model.ReviewerRole;
import org.jobspotter.review.service.ReviewService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.UUID;

@AllArgsConstructor
@RestController()
@RequestMapping("/api/v1/reviews")
public class ReviewController {

    private final ReviewService reviewService;


    @Operation(
            summary = "Create review.",
            description = "Creates a review for a job post. You can leave a review either as a provider(job poster) or applicant that worked on a job." +
                    "You can only leave one review per user. " +
                    "Example(Leaving review as applicant): as an applicant you can leave a review only once and only for a job poster" +
                    "Example(Leaving review as job poster): as a job poster you can leave a review only once for specific applicant that was accepted to the job post that was completed."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Successfully created review", headers = {
                    @Header(name = "Location", description = "Location of the created review")
            }),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "404", description = "Not Found",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @PostMapping
    public ResponseEntity<HttpStatus> createReview(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody @Valid ReviewPostRequest reviewRequest
    ) {

        UUID userId;
        try {
            userId = JWTUtils.getUserIdFromToken(accessToken);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }

        
        Long createdReviewId = reviewService.createReview(userId, reviewRequest);

        try {
            return ResponseEntity.created(new URI("/api/v1/reviews/" + createdReviewId)).build();
        } catch (URISyntaxException e) {
            throw new ServerException("Could not create review");
        }

    }





    @Operation(
            summary = "Get ratings of a user.",
            description = "Get ratings of a user (both provider(job-poster) and seeker(applicant) ratings) by provided user id."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved ratings of user", content = {
                    @Content(mediaType = "application/json", schema = @Schema(implementation = RatingsResponse.class))
            }),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/user/{userId}/ratings")
    public ResponseEntity<RatingsResponse> getRatingsOfUser(
            @PathVariable UUID userId
    ) {
        return ResponseEntity.ok(reviewService.getRatingsByUserId(userId));
    }






    @Operation(
            summary = "Get reviews of a user.",
            description = "Get reviews of a user based on the provided user id and reviewer role. " +
                    "You can get all reviews received by a user(userId) from providers(job posters) or seekers(applicants). " +
                    "Request parameter 'reviewerRole' is used to specify the role of the reviewer."
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved reviews of user", content = {
                    @Content(mediaType = "application/json",
                            schema = @Schema(implementation = PageImpl.class),
                            array = @ArraySchema(
                                    schema = @Schema(implementation = ReviewResponse.class)
                            )
                    ),
            }),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/user/{userId}/reviews")
    public ResponseEntity<Page<ReviewResponse>> getReviewsOfUser(
            @PathVariable UUID userId,
            @RequestParam ReviewerRole reviewerRole,
            @RequestParam(required = false, defaultValue = "0") int page,
            @RequestParam(required = false, defaultValue = "10") int size
    ) {
        return ResponseEntity.ok(reviewService.getReviewsByUserId(userId, reviewerRole, page, size));
    }


}
