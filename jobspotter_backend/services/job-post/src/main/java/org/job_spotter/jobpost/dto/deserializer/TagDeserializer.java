package org.job_spotter.jobpost.dto.deserializer;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.exc.InvalidFormatException;
import com.fasterxml.jackson.databind.node.ArrayNode;
import org.job_spotter.jobpost.model.JobTagEnum;

import java.io.IOException;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class TagDeserializer extends JsonDeserializer<Set<JobTagEnum>> {
    @Override
    public Set<JobTagEnum> deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException {
        Set<JobTagEnum> tags = new HashSet<>();
        ArrayNode arrayNode = jsonParser.getCodec().readTree(jsonParser); // Read the JSON array

        // Iterate through the array and convert each item to the corresponding enum value
        Iterator<JsonNode> elements = arrayNode.elements();
        while (elements.hasNext()) {
            String tagString = elements.next().asText().toUpperCase(); // Convert to uppercase to match enum values
            try {
                tags.add(JobTagEnum.valueOf(tagString)); // Add the tag if it's valid
            } catch (IllegalArgumentException e) {
                // Handle invalid tag string here if needed

                String allowedValues = JobTagEnum.getAllEnumNames();

                throw new InvalidFormatException("Invalid value for Job Post Tags: '" + tagString + "'. Allowed values are: " + allowedValues, tagString, JobTagEnum.class);
            }
        }

        return tags;
    }
}
