package org.job_spotter.jobpost.service.Implementation;

import com.redis.lettucemod.api.StatefulRedisModulesConnection;
import com.redis.lettucemod.api.sync.RedisModulesCommands;
import com.redis.lettucemod.search.Suggestion;
import com.redis.lettucemod.search.SuggetOptions;
import lombok.RequiredArgsConstructor;
import org.job_spotter.jobpost.service.SearchTitleSuggestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class SearchTitleSuggestionServiceImpl implements SearchTitleSuggestionService {

    @Autowired
    StatefulRedisModulesConnection<String, String> connection;


    @Override
    public List<String> suggestTitles(String title) {
        RedisModulesCommands<String, String> commands = connection.sync();
        // Perform fuzzy autocompletion on the RedisSearch suggestion dictionary
        SuggetOptions options = SuggetOptions.builder()
                .max(5)
                .fuzzy()
                .build();
        List<Suggestion<String>> suggestions = commands.ftSugget("jobTitleSuggestions", title, options);

        if(suggestions == null){
            return List.of();
        }

        return suggestions.stream()
                .map(Suggestion::getString)
                .toList();
    }

}
