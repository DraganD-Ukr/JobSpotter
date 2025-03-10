package org.jobspotter.notification.Listener;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.repository.NotificationRepository;
import org.jobspotter.notification.service.StreamService;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationKafkaConsumer {

    private final NotificationRepository notificationRepository;
    private final StreamService streamService;

    @KafkaListener(topicPattern = ".*", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeNotification(Notification notification) {
        log.info("Received notification: {}", notification);
        notificationRepository.save(notification).subscribe();

        UUID userId = notification.getSourceUserId();

        streamService.sendNotification(userId, notification);
    }
}
