package org.jobspotter.notification.service.Implementation;

import lombok.RequiredArgsConstructor;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.repository.NotificationRepository;
import org.jobspotter.notification.service.NotificationService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

    @Override
    public Mono<Notification> sendNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    public Flux<Notification> getAllNotifications() {
        return notificationRepository.findAll();
    }
}
