package org.job_spotter.jobpost.config;

import lombok.RequiredArgsConstructor;
import org.job_spotter.jobpost.model.Notification;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.boot.ssl.DefaultSslBundleRegistry;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.core.ProducerFactory;

import java.util.Map;

@Configuration
@RequiredArgsConstructor
public class KafkaProducerConfig {

    private final KafkaProperties kafkaProperties;

    @Bean
    public ProducerFactory<String, Notification> producerFactory(){
        Map<String, Object> producerProps = kafkaProperties.buildProducerProperties(new DefaultSslBundleRegistry());
        return new DefaultKafkaProducerFactory<>(producerProps);
    }

    @Bean
    public KafkaTemplate<String, Notification> kafkaTemplate(){
        return new KafkaTemplate<>(producerFactory());
    }

}
