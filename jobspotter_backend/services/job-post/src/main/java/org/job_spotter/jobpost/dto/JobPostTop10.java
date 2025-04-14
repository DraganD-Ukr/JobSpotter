package org.job_spotter.jobpost.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import org.job_spotter.jobpost.model.Tag;

import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
@AllArgsConstructor
public class JobPostTop10 {
    private Long jobPostId;
    private String title;
    private Set<Tag> tags = new HashSet<>();
    private String description;
    private String address;
    private Double longitude;
    private Double latitude;
    private int applicantsCount;
    private int maxApplicants;
    private String datePosted;
    private String lastUpdatedAt;
    private Long viewCount;

}
