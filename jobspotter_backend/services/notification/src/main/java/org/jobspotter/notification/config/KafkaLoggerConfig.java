package org.jobspotter.notification.config;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;


@Slf4j
@Component
public class KafkaLoggerConfig {


    @Value("${spring.kafka.bootstrap-servers}")
    private String kafkaBootstrapServers;

    @PostConstruct
    public void logKafkaBootstrapServers() {
        log.info("Kafka Bootstrap Servers from @Value: {}", kafkaBootstrapServers);
    }

}
