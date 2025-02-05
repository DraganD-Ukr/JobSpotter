package org.jobspotter.user.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jobspotter.user.dto.deserializer.AddressTypeDeserializer;
import org.jobspotter.user.dto.deserializer.CountyDeserializer;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;

@Builder
@Setter
@Getter
public class AddressRequest {

    @NotBlank(message = "Street address cannot be blank")
    @Size(min = 5, max = 100, message = "Street address must be between 5 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÁÉÍÓÚáéíóú0-9' -]+$", message = "Only letters, numbers, spaces, hyphens, and apostrophes are allowed")
    private String streetAddress;

    @NotBlank(message = "City cannot be blank")
    @Size(min = 2, max = 50, message = "City name must be between 2 and 50 characters")
    @Pattern(regexp = "^[a-zA-ZÁÉÍÓÚáéíóú' -]+$", message = "Only letters, spaces, hyphens, and apostrophes are allowed")
    private String city;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "County is required")
    @JsonDeserialize(using = CountyDeserializer.class)
    private County county;

    @NotBlank(message = "Eir code cannot be blank")
    @Pattern(regexp = "^[A-Z0-9]{3} [A-Z0-9]{4}$", message = "Invalid eir code format")
    private String eirCode;

    @Enumerated(EnumType.STRING)
    @NotNull(message = "Address type is required")
    @JsonDeserialize(using = AddressTypeDeserializer.class)
    private AddressType addressType;

    private boolean isDefault;


}
