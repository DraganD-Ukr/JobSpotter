package org.jobspotter.review.model.specification;


import lombok.RequiredArgsConstructor;
import org.hibernate.Session;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.jobspotter.review.exception.InvalidRequestException;
import org.jobspotter.review.model.Review;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class ReviewSpecification implements ApplicationContextAware {

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        ReviewSpecification.applicationContext = applicationContext;
    }

    private static ApplicationContext applicationContext;
    private final EntityManager entityManager;

    /**
     * Filter reviews by the reviewed user id.
     * @param reviewedUserId Id of user who is reviewed
     * @return Specification
     */
    public static Specification<Review> hasReviewerId(UUID reviewedUserId) {
        return (root, query, criteriaBuilder) ->
        {
            if (StringUtils.hasText(reviewedUserId.toString())) {
                return criteriaBuilder.equal(root.get("reviewedUserId"), reviewedUserId);
            } else {
                throw new InvalidRequestException("Reviewer id is required!");
            }
        };
    }

    /**
     * Filter reviews by the reviewer role.
     * @param reviewerRole Reviewer role({@link org.jobspotter.review.model.ReviewerRole})
     * @return Specification
     */
    public static Specification<Review> hasReviewerRole(String reviewerRole) {
        return (root, query, criteriaBuilder) ->
        {
            if (StringUtils.hasText(reviewerRole)) {
                return criteriaBuilder.equal(root.get("reviewerRole"), reviewerRole);
            } else {
                throw new InvalidRequestException("Reviewer role is required!");
            }
        };
    }

    /**
     * Filter reviews by rating.
     * If both minRating and maxRating are provided, it will return reviews with ratings in between those values.
     * <p><p/>
     * If only minRating is not empty, it will return reviews with ratings greater than or equal to minRating.
     * If only maxRating is not empty, it will return reviews with ratings less than or equal to maxRating.
     * @param minRating Minimum rating of review
     * @param maxRating Maximum rating of review
     * @return Specification
     */
    public static Specification<Review> inBetweenRatings(Double minRating, Double maxRating) {
        return (root, query, criteriaBuilder) -> {

            if (minRating != null && maxRating != null) {
                return criteriaBuilder.between(root.get("rating"), minRating, maxRating);
            } else if (minRating != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), minRating);
            } else if (maxRating != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("rating"), maxRating);
            } else {
                return criteriaBuilder.conjunction(); // Match all if minRating and maxRating are null
            }

        };
    }


    /**
     * Filter reviews by date created. If both dateCreatedMin and dateCreatedMax are provided, it will return reviews created between those dates.
     * <p><p/>
     * If only dateCreatedMin is not empty, it will return reviews created after that date.
     * If only dateCreatedMax is not empty, it will return reviews created before that date.
     * @param dateCreatedMin minimum date created
     * @param dateCreatedMax maximum date created
     * @return Specification
     */
    public static Specification<Review> createdInBetweenDates(String dateCreatedMin, String dateCreatedMax) {
        return (root, query, criteriaBuilder) -> {

            if (StringUtils.hasText(dateCreatedMin) && StringUtils.hasText(dateCreatedMax)) {

                return criteriaBuilder.between(
                        root.get("dateCreated"),
                        convertStringToLocalDateTime(dateCreatedMin),
                        convertStringToLocalDateTime(dateCreatedMax)
                );

            } else if (dateCreatedMin != null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("dateCreated"), convertStringToLocalDateTime(dateCreatedMin));
            } else if (dateCreatedMax != null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("dateCreated"), convertStringToLocalDateTime(dateCreatedMax));
            } else {
                return criteriaBuilder.conjunction(); // Match all if startDate and endDate are not null and not empty
            }

        };
    }







    /**
     * Full-text search on the comment field.
     * @param comment The comment text to search for
     * @return Specification for full-text search
     */
    public static Specification<Review> fullTextSearchByComment(String comment) {

        return (root, query, criteriaBuilder) -> {
            if (!StringUtils.hasText(comment)) {
//                No filter if comment is empty
                return criteriaBuilder.conjunction();
            }

            EntityManager entityManager = applicationContext.getBean(EntityManager.class);
            // Get Hibernate Search session
            SearchSession searchSession = Search.session(unwrapEntityManager(entityManager));

            // Perform the search query and fetch the matching review IDs
            List<Long> matchingReviewIds = searchSession.search(Review.class)
                    .where(f -> f.match()
                            .field("comment")
                            .matching(comment)
                            .fuzzy(1)
                    )
                    .fetchHits(100) // Limit to 100 results
                    .stream()
                    .map(Review::getReviewId) // Assuming your Review entity has an `id` field
                    .toList();

            if (matchingReviewIds.isEmpty()) {
                return criteriaBuilder.disjunction();
            }

            // Filter results in JPA query based on matched IDs
            return root.get("reviewId").in(matchingReviewIds);
        };
    }

    private static Session unwrapEntityManager(EntityManager entityManager) {
        return entityManager.unwrap(Session.class);
    }




    private static LocalDateTime convertStringToLocalDateTime(String date) {
        try {
            return LocalDateTime.parse(date);
        } catch (Exception e) {
            throw new InvalidRequestException("Provided invalid date format : " + date);
        }

    }

    public static Specification<Review> filterReviewByParams(UUID reviewedUserId, String reviewerRole, Double minRating, Double maxRating, String dateCreatedMin, String dateCreatedMax, String query) {
        // Start with the reviewedUserId filter
        Specification<Review> spec = Specification.where(hasReviewerId(reviewedUserId));

        // Check if the query is not empty and apply full-text search filter
        if (StringUtils.hasText(query)) {
            Specification<Review> fullTextSpec = fullTextSearchByComment(query);

            // Apply the full-text search specification if the query is not empty
            spec = spec.and(fullTextSpec);
        } else {
            // If query is empty, we use an empty specification to ensure no results are matched
            spec = spec.and((root, query1, criteriaBuilder) -> criteriaBuilder.conjunction());
        }

        // Apply the rest of the filters directly without checking for null/empty
        spec = spec.and(hasReviewerRole(reviewerRole))
                .and(inBetweenRatings(minRating, maxRating))
                .and(createdInBetweenDates(dateCreatedMin, dateCreatedMax));

        return spec;
    }

}
