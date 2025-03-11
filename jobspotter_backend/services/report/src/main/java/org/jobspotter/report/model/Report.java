package org.jobspotter.report.model;


import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.v3.oas.annotations.media.Schema;
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
    @Schema(description = "Report ID with type of UUID", example = "662fdc3e-937b-4042-96e5-358de745695c")
    private String reportId;

    @NotNull
    @Schema(description = "Reporter ID type of UUID", example = "662fdc3e-937b-4042-96e5-358de745695c")
    private UUID reporterId;

    @NotNull
    @Schema(description = "Reported User ID", example = "662fdc3e-937b-4042-96e5-358de745695c")
    private UUID reportedUserId;

    @Schema(description = "Reported Job Post ID, optional", example = "662fdc3e-937b-4042-96e5-358de745695c")
    private Long reportedJobPostId;

    @Schema(description = "Reported Applicant ID, optional", example = "662fdc3e-937b-4042-96e5-358de745695c")
    private Long reportedApplicantId;

    @Schema(description = "Reported Review ID, optional", example = "662fdc3e-937b-4042-96e5-358de745695c")
    private Long reportedReviewId;

    @Size(min = 5, max = 150)
    @Schema(description = "Report message", example = "This user is posting inappropriate content.")
    private String reportMessage;

    @Field("reportTags") 
    @Schema(description = "Report tags", example = "[\"INAPPROPRIATE_CONTENT\", \"SPAM\"]")
    private Set<ReportTag> reportTags = new HashSet<>();

    @Field("reportStatus")
    @Schema(description = "Report status", example = "PENDING")
    private ReportStatus reportStatus;

    @CreatedDate
    @Schema(description = "Report creation date", example = "2021-10-10T10:00:00")
    private LocalDateTime createdAt;
}