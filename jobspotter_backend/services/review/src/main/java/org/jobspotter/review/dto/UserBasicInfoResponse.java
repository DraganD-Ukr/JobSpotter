package org.jobspotter.review.dto;

import lombok.*;

import java.util.UUID;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserBasicInfoResponse {

    private UUID userId;

    private String username;

    private String firstName;

    private String lastName;


}
