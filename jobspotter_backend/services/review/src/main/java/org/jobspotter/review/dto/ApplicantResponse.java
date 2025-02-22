package org.jobspotter.review.dto;

import lombok.*;

import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ApplicantResponse {

    @EqualsAndHashCode.Include
    private UUID userId;

    private Long applicantId;

    private String username;

    private String firstName;

    private String lastName;

    private String status;


}
