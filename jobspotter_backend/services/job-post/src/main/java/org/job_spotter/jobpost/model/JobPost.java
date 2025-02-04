package org.job_spotter.jobpost.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "job_post")
public class JobPost {

    // The unique identifier for the job post. generated automatically
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long jobPostId;

    //User who posted the job we get from user service through endpoint
    //request
    @Column(nullable = false, updatable = false)
    private UUID jobPosterId;

    //The tags associated with the job

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "jobpost_tag", // Name of the join table
            joinColumns = @JoinColumn(name = "jobPostId"), // Foreign key column for JobPost
            inverseJoinColumns = @JoinColumn(name = "tagId") // Foreign key column for Tag
    )
    private Set<Tag> tags = new HashSet<>();

    //The applicants who applied for the job
    @ManyToMany
    @JoinTable(
            name = "jobpost_applicant", // Name of the join table
            joinColumns = @JoinColumn(name = "jobPostId"), // Foreign key column for JobPost
            inverseJoinColumns = @JoinColumn(name = "applicantId") // Foreign key column for Applicant
    )
    private Set<Applicant> applicants = new HashSet<>();

    //Title of the job
    @Column(nullable = false, length = 255)
    private String title;

    //Description of the job
    @Column(nullable = false, length = 255)
    private String description;

    //full address of the job
    @Column(nullable = false, length = 255)
    private String address;

    //Longitude and latitude of the job
    @Column(nullable = false)
    private Double longitude;

    @Column(nullable = false)
    private Double latitude;

    //Date the job was posted
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime datePosted;

    //Date the job was last updated
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime lastUpdatedAt;

    //maximum number of applicants that can apply for the job
    @Column(nullable = false)
    private int maxApplicants;

    //status of the job
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private JobStatus status;



}
