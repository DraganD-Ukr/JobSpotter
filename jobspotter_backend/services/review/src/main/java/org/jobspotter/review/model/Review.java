package org.jobspotter.review.model;


import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.TimeZoneStorage;
import org.hibernate.annotations.TimeZoneStorageType;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
@Entity
public class Review {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long reviewId;

    @NotNull
    private UUID reviewerId;

    @NotNull
    private UUID reviewedUserId;

    @NotNull
    private Long jobPostId;

    @NotNull
    @Enumerated(EnumType.STRING)
    private ReviewerRole reviewerRole;

    @DecimalMin("1.0")
    @DecimalMax("5.0")
    @Column(nullable = false, precision = 2)
    private Double rating;

    @Column(length = 450)
    private String comment;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateCreated;


    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime dateUpdated;

}
