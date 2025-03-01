package org.job_spotter.jobpost.config;

import jakarta.persistence.EntityManager;
import org.hibernate.Session;
import org.hibernate.search.mapper.orm.Search;
import org.hibernate.search.mapper.orm.session.SearchSession;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Component
@Service
public class HibernateSearchIndexer {

    private final EntityManager entityManager;

    public HibernateSearchIndexer(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Transactional // Ensure transactional context
    public void buildIndex() {
        try {
            SearchSession searchSession = Search.session((Session) entityManager);
            searchSession.massIndexer().startAndWait();
            System.out.println("Hibernate Search indexing completed successfully.");
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            System.err.println("Error occurred during indexing: " + e.getMessage());
        }
    }
}