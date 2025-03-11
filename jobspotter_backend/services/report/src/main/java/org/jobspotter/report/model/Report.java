package org.jobspotter.report.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Document(collection = "report")
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

    @Field("reportTags") // ADD @Field ANNOTATION HERE - Field name in MongoDB will be "reportTags"
    private Set<ReportTag> reportTags = new HashSet<>();

    @Field("reportStatus") // ADD @Field ANNOTATION HERE - Field name in MongoDB will be "reportStatus"
    private ReportStatus reportStatus;

    @CreatedDate
    private LocalDateTime createdAt;
}