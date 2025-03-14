package org.job_spotter.jobpost.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class JobPostByCounty {
    private String county;
    private Long jobPostCount;
}
