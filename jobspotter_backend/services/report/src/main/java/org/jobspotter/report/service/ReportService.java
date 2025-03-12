package org.jobspotter.report.service;

import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportSortByField;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.springframework.data.domain.Page;

import java.util.Set;
import java.util.UUID;

public interface ReportService {

    void generateReport(UUID reporterId, ReportRequest reportRequest);

    Page<Report> searchReports(Set<ReportTag> tags, ReportStatus status, UUID reporterId, UUID reportedUserId, Long reportedJobPostId, Long reportedApplicantId, Long reportedReviewId, int page, int size, ReportSortByField sortBy, boolean isAsc);

    void updateReportStatus(String reportId, ReportStatus status);
}
