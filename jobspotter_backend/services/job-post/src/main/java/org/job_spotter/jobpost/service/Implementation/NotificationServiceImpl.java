package org.job_spotter.jobpost.service.Implementation;

import lombok.RequiredArgsConstructor;
import org.job_spotter.jobpost.model.Notification;
import org.job_spotter.jobpost.service.NotificationService;
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
