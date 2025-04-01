package org.job_spotter.jobpost.config;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.repository.JobPostRepository;
import org.job_spotter.jobpost.service.SearchTitleSuggestionService;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Component

public class RedisSearchInitializer {

    private final JobPostRepository jobPostRepository;

    private final SearchTitleSuggestionService searchTitleSuggestionService;


    /**
     * Initialize the RedisSearch index with job titles from the repository
     */
    @PostConstruct
    public void init() {

        // Fetch job titles from the repository
        List<String> jobPosts = jobPostRepository.findAllTitles();

        int added = 0;

        // Insert job posts into RedisSearch as suggestions
        for (String title : jobPosts) {

            title = title.toLowerCase(); // Convert to lowercase for case-insensitive search



            boolean result = searchTitleSuggestionService.addTitle(title);

            if (result) {
                added++;
            }
        }

        log.info("RedisSearch JobTitleSuggestion indexes initialized with {} job titles", added);

    }

}