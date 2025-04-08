package org.job_spotter.jobpost.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.job_spotter.jobpost.dto.deserializer.TagDeserializer;
import org.job_spotter.jobpost.model.JobTagEnum;

import java.util.Set;

@Getter
@Setter
@Builder
public class JobPostPostRequest {


    //The tags associated with the job
    @Schema(description = "The arrays of tags associated with the job", example = "[GENERAL_HELP, HANDYMAN_SERVICES]")
    @Enumerated(EnumType.STRING)
    @JsonDeserialize(using = TagDeserializer.class)
    private Set<JobTagEnum> tags;

    @Schema(description = "The title of the job", example = "General Help")
    @Size(min = 1, max = 255, message = "Title must be between 1 and 255 characters")
    private String title;

    @Schema(description = "The description of the job", example = "Help needed with moving furniture")
    @Size(min = 1, max = 255, message = "Description must be between 1 and 255 characters")
    private String description;

//    Id of address used to retrieve address from address service
    @Schema(description = "The id of the address of job post. Has to be job poster's address", example = "1")
    @Min(value = 1, message = "Minimum address id must be 1")
    @Max(value = Long.MAX_VALUE, message = "Maximum address id must not exceed 9,223,372,036,854,775,807")
    private Long addressId;


    //Maximum number of applicants that can be CONFIRMED for the job
    @Schema(description = "Maximum number of applicants that can be confirmed for the job", example = "5")
    @Min(value = 1, message = "Minimum number of applicants must be 1")
    @Max(value = 15, message = "Maximum number of applicants must be 15")
    private int maxApplicants;


}
