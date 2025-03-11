package org.jobspotter.report.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Document(collection = "report")// MongoDB Collection
@Getter
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class Report {

    @Id
    private String reportId;

    @NotNull
    private UUID reporterId;

    @NotNull
    private UUID reportedUserId;


    private Long reportedJobPostId;

    private Long reportedApplicantId;

    private Long reportedReviewId;

    @Size(min = 5, max = 150)
    private String reportMessage;

    private Set<ReportTag> reportTags = new HashSet<>();

    private ReportStatus reportStatus;

    @CreatedDate // Automatically set when document is created
    private LocalDateTime createdAt;


}
