package org.job_spotter.jobpost.dto;

import lombok.*;
import org.job_spotter.jobpost.model.JobStatus;
import org.job_spotter.jobpost.model.Tag;

import java.time.LocalDateTime;
import java.util.HashSet;
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
    private Set<Tag> tags = new HashSet<>();
    private Set<ApplicantResponse> applicants = new HashSet<>();
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
