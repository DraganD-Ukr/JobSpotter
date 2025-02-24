package org.jobspotter.review.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReviewEditRequest {

    @Size(min=5, max = 450)
    private String comment;

    @DecimalMin(value = "1.0", inclusive = true, message = "Rating must be at least 1.0") // Minimum value
    @DecimalMax(value = "5.0", inclusive = true, message = "Rating must be at most 5.0") // Maximum value
    @Digits(integer = 1, fraction = 1, message = "Rating can have at most one decimal place and one integer digit (1-5)") // Max 1 integer digit and 1 fraction digit
    private BigDecimal rating;

}
