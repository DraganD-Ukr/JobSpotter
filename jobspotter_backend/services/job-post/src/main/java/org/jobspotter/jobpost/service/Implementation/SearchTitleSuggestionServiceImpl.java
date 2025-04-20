package org.jobspotter.jobpost.service.Implementation;

import com.redis.lettucemod.api.StatefulRedisModulesConnection;
import com.redis.lettucemod.api.sync.RedisModulesCommands;
import com.redis.lettucemod.search.Suggestion;
import com.redis.lettucemod.search.SuggetOptions;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.jobpost.cache.CacheConstants;
import org.jobspotter.jobpost.service.SearchTitleSuggestionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
public class SearchTitleSuggestionServiceImpl implements SearchTitleSuggestionService {

    private final StatefulRedisModulesConnection<String, String> connection;


    @Override

    public List<String> suggestTitles(String title) {

        RedisModulesCommands<String, String> commands = connection.sync();

        SuggetOptions options = SuggetOptions.builder()
                .max(5)
                .fuzzy()
                .build();

        List<Suggestion<String>> suggestions = commands.ftSugget(CacheConstants.JOB_TITLE_SUGGESTIONS_INDEX, title, options);

        if (suggestions == null || suggestions.isEmpty()) {
            return List.of();
        }

        return suggestions.stream()
                .filter(sug -> sug.getString().charAt(0) == title.charAt(0))
                .map(Suggestion::getString)
                .toList();
    }



    @Override
    public boolean addTitle(String title) {

        if (title == null || title.trim().isEmpty()) {
            return false;
        }

        title = title.toLowerCase();

        RedisModulesCommands<String, String> commands = connection.sync();

        try {
            Suggestion<String> suggestion = new Suggestion<>();

            suggestion.setString(title);
            suggestion.setScore(1.0);
            suggestion.setPayload(title);

            long result = commands.ftSugadd(CacheConstants.JOB_TITLE_SUGGESTIONS_INDEX, suggestion);

            return result > 0;

        } catch (Exception e) {
            log.error("Error adding suggestion: {}", e.getMessage());
            return false;
        }

    }



    @Override
    public boolean removeTitle(String title) {

        if (title == null || title.trim().isEmpty()) {
            return false;
        }

        RedisModulesCommands<String, String> commands = connection.sync();

        try {
            return commands.ftSugdel(CacheConstants.JOB_TITLE_SUGGESTIONS_INDEX, title);
        } catch (Exception e) {

            log.error("Error removing suggestion: {}", e.getMessage());
            return false;

        }

    }



    @Override
    public boolean incrementTitleScore(String title) {

        if (title == null || title.trim().isEmpty()) {
            return false;
        }

        RedisModulesCommands<String, String> commands = connection.sync();

        try {

            Suggestion<String> suggestion = new Suggestion<>();
            suggestion.setString(title);
            suggestion.setScore(1.0);

            long result =  commands.ftSugaddIncr(CacheConstants.JOB_TITLE_SUGGESTIONS_INDEX, suggestion);

            return result > 0;

        } catch (Exception e) {

            log.error("Error incrementing suggestion score: {}", e.getMessage());
            return false;
        }

    }



}