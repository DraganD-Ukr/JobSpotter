package org.jobspotter.report.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.report.authUtils.JWTUtils;
import org.jobspotter.report.dto.ErrorResponse;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportSortByField;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.jobspotter.report.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
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

    //Search job posts using query parameters 'title', 'tag' , 'latitude' , 'longitude' , 'radius' and 'page' and 'size'
    @Operation(
            summary = "Create report",
            description = "Create a report for a user, job post, applicant or review"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Report created successfully", content = {@Content}),
            @ApiResponse(responseCode = "400", description = "Bad request", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "401", description = "Unauthorized", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "403", description = "Forbidden", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "409", description = "Conflict", content = @Content(schema = @Schema(implementation = ErrorResponse.class))),
            @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(schema = @Schema(implementation = ErrorResponse.class)))
    })
    @PostMapping
    public ResponseEntity<HttpStatus> createReport(
            @RequestHeader("Authorization") String accessToken,
            @RequestBody ReportRequest report
    ) throws Exception {

        UUID reporterId = JWTUtils.getUserIdFromToken(accessToken);

        log.info("Creating report: {}", report);

        reportService.generateReport(reporterId, report);

        return ResponseEntity.noContent().build();
    }


    //Search job posts using query parameters 'title', 'tag' , 'latitude' , 'longitude' , 'radius' and 'page' and 'size'
    @Operation(
            summary = "Search reports",
            description = "Search reports using query parameters 'tags', 'status', 'reporterId', 'reportedUserId', 'reportedJobPostId', 'reportedApplicantId', 'reportedReviewId', 'page' and 'size'"
    )
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully searched reports",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Report.class))
            ),
            @ApiResponse(responseCode = "400", description = "Bad request",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "403", description = "Forbidden",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            ),
            @ApiResponse(responseCode = "500", description = "Internal server error",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = ErrorResponse.class))
            )
    })
    @GetMapping("/search") // Changed endpoint path to /search for clarity
    public ResponseEntity<Page<Report>> searchReports(
            @RequestHeader("Authorization") String accessToken,
            @RequestParam(value = "tags", required = false) Set<@Valid ReportTag> tags, // Valid for enum values if provided
            @RequestParam(value = "status", required = false) @Valid ReportStatus status, // Valid for enum values if provided
            @RequestParam(value = "reporterId", required = false) @Schema(description = "Reported Id") @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", message = "Invalid UUID format provided for reporterId") String reporterId, // Validate UUID format if provided
            @RequestParam(value = "reportedUserId", required = false) @Schema(description = "Reported User Id") @Pattern(regexp = "^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$", message = "Invalid UUID format provided for reportedUserId") String reportedUserId, // Validate UUID format if provided
            @RequestParam(value = "reportedJobPostId", required = false) @Schema(description = "Reported Job Post Id") @Positive(message = "reportedJobPostId must be a positive number") Long reportedJobPostId, // Must be positive if provided
            @RequestParam(value = "reportedApplicantId", required = false) @Schema(description = "Reported Applicant Id") @Positive(message = "reportedApplicantId must be a positive number") Long reportedApplicantId, // Must be positive if provided
            @RequestParam(value = "reportedReviewId", required = false) @Schema(description = "Reported Review Id") @Positive(message = "reportedReviewId must be a positive number") Long reportedReviewId, // Must be positive if provided
            @RequestParam(value = "page", defaultValue = "0") @Schema(description = "Page of results") @Min(value = 0,message = "Page number must be positive(including 0)") int page, // Page must be non-negative
            @RequestParam(value = "size", defaultValue = "10") @Schema(description = "Number of results to return on page") @Positive(message = "Size must be positive(including 0)") @Max(value = 100, message = "Max value for size is 100") int size, // Size must be positive and max 100 (adjust max as needed),
            @RequestParam(value = "sort", required = false, defaultValue = "createdAt") ReportSortByField sortBy,
            @RequestParam(value = "isAsc", required = false, defaultValue = "true") boolean sortDirection
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
                size,
                sortBy,
                sortDirection);

        return ResponseEntity.ok(reports);
    }




}
