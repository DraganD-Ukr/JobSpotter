package org.jobspotter.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisConfig {

    @Bean
    public RedisTemplate<String, Object> redisTemplate(RedisConnectionFactory connectionFactory) {

        // Create a new RedisTemplate to perform operations on Redis.
        RedisTemplate<String, Object> redisTemplate = new RedisTemplate<>();

        // Set the RedisConnectionFactory to let Spring know how to connect to Redis.
        redisTemplate.setConnectionFactory(connectionFactory);

        // Define the default serializer to convert objects to JSON format.
        // Use GenericJackson2JsonRedisSerializer for serializing the objects.
        RedisSerializer<Object> serializer = new GenericJackson2JsonRedisSerializer();

        // Set the default serializer for values in Redis.
        // This means whenever object is stored (like User), they will be serialized to JSON.
        redisTemplate.setDefaultSerializer(serializer);

        // Set the serializer for keys as String. Redis stores keys as strings, so we use the default String serializer.
        redisTemplate.setKeySerializer(redisTemplate.getStringSerializer());

        // Set the serializer for values. This applies to every value we store in Redis.
        redisTemplate.setValueSerializer(serializer);

        // Set the serializer for hash keys. Hash keys in Redis are strings, so we use the String serializer.
        redisTemplate.setHashKeySerializer(redisTemplate.getStringSerializer());

        // Set the serializer for hash values. Just like regular values, these will be serialized to JSON.
        redisTemplate.setHashValueSerializer(serializer);

        return redisTemplate;
    }

}
