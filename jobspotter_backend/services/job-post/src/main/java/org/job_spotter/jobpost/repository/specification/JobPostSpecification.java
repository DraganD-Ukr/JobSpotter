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
     * Filter job posts by distance and location from the user
     * uses the harvesine formula to calculate the distance between two points
     *
     * @param userLat  Latitude of the user
     * @param userLon  Longitude of the user
     * @param radiusKm Radius in km from which Job posts can be
     * @return Specification
     */
    //This filterByDistance method returns if the distance is present in the job post
    public static Specification<JobPost> filterByDistance(double userLat, double userLon, double radiusKm) {
        return (root, query, criteriaBuilder) -> {

            // Latitude and Longitude columns in the JobPost entity
            Expression<Double> lat = root.get("latitude");
            Expression<Double> lon = root.get("longitude");

            // Step 1: Convert latitude and longitude to radians
            Expression<Double> radUserLat = criteriaBuilder.function("radians", Double.class, criteriaBuilder.literal(userLat));
            Expression<Double> radUserLon = criteriaBuilder.function("radians", Double.class, criteriaBuilder.literal(userLon));
            Expression<Double> radJobPostLat = criteriaBuilder.function("radians", Double.class, lat);
            Expression<Double> radJobPostLon = criteriaBuilder.function("radians", Double.class, lon);

            // Step 2: Haversine formula components
            Expression<Double> deltaLat = criteriaBuilder.diff(radJobPostLat, radUserLat);
            Expression<Double> deltaLon = criteriaBuilder.diff(radJobPostLon, radUserLon);

            Expression<Double> sinDeltaLatDiv2 = criteriaBuilder.function("sin", Double.class, criteriaBuilder.prod(deltaLat, 0.5));
            Expression<Double> sinDeltaLonDiv2 = criteriaBuilder.function("sin", Double.class, criteriaBuilder.prod(deltaLon, 0.5));

            Expression<Double> a = criteriaBuilder.sum(
                    criteriaBuilder.prod(sinDeltaLatDiv2, sinDeltaLatDiv2),
                    criteriaBuilder.prod(
                            criteriaBuilder.prod(
                                    criteriaBuilder.function("cos", Double.class, radUserLat),
                                    criteriaBuilder.function("cos", Double.class, radJobPostLat)
                            ),
                            criteriaBuilder.prod(sinDeltaLonDiv2, sinDeltaLonDiv2)
                    )
            );

            // Step 3: Calculate distance: distance = 6371 * acos(sqrt(a))
            Expression<Double> sqrtA = criteriaBuilder.function("sqrt", Double.class, a);
            Expression<Double> acosA = criteriaBuilder.function("acos", Double.class, sqrtA); // acos(sqrt(a))

            Expression<Double> distance = criteriaBuilder.prod(
                    criteriaBuilder.literal(6371.0), // Earth's radius in km
                    acosA // acos(sqrt(a))
            );

            // Step 4: Log the computed distance for debugging
            System.out.println("Computed Distance: " + distance.toString());  // Log the distance formula
            System.out.println("Radius filter: " + radiusKm);  // Log the radius filter value

            // Step 5: Apply the radius filter (less than or equal to radius)
            return criteriaBuilder.lessThanOrEqualTo(distance, criteriaBuilder.literal(radiusKm));
        };
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
