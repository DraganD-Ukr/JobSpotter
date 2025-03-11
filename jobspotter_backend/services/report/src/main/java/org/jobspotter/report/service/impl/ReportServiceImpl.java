package org.jobspotter.report.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.repository.ReportRepository;
import org.jobspotter.report.service.ReportService;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReportServiceImpl implements ReportService {

    private final ReportRepository reportRepository;

    @Override
    public void generateReport(ReportRequest reportRequest) {

        Report report = Report.builder()
                .reporterId(reportRequest.getReporterId())
                .reportedUserId(reportRequest.getReportedUserId())
                .reportedJobPostId(reportRequest.getReportedJobPostId())
                .reportedApplicantId(reportRequest.getReportedApplicantId())
                .reportedReviewId(reportRequest.getReportedReviewId())
                .reportMessage(reportRequest.getReportMessage())
                .reportTags(reportRequest.getReportTags())
                .reportStatus(ReportStatus.OPEN)
                .build();

        log.info("Saving report: {}, reporter: {}", report, reportRequest.getReporterId());
        reportRepository.save(report);

        log.info("Report from user with id {} saved successfully (Report id: {})", reportRequest.getReporterId(), report.getReportId());
    }





}
