package org.jobspotter.report.repository.specification;

import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.CollectionUtils;
import org.bson.Document;
import lombok.extern.slf4j.Slf4j; // ADD SLF4J LOGGER

import java.util.Set;
import java.util.UUID;
import java.util.List;
import java.util.ArrayList;

@Slf4j // ADD SLF4J LOGGER ANNOTATION
public class ReportSpecification {

    public static Query createQuery(
            Set<ReportTag> tags,
            ReportStatus status,
            UUID reporterId,
            UUID reportedUserId,
            Long reportedJobPostId,
            Long reportedApplicantId,
            Long reportedReviewId
    ) {
        List<Document> criteriaDocuments = new ArrayList<>();

        Document tagsCriteriaDoc = logAndGetDocument("Tags Criteria", filterByTags(tags));
        if (tagsCriteriaDoc != null) criteriaDocuments.add(tagsCriteriaDoc);

        Document statusCriteriaDoc = logAndGetDocument("Status Criteria", filterByStatus(status));
        if (statusCriteriaDoc != null) criteriaDocuments.add(statusCriteriaDoc);

        Document reporterIdCriteriaDoc = logAndGetDocument("Reporter ID Criteria", filterByReporterId(reporterId));
        if (reporterIdCriteriaDoc != null) criteriaDocuments.add(reporterIdCriteriaDoc);

        Document reportedUserIdCriteriaDoc = logAndGetDocument("Reported User ID Criteria", filterByReportedUserId(reportedUserId));
        if (reportedUserIdCriteriaDoc != null) criteriaDocuments.add(reportedUserIdCriteriaDoc);

        Document reportedJobPostIdCriteriaDoc = logAndGetDocument("Reported Job Post ID Criteria", filterByReportedJobPostId(reportedJobPostId));
        if (reportedJobPostIdCriteriaDoc != null) criteriaDocuments.add(reportedJobPostIdCriteriaDoc);

        Document reportedApplicantIdCriteriaDoc = logAndGetDocument("Reported Applicant ID Criteria", filterByReportedApplicantId(reportedApplicantId));
        if (reportedApplicantIdCriteriaDoc != null) criteriaDocuments.add(reportedApplicantIdCriteriaDoc);

        Document reportedReviewIdCriteriaDoc = logAndGetDocument("Reported Review ID Criteria", filterByReportedReviewId(reportedReviewId));
        if (reportedReviewIdCriteriaDoc != null) criteriaDocuments.add(reportedReviewIdCriteriaDoc);


        Query query = new Query();
        if (!criteriaDocuments.isEmpty()) {
            query.addCriteria(Criteria.where("$and").is(criteriaDocuments));
        }

        log.info("Final criteriaDocuments List Size: {}", criteriaDocuments.size()); // LOG LIST SIZE
        log.info("Final criteriaDocuments List: {}", criteriaDocuments); // LOG LIST CONTENT

        return query;
    }

    // Helper method to convert Criteria to BSON Document and log it
    private static Document logAndGetDocument(String criteriaName, Criteria criteria) {
        if (criteria != null) {
            Document document = criteria.getCriteriaObject();
            log.info("Criteria Document for {}: {}", criteriaName, document.toJson()); // LOG EACH CRITERIA
            return document;
        } else {
            log.info("Criteria Document for {}: null (no criteria)", criteriaName); // LOG NULL CRITERIA
            return null;
        }
    }


    private static Criteria filterByTags(Set<ReportTag> tags) {
        if (!CollectionUtils.isEmpty(tags)) {
            return Criteria.where("reportTags").in(
                    tags.stream().map(Enum::name).toList() // Convert enums to their string values
            );
        }
        return null;
    }


    private static Criteria filterByStatus(ReportStatus status) {
        if (status != null) {
            return Criteria.where("reportStatus").is(status.toString());
        }
        return null;
    }

    private static Criteria filterByReporterId(UUID reporterId) {
        if (reporterId != null) {
            return Criteria.where("reporterId").is(reporterId);
        }
        return null;
    }

    private static Criteria filterByReportedUserId(UUID reportedUserId) {
        if (reportedUserId != null) {
            return Criteria.where("reportedUserId").is(reportedUserId);
        }
        return null;
    }

    private static Criteria filterByReportedJobPostId(Long reportedJobPostId) {
        if (reportedJobPostId != null) {
            return Criteria.where("reportedJobPostId").is(reportedJobPostId);
        }
        return null;
    }

    private static Criteria filterByReportedApplicantId(Long reportedApplicantId) {
        if (reportedApplicantId != null) {
            return Criteria.where("reportedApplicantId").is(reportedApplicantId);
        }
        return null;
    }

    private static Criteria filterByReportedReviewId(Long reportedReviewId) {
        if (reportedReviewId != null) {
            return Criteria.where("reportedReviewId").is(reportedReviewId);
        }
        return null;
    }
}