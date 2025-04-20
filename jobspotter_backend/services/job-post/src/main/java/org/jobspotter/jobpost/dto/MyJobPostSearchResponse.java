package org.jobspotter.jobpost.dto;

import lombok.*;
import org.jobspotter.jobpost.model.JobStatus;
import org.jobspotter.jobpost.model.Tag;

import java.time.LocalDateTime;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MyJobPostSearchResponse {

    private Long jobPostId;
    private Set<Tag> tags;
    private String title;
    private String description;
    private String address;
    private LocalDateTime datePosted;
    private LocalDateTime lastUpdatedAt;
    private int ApplicantsCount;
    private int maxApplicants;
    private JobStatus status;
}
