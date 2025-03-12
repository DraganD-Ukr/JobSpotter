package org.jobspotter.notification.service;

import reactor.core.publisher.Mono;

import java.util.UUID;

public interface NotificationService {

    //Notification retrieval/Check methods


    //Notification update methods
    Mono<Void> markNotificationAsReadOrUnread(UUID userId, String notificationId);

}
