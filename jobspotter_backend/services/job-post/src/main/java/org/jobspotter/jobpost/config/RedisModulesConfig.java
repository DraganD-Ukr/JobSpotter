package org.jobspotter.jobpost.config;


import com.redis.lettucemod.RedisModulesClient;
import com.redis.lettucemod.api.StatefulRedisModulesConnection;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;

@Configuration
public class RedisModulesConfig {

    @Value("${spring.redis.host}")
    private String redisHost;

    @Value("${spring.redis.port}")
    private int redisPort;

    @Bean
    public RedisModulesClient redisModulesClient() {
        String redisUrl = String.format("redis://%s:%d", redisHost, redisPort);
        return RedisModulesClient.create(redisUrl);
    }

    @Primary
    @Bean
    public StatefulRedisModulesConnection<String, String> redisModulesConnection(RedisModulesClient client) {
        return client.connect();
    }
}
