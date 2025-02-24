package org.job_spotter.jobpost.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.job_spotter.jobpost.dto.deserializer.ApplicantStatusDeserializer;
import org.job_spotter.jobpost.model.ApplicantStatus;

import java.util.UUID;


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
    @JsonDeserialize(using = ApplicantStatusDeserializer.class)
    private ApplicantStatus status;

}
