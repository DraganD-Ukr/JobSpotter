package org.jobspotter.review.config;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.jobspotter.review.cache.CacheConstants;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheConfiguration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.connection.lettuce.LettuceConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializationContext;
import org.springframework.data.redis.serializer.RedisSerializer;

import java.time.Duration;


@Configuration
public class RedisConfig {

    @Bean
    public RedisConnectionFactory redisConnectionFactory() {
        return new LettuceConnectionFactory();
    }

    @Bean
    public RedisCacheManager cacheManager(RedisConnectionFactory connectionFactory) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        mapper.activateDefaultTyping(
                mapper.getPolymorphicTypeValidator(),
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );

        RedisSerializer<Object> serializer = new GenericJackson2JsonRedisSerializer(mapper);

        RedisCacheConfiguration config = RedisCacheConfiguration.defaultCacheConfig()
                .entryTtl(Duration.ofSeconds(CacheConstants.SHORT_TTL_SECONDS))
                .serializeValuesWith(RedisSerializationContext.SerializationPair.fromSerializer(serializer));

        return RedisCacheManager.builder(connectionFactory)
                .cacheDefaults(config)
                .build();
    }

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {
        RedisTemplate<String, Object> template = new RedisTemplate<>();

        // Aids in letting spring know how to handshake with redis
        template.setConnectionFactory(connectionFactory);

        //Create a custom ObjectMapper and register the JavaTimeModule
        // This module is used to handle Java 8 date and time types (like LocalDateTime) for serialization and deserialization
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        // Activate default typing for polymorphic types
        objectMapper.activateDefaultTyping(
                objectMapper.getPolymorphicTypeValidator(),
                ObjectMapper.DefaultTyping.NON_FINAL,
                JsonTypeInfo.As.PROPERTY
        );
        // Define the default serializer to convert objects to JSON format
        // Use GenericJackson2JsonRedisSerializer for serializing the objects
        RedisSerializer<Object> serializer = new GenericJackson2JsonRedisSerializer(objectMapper);

        // Makes sure objects are serialized to JSON that are stored in Redis
        template.setDefaultSerializer(serializer);

        // Set the serializer for keys as String so we can use the default String serializer
        template.setKeySerializer(template.getStringSerializer());

        // Set the serializer for values. This applies to every value we store in Redis
        template.setValueSerializer(serializer);

        // Set the serializer for hash keys. Hash keys in Redis are strings, so we use the String serializer
        template.setHashKeySerializer(template.getStringSerializer());

        // Set the serializer for hash values. Just like regular values, these will be serialized to JSON
        template.setHashValueSerializer(serializer);

        return template;
    }


}
