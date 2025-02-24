package org.jobspotter.review.dto;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.jobspotter.review.model.ReviewerRole;

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
    private Double rating;

    @Size(max = 450, message = "Comment must be less than 450 characters")
    private String comment;


}
