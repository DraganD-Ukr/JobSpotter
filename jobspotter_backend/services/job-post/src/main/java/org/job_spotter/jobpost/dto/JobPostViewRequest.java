package org.job_spotter.jobpost.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;


//Currently only for initial view
@Getter
@AllArgsConstructor
@Builder
public class JobPostViewRequest {
    String Title;
    String Description;
    LocalDate DatePosted;
}
