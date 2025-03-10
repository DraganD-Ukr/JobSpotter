package org.jobspotter.notification.Listener;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.notification.model.KafkaTopic;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.repository.NotificationRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationKafkaConsumer {

    private final NotificationRepository notificationRepository;

    @KafkaListener(topicPattern = ".*", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeNotification(Notification notification) {
        log.info("Received notification: {}", notification);
        notificationRepository.save(notification).subscribe();
    }
}
