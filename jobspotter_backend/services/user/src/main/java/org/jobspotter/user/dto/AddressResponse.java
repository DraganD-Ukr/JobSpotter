package org.jobspotter.user.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;
import java.util.UUID;


@Getter
@Setter
@Builder
public class AddressResponse {


    private Long addressId;

    private UUID userId;

    private String address;

    private String streetAddress;

    private String city;

    private County county;

    private String eirCode;

    private Double latitude;

    private Double longitude;

    private AddressType addressType;  // Treating ENUM as String

    private boolean isDefault;

}
