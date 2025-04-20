package org.jobspotter.jobpost.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobPostApplyRequest {

    @Schema(description = "Message to job post creator. Not required",
            example = "Hey, I am interested in this job!",
            required = false
    )
    @Size(max = 255, message = "Message must be less than 255 characters")
    private String message;

}
