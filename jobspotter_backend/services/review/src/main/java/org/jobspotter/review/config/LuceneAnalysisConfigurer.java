package org.jobspotter.review.config;

import lombok.extern.slf4j.Slf4j;
import org.apache.lucene.analysis.core.LowerCaseFilterFactory;
import org.apache.lucene.analysis.standard.StandardTokenizerFactory;
import org.apache.lucene.analysis.synonym.SynonymGraphFilterFactory;
import org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurationContext;
import org.springframework.context.annotation.Configuration;

@Slf4j
@Configuration
public class LuceneAnalysisConfigurer implements org.hibernate.search.backend.lucene.analysis.LuceneAnalysisConfigurer {



    @Override
    public void configure(LuceneAnalysisConfigurationContext context) {
        log.info("LuceneAnalysisConfigurer.configure() method is being executed! (Simplified)");
        context.analyzer("custom_analyzer_simple").custom() // Use a new analyzer name for testing
                .tokenizer(StandardTokenizerFactory.class)
                .tokenFilter(LowerCaseFilterFactory.class)
                .tokenFilter(SynonymGraphFilterFactory.class)
                .param("synonyms", "synonyms.txt")
                .param("expand", "true")
                .param("ignoreCase", "true");
        log.info("Simplified Lucene analyzer 'custom_analyzer_simple' configured with synonyms.");
    }
}
