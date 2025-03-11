package org.jobspotter.report.repository;

import org.jobspotter.report.model.Report;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface ReportRepository extends MongoRepository<Report, String> {
    boolean existsByReporterIdAndReportedUserIdAndReportedJobPostIdAndReportedApplicantIdAndReportedReviewId(UUID reporterId, UUID reportedUserId, Long reportedJobPostId, Long reportedApplicantId, Long reportedReviewId);
}
