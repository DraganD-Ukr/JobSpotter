package org.jobspotter.report.dto;

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
public class ReportRequest {


    @NotNull
    @org.hibernate.validator.constraints.UUID
    private UUID reportedUserId;

    @Min(1)
    @Max(Long.MAX_VALUE)
    private Long reportedJobPostId;

    @Min(1)
    @Max(Long.MAX_VALUE)
    private Long reportedApplicantId;

    @Min(1)
    @Max(Long.MAX_VALUE)
    private Long reportedReviewId;

    @Size(min = 5, max = 150)
    private String reportMessage;

    private Set<ReportTag> reportTags;


}
