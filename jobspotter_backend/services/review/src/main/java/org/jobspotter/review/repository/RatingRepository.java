package org.jobspotter.review.repository;

import org.jobspotter.review.model.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating findByUserId(UUID reviewedUserId);

    @Query("""
        SELECT r.userId, 
               (r.seekerRatingSum / r.seekerRatingCount) AS averageRating, 
               r.seekerRatingCount 
        FROM Rating r 
        WHERE r.seekerRatingCount > 0
        ORDER BY (r.seekerRatingSum / r.seekerRatingCount) DESC
        LIMIT 10
    """)
    List<Object[]> findTop10RatedApplicants();


    @Query("""
        SELECT r.userId, 
               (r.providerRatingSum / r.providerRatingCount) AS averageRating, 
               r.providerRatingCount 
        FROM Rating r 
        WHERE r.providerRatingCount > 0
        ORDER BY (r.providerRatingCount / r.providerRatingCount) DESC
        LIMIT 10
    """)
    List<Object[]> findTop10RatedJobPosters();
}
