package org.jobspotter.jobpost.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagId;

    //Many to many relationship with job post
    @JsonIgnore
    @ManyToMany(mappedBy = "tags")
    private Set<JobPost> jobPosts = new HashSet<>();

    @Column(nullable = false, length = 30, updatable = false, unique = true)
    private String name;


}
