package org.job_spotter.jobpost.dto.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import org.job_spotter.jobpost.model.ApplicantStatus;

import java.io.IOException;

public class ApplicantStatusDeserializer extends JsonDeserializer<ApplicantStatus> {

    @Override
    public ApplicantStatus deserialize(JsonParser p, DeserializationContext ctxt) throws IOException {
        String statusString = p.getText().toUpperCase(); // Convert to uppercase

        try {
            // Check if the status is either ACCEPTED or REJECTED.  No need for a Set here.
            if (statusString.equals(ApplicantStatus.ACCEPTED.name()) || statusString.equals(ApplicantStatus.REJECTED.name())) {
                return ApplicantStatus.valueOf(statusString);
            } else {
                String allowedValues = ApplicantStatus.ACCEPTED.name() + ", " + ApplicantStatus.REJECTED.name();
                throw new InvalidFormatException("Invalid value for ApplicantStatus: '" + statusString + "'. Allowed values are: " + allowedValues, statusString, ApplicantStatus.class);
            }
        } catch (IllegalArgumentException e) {
            String allowedValues = ApplicantStatus.ACCEPTED.name() + ", " + ApplicantStatus.REJECTED.name();
            throw new InvalidFormatException("Invalid value for ApplicantStatus: '" + statusString + "'. Allowed values are: " + allowedValues, statusString, ApplicantStatus.class);
        }
    }
}