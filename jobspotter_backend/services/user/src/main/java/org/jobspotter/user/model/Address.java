package org.jobspotter.user.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Pattern;
import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "addresses")
public class Address {

    /**
     * The unique identifier for the address.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    /**
     * The user who owns the address.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    /**
     * Full address of the user. (e.g. 123 Fake Street, A00 B1C2)
     */
    @Column(nullable = false, length = 255)
    private String address;

    /**
     * The street address.
     */
    @Column(nullable = false, length = 100)
    private String streetAddress;

    /**
     * The city of the address.
     */
    @Column(nullable = false, length = 100)
    private String city;

    /**
     * The county of the address.
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private County county;

    /**
     * The postal code of the address.
     */
    @Pattern(regexp = "^[A-Za-z0-9]{3} ?[A-Za-z0-9]{4}$", message = "Invalid eir code format")
    private String eirCode;

    /**
     * The latitude of the address.
     */
    @Column
    private Double latitude;

    /**
     * The longitude of the address.
     */
    @Column
    private Double longitude;

    /**
     * The type of the address. User can have 3 addresses at most(HOME, WORK, OTHER).
     */
    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private AddressType addressType;  // Treating ENUM as String

    /**
     * The default address boolean of the user.
     */
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private boolean isDefault;

}
