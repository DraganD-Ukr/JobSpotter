package org.jobspotter.jobpost.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.jobspotter.jobpost.model.ApplicantStatus;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApplicantActionRequest {

    @Schema(description = "The id of the applicant", example = "1")
    @NotNull
    @Min(1)
    private int applicantId;

    @Schema(description = "The status of the applicant", example = "CONFIRMED", allowableValues = {"CONFIRMED", "REJECTED"})
    @NotNull
    @Enumerated(EnumType.STRING)
    private ApplicantStatus status;

}
