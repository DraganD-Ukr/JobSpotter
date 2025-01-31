package org.job_spotter.jobpost.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "applicant")
public class Applicant {

    // The unique identifier for the applicant. generated automatically
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long applicantId;

    // The unique identifier for the job post. generated automatically

    @ManyToMany(mappedBy = "applicants")
    private List<JobPost> jobPost = new ArrayList<>();

    // The unique identifier for the user. generated automatically
    @Column(nullable = false)
    private Long userId;

    //message from the applicant
    @Column(length = 255)
    private String message;

    // The status of the applicant
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private ApplicantStatus status;

    // The date the applicant was applied
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime dateApplied;

    // The date the applicant was last updated
    @UpdateTimestamp
    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime dateUpdated;

}
