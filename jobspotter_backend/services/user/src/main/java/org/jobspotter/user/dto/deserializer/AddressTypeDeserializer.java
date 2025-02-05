package org.jobspotter.user.dto.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.jobspotter.user.model.AddressType;
import org.jobspotter.user.model.County;

import java.io.IOException;
import java.util.Arrays;

public class AddressTypeDeserializer extends JsonDeserializer<AddressType> {

    @Override
    public AddressType deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException {

        String value = jp.getText();

        try {
            // Try to match the value with the enum constants
            return AddressType.valueOf(value);
        } catch (IllegalArgumentException e) {
            // If the value is not valid, throw a custom exception without default message
            String allowedValues = Arrays.toString(County.values());
            throw new InvalidFormatException(
                    "Invalid value for Address Type: '" + value + "'. Allowed values are: " + allowedValues, value, AddressType.class
            );
        }
    }

}
