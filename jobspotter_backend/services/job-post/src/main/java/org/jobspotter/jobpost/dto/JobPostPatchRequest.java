package org.jobspotter.jobpost.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.jobspotter.jobpost.dto.deserializer.TagDeserializer;
import org.jobspotter.jobpost.model.JobTagEnum;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JobPostPatchRequest {
    //The tags associated with the job
    @Schema(
            description = "The array of tags associated with the job",
            example = "[\"GENERAL_HELP\", \"HANDYMAN_SERVICES\"]"
    )
    @Enumerated(EnumType.STRING)
    @JsonDeserialize(using = TagDeserializer.class)
    private Set<JobTagEnum> tags;

    @Schema(description = "The title of the job", example = "General Help")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    private String title;

    @Schema(description = "The description of the job", example = "Help needed with moving furniture")
    @Size(min = 1, max = 255, message = "Description must be between 1 and 255 characters")
    private String description;

    //Maximum number of applicants that can be CONFIRMED for the job
    @Schema(description = "Maximum number of applicants that can be confirmed for the job", example = "5")
    @Min(value = 1, message = "Minimum number of applicants must be 1")
    @Max(value = 15, message = "Maximum number of applicants must be 15")
    private int maxApplicants;
}
