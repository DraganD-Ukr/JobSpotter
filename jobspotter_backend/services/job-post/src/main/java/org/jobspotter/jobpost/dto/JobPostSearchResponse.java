package org.jobspotter.jobpost.dto;

import lombok.*;
import org.jobspotter.jobpost.model.JobStatus;
import org.jobspotter.jobpost.model.Tag;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class JobPostSearchResponse {
    private Long jobPostId;
    private UUID jobPosterId;
    private Set<Tag> tags = new HashSet<>();
    private int applicantsCount;
    private String title;
    private String description;
    private String address;
    private Double longitude;
    private Double latitude;
    private Double relevantDistance;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private int maxApplicants;
    private JobStatus status;

}
