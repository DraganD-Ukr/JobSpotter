package org.job_spotter.jobpost.dto;

import lombok.*;
import org.job_spotter.jobpost.model.JobStatus;
import org.job_spotter.jobpost.model.Tag;

import java.time.LocalDateTime;
import java.util.Set;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobPostsUserWorkedOnResponse {

    private Long jobPostId;
    private Set<Tag> tags;
    private int applicantsCount;
    private String title;
    private String description;
    private String address;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private int maxApplicants;
    private JobStatus status;

}
