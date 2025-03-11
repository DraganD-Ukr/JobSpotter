package org.jobspotter.report.controller;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.report.authUtils.JWTUtils;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.jobspotter.report.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    private final JWTUtils jwtUtils;
    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<Report> createReport(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody ReportRequest report
    ) throws Exception {

        UUID reporterId = JWTUtils.getUserIdFromToken(accessToken);

        log.info("Creating report: {}", report);

        reportService.generateReport(reporterId, report);

        return ResponseEntity.noContent().build();
    }


    @GetMapping("/search") // Changed endpoint path to /search for clarity
    public ResponseEntity<Page<Report>> searchReports(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(value = "tags", required = false) Set<@Valid ReportTag> tags, // Valid for enum values if provided
            @RequestParam(value = "status", required = false) @Valid ReportStatus status, // Valid for enum values if provided
            @RequestParam(value = "reporterId", required = false) @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", message = "Invalid UUID format provided for reporterId") String reporterId, // Validate UUID format if provided
            @RequestParam(value = "reportedUserId", required = false) @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", message = "Invalid UUID format provided for reportedUserId") String reportedUserId, // Validate UUID format if provided
            @RequestParam(value = "reportedJobPostId", required = false) @Positive(message = "reportedJobPostId must be a positive number") Long reportedJobPostId, // Must be positive if provided
            @RequestParam(value = "reportedApplicantId", required = false) @Positive(message = "reportedApplicantId must be a positive number") Long reportedApplicantId, // Must be positive if provided
            @RequestParam(value = "reportedReviewId", required = false) @Positive(message = "reportedReviewId must be a positive number") Long reportedReviewId, // Must be positive if provided
            @RequestParam(value = "page", defaultValue = "0") @Min(value = 0,message = "Page number must be positive(including 0)") int page, // Page must be non-negative
            @RequestParam(value = "size", defaultValue = "10") @Positive(message = "Size must be positive(including 0)") @Max(value = 100, message = "Max value for size is 100") int size // Size must be positive and max 100 (adjust max as needed)
    ) throws Exception {

        jwtUtils.hasAdminRole(accessToken);

        log.info("Finding reports for admin...");

        Page<Report> reports = reportService.searchReports(tags,
                status,
                reporterId == null ? null : UUID.fromString(reporterId) ,
                reportedUserId == null ? null : UUID.fromString(reportedUserId),
                reportedJobPostId,
                reportedApplicantId,
                reportedReviewId,
                page,
                size);

        return ResponseEntity.ok(reports);
    }




}
