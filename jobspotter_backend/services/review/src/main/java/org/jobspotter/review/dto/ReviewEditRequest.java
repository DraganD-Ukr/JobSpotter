package org.jobspotter.review.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Getter
@Setter(AccessLevel.NONE)
@AllArgsConstructor
@NoArgsConstructor
public class ReviewEditRequest {

    @Schema(description = "Comment of the review. Must be between 5 and 450 characters")
    @Size(min=5, max = 450)
    private String comment;

    @Schema(description = "Rating of the review. Must be between 1.0 and 5.0 with at most one decimal place")
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    @DecimalMin(value = "1.0", inclusive = true, message = "Rating must be at least 1.0")
    @DecimalMax(value = "5.0", inclusive = true, message = "Rating must be at most 5.0")
    @Digits(integer = 1, fraction = 1, message = "Rating must have at most one decimal place")
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

}
