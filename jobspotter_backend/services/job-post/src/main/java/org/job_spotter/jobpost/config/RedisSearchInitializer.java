package org.job_spotter.jobpost.config;

import com.redis.lettucemod.api.StatefulRedisModulesConnection;
import com.redis.lettucemod.api.sync.RedisModulesCommands;
import com.redis.lettucemod.search.Suggestion;
import jakarta.annotation.PostConstruct;
import org.job_spotter.jobpost.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class RedisSearchInitializer {

    @Autowired
    StatefulRedisModulesConnection<String, String> connection;

    @Autowired
    JobPostRepository jobPostRepository;

    @PostConstruct
    public void init() {
        RedisModulesCommands<String, String> commands = connection.sync();

        // Fetch job titles from the repository
        List<String> jobPosts = jobPostRepository.findAllTitles();

        // Insert job posts into RedisSearch as suggestions
        for (String title : jobPosts) {
            title = title.toLowerCase(); // Convert to lowercase for case-insensitive search
            try {
                Suggestion<String> suggestion = new Suggestion<>();
                suggestion.setString(title);
                suggestion.setScore(1.0);
                suggestion.setPayload(title);
                commands.ftSugadd("jobTitleSuggestions", suggestion); // Add title as suggestion
                System.out.println("Added suggestion: " + title);

            } catch (Exception e) {
                System.out.println("Error adding suggestion to Redis: " + e.getMessage());
            }
        }
    }
}