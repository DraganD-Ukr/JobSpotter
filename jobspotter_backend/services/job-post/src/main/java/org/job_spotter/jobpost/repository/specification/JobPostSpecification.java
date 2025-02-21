package org.job_spotter.jobpost.repository.specification;

import jakarta.persistence.criteria.Join;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.model.Tag;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Slf4j
public class JobPostSpecification {

    //This has status method returns if the status is present in the job post
    public static Specification<JobPost> hasStatus(String status) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(status) ?
                        criteriaBuilder.equal(root.get("status"), status) :
                        criteriaBuilder.conjunction(); // Match all if status is null
    }


    //This has tags method returns if the either of the tags are present in the job post
    public static Specification<JobPost> hasTags(List<String> tagNames) {
        return (root, query, criteriaBuilder) -> {
            if (tagNames == null || tagNames.isEmpty()) {
                return criteriaBuilder.conjunction(); // Always true condition
            }

            // Ensure distinct job posts
            query.distinct(true);

            // Join JobPost with Tag table
            Join<JobPost, Tag> tags = root.join("tags");

            // Create a predicate for each tag name and combine them with OR
            return tagNames.stream()
                    .map(tagName -> criteriaBuilder.equal(criteriaBuilder.lower(tags.get("name")), tagName.toLowerCase()))
                    .reduce(criteriaBuilder::or)
                    .orElse(criteriaBuilder.conjunction());
        };
    }

    //This has title method returns if the title is present in the job post
    public static Specification<JobPost> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(title) ?
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%") :
                        criteriaBuilder.conjunction(); // Match all if title is null
    }


    public static Specification<JobPost> wasWorkedOnBy(UUID userId) {
        return (root, query, criteriaBuilder) -> {
            // Join with applications table (assuming the relationship exists)
            return criteriaBuilder.equal(root.join("applicants").get("userId"), userId);
        };
    }

    // Combine multiple filters into a single specification
    public static Specification<JobPost> filterByParams(String status, String title, UUID userId) {
        return Specification.where(wasWorkedOnBy(userId)) // Always filter by userId
                .and(hasStatus(status))
                .and(hasTitle(title));
    }

}
