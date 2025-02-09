package org.job_spotter.jobpost.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AddressResponse {

    private String address;

    private Double latitude;

    private Double longitude;

}
