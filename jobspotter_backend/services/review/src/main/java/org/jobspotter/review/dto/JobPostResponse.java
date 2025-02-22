package org.jobspotter.review.dto;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobPostResponse {

    private Long jobPostId;
    private UUID jobPosterId;
    private Set<ApplicantResponse> applicants;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private String status;

}
