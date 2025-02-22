package org.jobspotter.review.dto;


import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RatingsResponse {

    private int seekerRatingCount;

    private int providerRatingCount;

    private double avgSeekerRating;

    private double avgProviderRating;

}
