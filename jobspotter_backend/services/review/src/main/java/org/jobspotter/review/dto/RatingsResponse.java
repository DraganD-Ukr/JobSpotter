package org.jobspotter.review.dto;


import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class RatingsResponse {

    @Schema(description = "Total number of ratings left for user as a seeker. Example: 10 job posters gave ratings to this applicant, so count will be 10", example = "10", minContains = 0)
    private int seekerRatingCount;

    @Schema(description = "Total number of ratings left for user as a provider. Example: 8 applicants(that participated in job) gave ratings to this job poster, so count will be 8", example = "8", minContains = 0)
    private int providerRatingCount;

    @Schema(description = "Average global rating for user as a seeker with up to 2 decimal points. Example: 3 job posters gave ratings to this applicant(3.0, 4.0, 5.0), so average seeker rating will be 4.0", example = "4.0", minContains = 1, maxContains = 5)
    private double avgSeekerRating;

    @Schema(description = "Average global rating for user as a provider with up to 2 decimal points. Example: 3 applicants(that participated in job) gave ratings to this job poster(3.0, 4.0, 5.0), so average provider rating will be 4.0", example = "4.0", minContains = 1, maxContains = 5)
    private double avgProviderRating;

}
