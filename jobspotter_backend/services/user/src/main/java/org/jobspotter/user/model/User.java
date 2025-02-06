package org.jobspotter.user.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
@EqualsAndHashCode
@Entity
@Table(name = "users")
public class User {

    /**
     * The unique identifier for the user.
     */
    @Id
    @Column(updatable = false)
    private UUID userId;

    @Column(nullable = false, unique = true, length = 100)
    private String username;

    /**
     * The first name of the user.
     */
    @Column(nullable = false, length = 100)
    private String firstName;

    /**
     * The last name of the user.
     */
    @Column(nullable = false, length = 100)
    private String lastName;

    /**
     * The email address of the user.
     */
    @Column(nullable = false, unique = true, length = 255)
    @Email
    private String email;

    /**
     * The phone number of the user.
     */
    @Column(length = 10)
    @Pattern(regexp = "^(?<prefix>08[3-9])(?<subscriber>[0-9]{7})$", message = "Invalid phone number format")
    private String phoneNumber;

    /**
     * About section of user
     */
    @Column(length = 255)
    private String about;

    /**
     * The timestamp when the user was created. It is set automatically when a new user is created.
     */
    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private LocalDateTime createdAt;

    /**
     * The timestamp when the user was last updated. It is set automatically when a user is updated.
     */
    @UpdateTimestamp
    @Column(nullable = false)
    private LocalDateTime lastUpdatedAt;

    @Column(nullable = false)
    private UserType userType;

    /**
     * The list of addresses associated with the user.
     */
    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Address> addresses = new ArrayList<>();


}
