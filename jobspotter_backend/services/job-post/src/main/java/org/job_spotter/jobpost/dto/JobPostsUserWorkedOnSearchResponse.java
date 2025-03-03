package org.job_spotter.jobpost.dto;

import lombok.*;
import org.job_spotter.jobpost.model.ApplicantStatus;
import org.job_spotter.jobpost.model.JobStatus;
import org.job_spotter.jobpost.model.Tag;

import java.time.LocalDateTime;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobPostsUserWorkedOnSearchResponse {

    private Long jobPostId;
    private Set<Tag> tags;
    private String title;
    private String description;
    private String address;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private int applicantsCount;
    private int maxApplicants;
    private ApplicantStatus applicantStatus;
    private LocalDateTime dateApplied;
    private LocalDateTime lastApplicantStatusChange;
    private JobStatus status;

}
