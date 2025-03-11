package org.jobspotter.report.repository.specification;

import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.CollectionUtils;

import java.util.Set;
import java.util.UUID;

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
        Criteria criteria = combineCriteria(
                filterByTags(tags),
                filterByStatus(status),
                filterByReporterId(reporterId),
                filterByReportedUserId(reportedUserId),
                filterByReportedJobPostId(reportedJobPostId),
                filterByReportedApplicantId(reportedApplicantId),
                filterByReportedReviewId(reportedReviewId)
        );

        Query query = new Query();
        if (criteria != null) { // Only add criteria if it's not null (meaning at least one filter is applied)
            query.addCriteria(criteria);
        }
        return query;
    }

    private static Criteria combineCriteria(Criteria... criteriaList) {
        Criteria combinedCriteria = new Criteria();
        boolean criteriaAdded = false;

        for (Criteria criteria : criteriaList) {
            if (criteria != null) {
                if (!criteriaAdded) {
                    combinedCriteria = criteria; // First criteria becomes the base
                    criteriaAdded = true;
                } else {
                    combinedCriteria.andOperator(criteria); // Subsequent criteria are ANDed
                }
            }
        }

        return criteriaAdded ? combinedCriteria : null; // Return null if no criteria were added
    }


    private static Criteria filterByTags(Set<ReportTag> tags) {
        if (!CollectionUtils.isEmpty(tags)) {
            return Criteria.where("reportTags").in(tags);
        }
        return null;
    }

    private static Criteria filterByStatus(ReportStatus status) {
        if (status != null) {
            return Criteria.where("type").is(status); // Assuming your Report entity has 'type' field for status, if not change to 'status' if that's the field name
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
