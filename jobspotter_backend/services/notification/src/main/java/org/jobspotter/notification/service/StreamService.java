package org.jobspotter.notification.service;


import org.jobspotter.notification.model.Notification;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;

import java.util.UUID;

public interface StreamService {

    Flux<ServerSentEvent<Notification>> streamNotifications(UUID userId);

    void sendNotification(UUID userId, Notification notification);

}
