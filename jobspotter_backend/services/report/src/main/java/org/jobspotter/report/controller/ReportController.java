package org.jobspotter.report.controller;

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


    @GetMapping
    public ResponseEntity<Page<Report>> searchReports(
            @RequestHeader("Authorization") String accessToken,

            @RequestParam(value = "tags", required = false)Set<ReportTag> tags,
            @RequestParam(value = "status", required = false) ReportStatus status,
            @RequestParam(value = "reporterId", required = false) UUID reporterId,
            @RequestParam(value = "reportedUserId", required = false) UUID reportedUserId,
            @RequestParam(value = "reportedJobPostId", required = false) Long reportedJobPostId,
            @RequestParam(value = "reportedApplicantId", required = false) Long reportedApplicantId,
            @RequestParam(value = "reportedReviewId", required = false) Long reportedReviewId,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) throws Exception {

        jwtUtils.hasAdminRole(accessToken);

        log.info("Finding reports for admin...");

        Page<Report> reports = reportService.searchReports(tags,
                status,
                reporterId,
                reportedUserId,
                reportedJobPostId,
                reportedApplicantId,
                reportedReviewId,
                page,
                size);

        return ResponseEntity.ok(reports);
    }




}
