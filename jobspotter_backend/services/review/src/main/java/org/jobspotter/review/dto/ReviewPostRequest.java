package org.jobspotter.review.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.jobspotter.review.model.ReviewerRole;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.UUID;


@AllArgsConstructor
@Getter
@Setter
@Builder
public class ReviewPostRequest {

    @NotNull
    @Pattern(regexp = "^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$", message = "Invalid UUID format")
    private UUID reviewedUserId;

    @NotNull(message = "Job post id is required")
    private Long jobPostId;

    @NotNull(message = "Reviewer role is required")
    @Enumerated(EnumType.STRING)
    private ReviewerRole reviewerRole;

    @Digits(integer = 1, fraction = 1, message = "Rating must be a number with one decimal place")
    @DecimalMin(value = "1.0", message = "Rating must be between 1.0 and 5.0")
    @DecimalMax(value = "5.0", message = "Rating must be between 1.0 and 5.0")
    private BigDecimal rating;

    public void setRating(BigDecimal rating) {
        if (rating != null) {
            // Check manually if the rating is within the allowed range
            if (rating.compareTo(BigDecimal.valueOf(1.0)) < 0 || rating.compareTo(BigDecimal.valueOf(5.0)) > 0) {
                throw new IllegalArgumentException("Rating must be between 1.0 and 5.0");
            }

            // Round the rating to 1 decimal place
            this.rating = rating.setScale(1, RoundingMode.HALF_UP);
        }
    }

    @Size(max = 450, message = "Comment must be less than 450 characters")
    private String comment;


}
