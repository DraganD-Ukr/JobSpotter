package org.job_spotter.jobpost.dto;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TagDto {
    private Long tagId;
    private String name;
}