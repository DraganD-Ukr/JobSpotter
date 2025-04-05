package org.jobspotter.review.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class TopRatedUser {

    private UUID userId;
    private String firstName;
    private String lastName;
    private Double averageRating;
    private int numberOfReviews;

}
