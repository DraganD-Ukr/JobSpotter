package org.jobspotter.review.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.jobspotter.review.model.ReviewerRole;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class ReviewResponse {

    @Schema(description = "Review ID", example = "1")
    private Long reviewId;

    @Schema(description = "Reviewer ID", example = "1")
    private UUID reviewerId;

    @Schema(description = "Reviewed User ID (the user who was reviewed)", example = "1")
    private UUID reviewedUserId;

    @Schema(description = "Job Post ID", example = "1")
    private Long jobPostId;

    @Schema(description = "Reviewed User Role", example = "SEEKER")
    private ReviewerRole reviewerRole;

    @Schema(description = "Rating of this review. Can be up to two decimal points", example = "4.5")
    private Double rating;

    @Schema(description = "Comment of this review", example = "I liked the provider of a job post. Very generous and kind.")
    private String comment;

    @Schema(description = "Date when this review was created", example = "2021-08-01T12:00:00")
    private LocalDateTime dateCreated;

    @Schema(description = "Date when this review was updated", example = "2021-08-01T12:00:00")
    private LocalDateTime dateUpdated;

}
