package org.jobspotter.review.config;

import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class StartupEventListener {

    private final HibernateSearchIndexer hibernateSearchIndexer;

    public StartupEventListener(HibernateSearchIndexer hibernateSearchIndexer) {
        this.hibernateSearchIndexer = hibernateSearchIndexer;
    }

    @EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
    @Transactional // Ensures the EntityManager is available
    public void onApplicationReady() {
        hibernateSearchIndexer.buildIndex();
    }
}