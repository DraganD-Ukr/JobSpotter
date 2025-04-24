package org.jobspotter.report.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import io.swagger.v3.oas.annotations.media.Schema;

import java.util.stream.Stream;

@Schema(description = "The status of a report")
public enum ReportStatus {
    OPEN("Open"),
    UNDER_REVIEW("Under Review"),
    PENDING_RESPONSE("Pending Response"),
    RESOLVED("Resolved"),
    REJECTED("Rejected"),
    ACTION_TAKEN("Action Taken"),
    ESCALATED("Escalated"),
    ON_HOLD("On Hold"),
    AUTO_RESOLVED("Auto Resolved");

    private final String displayName;

    ReportStatus(String displayName) {
        this.displayName = displayName;
    }

    @JsonValue  // Serialize using display name in JSON responses
    public String getDisplayName() {
        return displayName;
    }

    @JsonCreator  // Allow both enum name and display name in API input
    public static ReportStatus fromString(String value) {
        return Stream.of(ReportStatus.values())
                .filter(status -> status.name().equalsIgnoreCase(value) || status.displayName.equalsIgnoreCase(value))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("Invalid ReportStatus: " + value));
    }

}
