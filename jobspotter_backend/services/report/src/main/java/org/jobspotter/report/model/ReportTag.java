package org.jobspotter.report.model;


import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "The report tags")
public enum ReportTag {
    HARASSMENT,
    SPAM,
    INAPPROPRIATE_CONTENT,
    MISINFORMATION,
    POLICY_VIOLATION,
    OTHER
}