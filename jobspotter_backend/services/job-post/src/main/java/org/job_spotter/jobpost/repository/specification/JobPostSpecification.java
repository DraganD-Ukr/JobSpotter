package org.job_spotter.jobpost.repository.specification;

import jakarta.persistence.EntityManager;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.Expression;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Predicate;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.Session;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.model.Tag;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.UUID;

@Slf4j
@Component
public class JobPostSpecification implements ApplicationContextAware {

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        JobPostSpecification.applicationContext = applicationContext;
    }
    private static ApplicationContext applicationContext;


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
     * Filter job posts by title present in the job post
     * uses the title to filter the job posts
     * if the title is present in the job post then it returns the job post
     * Contains full text search
     *
     * @param title Title to filter the job posts
     * @return Specification
     */
    //This has title method returns if the title is present in the job post
    public static Specification<JobPost> hasTitle(String title) {
        return (root, query, criteriaBuilder) -> {

            //annul the condition if the title is not present (Like just sating if(True))
            if(!StringUtils.hasText(title)) {
                criteriaBuilder.conjunction(); // Always true condition
            }

            //Gets entity manager from the application context
            EntityManager entityManager = applicationContext.getBean(EntityManager.class);

            //Create a search session from the entity manager
            SearchSession searchSession = Search.session(unwrapEntityManager(entityManager));

            List<Long> jobPostIds = searchSession.search(JobPost.class)

                    //Search for the title in the job post
                    .where(f -> f.match()
                            .field("title")
                            .matching(title)
                            .fuzzy(1)
                    )

                    //Fetch hits returns list of How many Likely Results
                    .fetchHits(100)

                    //Map the job post id to a list.Using stream to work with the Collection
                    .stream()
                    .map(JobPost::getJobPostId)

                    //Collect the results to a list
                    .toList();

            //Return a disjunction if the job post ids are empty
            if(jobPostIds.isEmpty()) {
                return criteriaBuilder.disjunction(); // Always true condition
            }

            //Return the job post id if the title is present in the job post
            return root.get("jobPostId").in(jobPostIds);
        };


    }

    //Helper method to has title
    private static Session unwrapEntityManager(EntityManager entityManager) {
        return entityManager.unwrap(Session.class);
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
    public static Specification<JobPost> filterByParamsJobWorkedOn(String status, String title, UUID userId) {
        return Specification.where(wasWorkedOnBy(userId)) // Always filter by userId
                .and(hasTitle(title))
                .and(hasStatus(status));
    }

}
