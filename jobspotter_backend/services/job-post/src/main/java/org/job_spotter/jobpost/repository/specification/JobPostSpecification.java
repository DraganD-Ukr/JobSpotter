package org.job_spotter.jobpost.repository.specification;

import jakarta.persistence.criteria.Expression;
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


    /**
     * Filter job posts by tags present in the job post
     * uses a list of tag names to filter the job posts
     * if either of the tags are present in the job post then it returns the job post
     *
     * @param tagNames List of tag names to filter the job posts
     * @return Specification
     */
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

    /**
     * Filter job posts by similar title or weather phrase is present in the job post title
     *
     * @param title Title from which the job post is to be filtered
     * @return Specification
     */
    //This has title method returns if the title is present in the job post
    public static Specification<JobPost> hasTitle(String title) {
        return (root, query, criteriaBuilder) ->
                StringUtils.hasText(title) ?
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), "%" + title.toLowerCase() + "%") :
                        criteriaBuilder.conjunction(); // Match all if title is null
    }

    /**

     Filter job posts by distance and location from the user
     uses the harvesine formula to calculate the distance between two points*
     @param userLat  Latitude of the user
     @param userLon  Longitude of the user
     @param radiusKm Radius in km from which Job posts can be
     @return Specification*/
//This filterByDistance method returns if the distance is present in the job post
    public static Specification<JobPost> filterByDistance(Double userLat, Double userLon, Double radiusKm) {
        return (root, query, criteriaBuilder) -> {
            if(userLat == null || userLon == null || radiusKm == null) {
                return criteriaBuilder.conjunction(); // Always true condition
            }
            Expression<Double> lat = root.get("latitude");
            Expression<Double> lon = root.get("longitude");

            Expression<Double> radUserLat = criteriaBuilder.function("radians", Double.class, criteriaBuilder.literal(userLat));
            Expression<Double> radUserLon = criteriaBuilder.function("radians", Double.class, criteriaBuilder.literal(userLon));
            Expression<Double> radJobPostLat = criteriaBuilder.function("radians", Double.class, lat);
            Expression<Double> radJobPostLon = criteriaBuilder.function("radians", Double.class, lon);

            Expression<Double> distanceExpr = criteriaBuilder.prod(
                    6371.0,
                    criteriaBuilder.function("acos", Double.class,
                            criteriaBuilder.sum(
                                    criteriaBuilder.prod(
                                            criteriaBuilder.function("cos", Double.class, radUserLat),
                                            criteriaBuilder.prod(
                                                    criteriaBuilder.function("cos", Double.class, radJobPostLat),
                                                    criteriaBuilder.function("cos", Double.class, criteriaBuilder.diff(radJobPostLon, radUserLon))
                                            )
                                    ),
                                    criteriaBuilder.prod(
                                            criteriaBuilder.function("sin", Double.class, radUserLat),
                                            criteriaBuilder.function("sin", Double.class, radJobPostLat)
                                    )
                            )
                    )
            );

            // To reflect ORDER BY distance ASC in SQL (optional, for sorting results if needed)
            assert query != null;
            query.orderBy(criteriaBuilder.asc(distanceExpr));

            return criteriaBuilder.lessThanOrEqualTo(distanceExpr, radiusKm);
        };
    }


    public static Specification<JobPost> isOpen() {
        return (root, query, criteriaBuilder) -> {
            // Join with applications table (assuming the relationship exists)
            return criteriaBuilder.equal(root.get("status"), "OPEN");
        };
    }

    public static Specification<JobPost> wasWorkedOnBy(UUID userId) {
        return (root, query, criteriaBuilder) -> {
            // Join with applications table (assuming the relationship exists)
            return criteriaBuilder.equal(root.join("applicants").get("userId"), userId);
        };
    }

    // Returns a specification that filters job posts by the job poster id
    public static Specification<JobPost> wasPostedBy(UUID userId) {
        return (root, query, criteriaBuilder) -> {
            // Join with applications table (assuming the relationship exists)
            return criteriaBuilder.equal(root.get("jobPosterId"), userId);
        };
    }

    /**
     * Filter job posts by the job poster id, title, tags, and status
     * Made for searching Job posts Created by a specific user
     *
     * @param userId    The job poster id
     * @param title    The title of the job post
     * @param tagNames The tags associated with the job post
     * @param status  The status of the job post
     * @return Specification
     */
    // Combine multiple filters into a single specification
    // Searching Job Posts By Job Poster id
    public static Specification<JobPost> filterByParams(UUID userId, String title,List<String> tagNames, String status) {
        return Specification.where(wasPostedBy(userId))
                .and(hasTitle(title))
                .and(hasTags(tagNames))
                .and(hasStatus(status));
    }

    /**
     * Filter job posts by the title, tags, and distance from the user
     * Made for searching Job posts by the user location
     *
     * @param title    The title of the job post
     * @param tagNames The tags associated with the job post
     * @param userLat  Latitude of the user
     * @param userLon  Longitude of the user
     * @param radiusKm Radius in km from which Job posts can be
     * @return Specification
     */
    // Combine multiple filters into a single specification
    // Searching Job Posts By User Location
    public static Specification<JobPost> filterByParams(String title, List<String> tagNames, Double userLat, Double userLon, Double radiusKm) {
        return Specification.where(isOpen())
                .and(hasTitle(title))
                .and(hasTags(tagNames))
                .and(filterByDistance(userLat, userLon, radiusKm));
    }

    /**
     * Filter job posts by the status, title, and user id
     * Made for searching Job posts the user worked on
     *
     * @param status The status of the job post
     * @param title  The title of the job post
     * @param userId The user id
     * @return Specification
     */
    // Combine multiple filters into a single specification
    // Searching Job Posts By User Id
    public static Specification<JobPost> filterByParams(String status, String title, UUID userId) {
        return Specification.where(wasWorkedOnBy(userId)) // Always filter by userId
                .and(hasStatus(status))
                .and(hasTitle(title));
    }

}
