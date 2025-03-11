package org.jobspotter.notification.service;

import reactor.core.publisher.Mono;

import java.util.UUID;

public interface NotificationService {

    //Notification retrieval/Check methods


    //Notification update methods
    Mono<Void> markNotificationAsRead(UUID userId, String notificationId);
}
