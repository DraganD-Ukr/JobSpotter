package org.jobspotter.notification.config;


import lombok.RequiredArgsConstructor;
import org.jobspotter.notification.model.Notification;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.ssl.DefaultSslBundleRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.KafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.listener.ConcurrentMessageListenerContainer;

import java.util.Map;
@Configuration
@RequiredArgsConstructor
public class KafkaConsumerConfig {

    private final KafkaProperties kafkaProperties;

    @Bean
    public Map<String, Object> consumerConfig() {
        return kafkaProperties.buildConsumerProperties(new DefaultSslBundleRegistry());
    }

    @Bean
    public ConsumerFactory<String, Notification> consumerFactory() {
        Map<String, Object> producerProps = kafkaProperties.buildConsumerProperties(new DefaultSslBundleRegistry());
        return new DefaultKafkaConsumerFactory<>(producerProps);
    }

    @Bean
    public KafkaListenerContainerFactory<ConcurrentMessageListenerContainer<String, Notification>> factory(
            ConsumerFactory<String, Notification> consumerFactory
    ) {
        ConcurrentKafkaListenerContainerFactory<String, Notification> factory =
                new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        return factory;
    }
}
