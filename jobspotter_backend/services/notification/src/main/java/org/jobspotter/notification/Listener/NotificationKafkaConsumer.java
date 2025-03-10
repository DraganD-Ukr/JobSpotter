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

    /**
     * Consume a notification from Kafka
     *
     * @param notification The notification to consume
     */
    @KafkaListener(topicPattern = ".*", groupId = "${spring.kafka.consumer.group-id}")
    public void consumeNotification(Notification notification) {
        log.info("Received notification: {}", notification);

        // Save the notification to MongoDB and only proceed when it's saved
        notificationRepository.save(notification)
                .doOnSuccess(savedNotification -> {
                    log.info("Saved Notification: {}", savedNotification);

                    // Get userId from the saved notification
                    UUID userId = savedNotification.getDestinationUserId();

                    // Send the notification to the user with the saved notification (including generated ID & createdAt)
                    streamService.sendNotification(userId, savedNotification);
                })
                .doOnError(error -> log.error("Error saving notification: {}", error.getMessage()))
                .subscribe();
    }
}
