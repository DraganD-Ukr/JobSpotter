package org.jobspotter.jobpost.service.Implementation;

import lombok.RequiredArgsConstructor;
import org.jobspotter.jobpost.model.Notification;
import org.jobspotter.jobpost.service.NotificationService;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class NotificationServiceImpl implements NotificationService {

    private final KafkaTemplate<String, Notification> kafkaTemplate;


    @Override
    public void sendNotification(Notification notification, String topic) {
        kafkaTemplate.send(topic, notification);
    }

}
