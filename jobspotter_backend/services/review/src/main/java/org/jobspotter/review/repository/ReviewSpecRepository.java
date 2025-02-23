package org.jobspotter.review.repository;

import org.jobspotter.review.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewSpecRepository extends JpaRepository<Review, Long>, JpaSpecificationExecutor<Review> {

}
