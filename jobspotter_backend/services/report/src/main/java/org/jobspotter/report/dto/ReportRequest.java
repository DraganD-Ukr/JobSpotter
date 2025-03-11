package org.jobspotter.report.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jobspotter.report.model.ReportTag;

import java.util.Set;
import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@Schema(description = "The report request object")
public class ReportRequest {


    @Schema(description = "The user id of the reporter, required", example = "123e4567-e89b-12d3-a456-426614174000")
    @NotNull
    @org.hibernate.validator.constraints.UUID(message = "Invalid UUID format")
    private UUID reportedUserId;

    @Schema(description = "The job post id of the reported job post, optional", example = "1")
    @Min(value = 1, message = "The job post id must be greater than 0")
    @Max(value = Long.MAX_VALUE, message = "The job post id is too large")
    private Long reportedJobPostId;

    @Schema(description = "The applicant id of the reported applicant, optional", example = "1")
    @Min(value = 1, message = "The applicant id must be greater than 0")
    @Max(value = Long.MAX_VALUE, message = "The applicant id is too large")
    private Long reportedApplicantId;

    @Schema(description = "The review id of the reported review, optional", example = "1")
    @Min(value = 1, message = "The review id must be greater than 0")
    @Max(value = Long.MAX_VALUE, message = "The review id is too large")
    private Long reportedReviewId;

    @Schema(description = "The message of the report, optional", example = "This is a report message")
    @Size(min = 5, max = 150, message = "The report message must be between 5 and 150 characters")
    private String reportMessage;

    @Schema(description = "The tags of the report, optional", example = "SPAM")
    private Set<ReportTag> reportTags;


}
