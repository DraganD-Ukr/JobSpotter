package org.jobspotter.jobpost.dto;

import lombok.*;
import org.jobspotter.jobpost.model.JobStatus;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobPostDetailedResponse {

    private Long jobPostId;
    private UUID jobPosterId;
    private Set<TagDto> tags = new HashSet<>();
    private String title;
    private String description;
    private String address;
    private Double longitude;
    private Double latitude;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private int applicantsCount;
    private int maxApplicants;
    private JobStatus status;

}
