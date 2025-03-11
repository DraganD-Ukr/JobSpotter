package org.jobspotter.report.service.impl;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.exception.ResourceAlreadyExistsException;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.jobspotter.report.repository.ReportRepository;
import org.jobspotter.report.repository.specification.ReportSpecification;
import org.jobspotter.report.service.ReportService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@Service
public class ReportServiceImpl implements ReportService {


    private final MongoTemplate mongoTemplate;
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
            throw new ResourceAlreadyExistsException("Report already exists!");
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

    @Override
    public Page<Report> searchReports(Set<ReportTag> tags, ReportStatus status, UUID reporterId, UUID reportedUserId, Long reportedJobPostId, Long reportedApplicantId, Long reportedReviewId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Query query = ReportSpecification.createQuery(
                tags,
                status,
                reporterId,
                reportedUserId,
                reportedJobPostId,
                reportedApplicantId,
                reportedReviewId
        );

        log.info("MongoDB Query JSON: {}", query.getQueryObject().toJson());
        long totalCount = mongoTemplate.count(query, Report.class);
        query.skip(pageable.getOffset());
        query.limit(pageable.getPageSize());

        List<Report> reportList = mongoTemplate.find(query, Report.class);

        return new PageImpl<>(reportList, pageable, totalCount);
    }


}
