package org.jobspotter.jobpost.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class AddressResponse {

    private String address;

    private Double latitude;

    private Double longitude;

}
