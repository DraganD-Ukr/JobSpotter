package org.jobspotter.report.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.report.authUtils.JWTUtils;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/reports")
public class ReportController {

    public JWTUtils jwtUtils;
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



}
