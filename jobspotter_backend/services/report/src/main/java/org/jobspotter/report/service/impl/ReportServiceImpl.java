package org.jobspotter.report.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.repository.ReportRepository;
import org.jobspotter.report.service.ReportService;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Override
    public void generateReport(UUID reporterId, ReportRequest reportRequest) {

        if (reportRepository.existsByReporterIdAndReportedUserIdAndReportedJobPostIdAndReportedApplicantIdAndReportedReviewId(
                reporterId,
                reportRequest.getReportedUserId(),
                reportRequest.getReportedJobPostId(),
                reportRequest.getReportedApplicantId(),
                reportRequest.getReportedReviewId()
        )) {
            log.error("Report already exists for reporter: {}", reporterId);
            throw new IllegalArgumentException("Report already exists");
        }

        Report report = Report.builder()
                .reporterId(reporterId)
                .reportedUserId(reportRequest.getReportedUserId())
                .reportedJobPostId(reportRequest.getReportedJobPostId())
                .reportedApplicantId(reportRequest.getReportedApplicantId())
                .reportedReviewId(reportRequest.getReportedReviewId())
                .reportMessage(reportRequest.getReportMessage())
                .reportTags(reportRequest.getReportTags())
                .reportStatus(ReportStatus.OPEN)
                .build();

        log.info("Saving report: {}, reporter: {}", report, reporterId);
        reportRepository.save(report);

        log.info("Report from user with id {} saved successfully (Report id: {})", reporterId, report.getReportId());
    }





}
