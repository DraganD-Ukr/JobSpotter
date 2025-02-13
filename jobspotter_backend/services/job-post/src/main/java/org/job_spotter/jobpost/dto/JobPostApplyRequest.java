package org.job_spotter.jobpost.dto;


import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JobPostApplyRequest {

    @Size(max = 255)
    private String message;

}
