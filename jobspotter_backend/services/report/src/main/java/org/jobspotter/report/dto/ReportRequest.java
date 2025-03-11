package org.jobspotter.report.dto;

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
    private UUID reporterId;

    @NotNull
    private UUID reportedUserId;

    private Long reportedJobPostId;

    private Long reportedApplicantId;

    private Long reportedReviewId;

    @Size(min = 5, max = 150)
    private String reportMessage;

    private Set<ReportTag> reportTags;


}
