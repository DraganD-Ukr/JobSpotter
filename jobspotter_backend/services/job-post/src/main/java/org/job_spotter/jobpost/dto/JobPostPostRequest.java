package org.job_spotter.jobpost.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.job_spotter.jobpost.dto.deserializer.TagDeserializer;
import org.job_spotter.jobpost.model.JobTagEnum;

import java.util.Set;

@Getter
@Setter
public class JobPostPostRequest {


    //The tags associated with the job
    @Enumerated(EnumType.STRING)
    @JsonDeserialize(using = TagDeserializer.class)
    private Set<JobTagEnum> tags;

    @Size(min = 1, max = 255)
    private String title;

    @Size(min = 1, max = 255)
    private String description;

//    Id of address used to retrieve address from address service
    @Min(1)
    @Max(Long.MAX_VALUE)
    private Long addressId;

    //Maximum number of applicants that can apply for the job
    @Min(1)
    @Max(15)
    private int maxApplicants;


}
