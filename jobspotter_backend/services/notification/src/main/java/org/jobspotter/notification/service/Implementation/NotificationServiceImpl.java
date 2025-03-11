package org.jobspotter.notification.service.Implementation;

import lombok.RequiredArgsConstructor;
import org.jobspotter.notification.exception.ResourceNotFoundException;
import org.jobspotter.notification.exception.UnauthorizedException;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.repository.NotificationRepository;
import org.jobspotter.notification.service.NotificationService;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;

import java.lang.module.ResolutionException;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;

//---------------------------------------------------------------------------------------------------------
//                                           Notification update methods
//---------------------------------------------------------------------------------------------------------
    /**
     * Mark a notification as unread using the notificationId
     * Check if the notification exists, then mark it as unread
     * Return a Mono error if the notification does not exist or the user is not authorized
     *
     * @param userId         The id of the notification
     * @param notificationId The id of the notification
     * @return A Mono of void
     */
    // Mark a notification as unread
    @Override
    public Mono<Void> markNotificationAsRead(UUID userId, String notificationId) {
        return verifyNotificationAndAuthorization(notificationId, userId)
                .flatMap(notification -> {
                    notification.setRead(true);
                    return notificationRepository.save(notification).then();
                });
    }
//---------------------------------------------------------------------------------------------------------
//                                                Helper methods
//---------------------------------------------------------------------------------------------------------
    //Check if user is authorized
private Mono<Notification> verifyNotificationAndAuthorization(String notificationId, UUID userId) {
    return notificationRepository.findById(notificationId)
            // If the notification is not found, return an error
            .switchIfEmpty(Mono.error(new ResourceNotFoundException("Notification not found")))
            .flatMap(notification -> {

                // If the user is not authorized, return an error
                if (!notification.getDestinationUserId().equals(userId)) {
                    return Mono.error(new UnauthorizedException("User is not authorized for this notification"));
                }
                return Mono.just(notification);
            });
}
}
