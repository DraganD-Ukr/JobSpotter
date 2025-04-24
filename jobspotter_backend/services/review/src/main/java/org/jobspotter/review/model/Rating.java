package org.jobspotter.review.model;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.UUID;


@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Rating {


    @Id
    private UUID userId;


//Setting the default value of the rating sums and counts to 0.0
    @Min(0)
    private Double seekerRatingSum = 0.0;

    @Min(0)
    private Integer seekerRatingCount = 0;

    @Min(0)
    private Double providerRatingSum = 0.0;

    @Min(0)
    private Integer providerRatingCount = 0;


}
