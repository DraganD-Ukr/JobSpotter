package org.job_spotter.jobpost.repository.specification;

import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
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
// Create the specification to filter by tags
    public static Specification<JobPost> hasTags(List<String> tagNames) {
        return (root, query, criteriaBuilder) -> {
            if (tagNames == null || tagNames.isEmpty()) {
                return criteriaBuilder.conjunction(); // Always true if no tags are provided
            }

            // Join JobPost with Tag table
            Join<JobPost, Tag> tags = root.join("tags");

            // Return a predicate to check if the job has at least one of the specified tags
            return tags.get("name").in(tagNames);
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

            // Ensure the computed distance appears in SELECT list
            assert query != null;
            query.multiselect(root, distanceExpr);

            // Remove DISTINCT to allow ORDER BY to work
            query.distinct(false);

            // Order by distance
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


    public static Specification<JobPost> filterByParams(String title, List<String> tagNames, Double userLat, Double userLon, Double radiusKm) {
        return Specification.where(isOpen())
                .and(hasTitle(title))
                .and(hasTags(tagNames))
                .and(filterByDistance(userLat, userLon, radiusKm));
    }

    // Combine multiple filters into a single specification
    public static Specification<JobPost> filterByParams(String status, String title, UUID userId) {
        return Specification.where(wasWorkedOnBy(userId)) // Always filter by userId
                .and(hasStatus(status))
                .and(hasTitle(title));
    }

}
