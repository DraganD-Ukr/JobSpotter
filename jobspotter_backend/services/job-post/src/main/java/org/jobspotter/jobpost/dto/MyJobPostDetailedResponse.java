package org.jobspotter.jobpost.dto;
import lombok.*;
import org.jobspotter.jobpost.model.JobStatus;
import org.jobspotter.jobpost.model.Tag;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MyJobPostDetailedResponse {

    private Long jobPostId;
    private UUID jobPosterId; // Subject to change
    private Set<Tag> tags;
    private List<ApplicantDetailedResponse> applicants;
    private String title;
    private String description;
    private String address;
    private Double longitude;
    private Double latitude;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private int maxApplicants;
    private JobStatus status;

}
