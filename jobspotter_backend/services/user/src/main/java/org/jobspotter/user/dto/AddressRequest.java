package org.jobspotter.user.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;

@Builder
@Setter
@Getter
public class AddressRequest {

    @NotBlank(message = "Street address cannot be blank")
    @Size(min = 5, max = 100, message = "Street address must be between 5 and 100 characters")
    private String streetAddress;

    @NotBlank(message = "City cannot be blank")
    @Size(min = 2, max = 50, message = "City name must be between 2 and 50 characters")
    private String city;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "County is required")
    private County county;

    @Pattern(regexp = "^[A-Za-z0-9]{3} ?[A-Za-z0-9]{4}$", message = "Invalid eir code format")
    private String eirCode;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Address type is required")
    private AddressType addressType;

    private boolean isDefault;


}
