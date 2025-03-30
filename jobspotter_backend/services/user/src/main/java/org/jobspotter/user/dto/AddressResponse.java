package org.jobspotter.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;
import java.util.UUID;

/**
 * Address response DTO.
 */
@Getter
@Setter
@Builder
public class AddressResponse {

    /**
     * The unique identifier for the address.
     */
    private Long addressId;


    /**
     * The user id who owns the address.
     */
    private UUID userId;

    /**
     * Full address of the user. (e.g. 123 Fake Street, A00 B1C2)
     */
    private String address;

    /**
     * The street address.
     */
    private String streetAddress;

    /**
     * The city of the address.
     */
    private String city;

    /**
     * The county of the address.
     */
    private County county;

    /**
     * The eir code of the address.
     */
    private String eirCode;

    /**
     * The latitude of the address.
     */
    private Double latitude;

    /**
     * The longitude of the address.
     */
    private Double longitude;

    /**
     * The address type.
     */
    private AddressType addressType;  // Treating ENUM as String

    /**
     * Is default address.
     */
    private boolean isDefault;

}
