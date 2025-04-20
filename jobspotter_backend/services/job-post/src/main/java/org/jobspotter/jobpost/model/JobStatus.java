package org.jobspotter.jobpost.model;

public enum JobStatus {
    OPEN,
    IN_PROGRESS,
    COMPLETED,
    CANCELLED;

    public static String getEnumValues() {
        StringBuilder enumValues = new StringBuilder();
        for (JobStatus jobStatus : JobStatus.values()) {
            enumValues.append(jobStatus.name()).append(", ");
        }
        return enumValues.substring(0, enumValues.length() - 2);
    }
}
