package org.jobspotter.jobpost.dto;

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
