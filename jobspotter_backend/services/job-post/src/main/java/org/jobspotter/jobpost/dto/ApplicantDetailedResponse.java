package org.jobspotter.jobpost.dto;
import lombok.*;
import org.jobspotter.jobpost.model.ApplicantStatus;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ApplicantDetailedResponse {

    @EqualsAndHashCode.Include
    private UUID userId;
    private Long applicantId;
    private String firstName;
    private String lastName;
    private String ratingCount;
    private String ratingAverage;
    private String message;
    private ApplicantStatus status;
    private LocalDateTime dateApplied;
    private LocalDateTime dateUpdated;

}

