package org.jobspotter.notification.service.Implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.model.NotificationType;
import org.jobspotter.notification.repository.NotificationRepository;
import org.jobspotter.notification.service.NotificationService;
import org.jobspotter.notification.service.StreamService;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RequiredArgsConstructor
@Service
public class StreamImpl implements StreamService {

    private final NotificationRepository notificationRepository;
    // Map to keep track of FluxSinks for each user.
    private final Map<UUID, FluxSink<Notification>> sinks = new ConcurrentHashMap<>();

    /**
     * Stream notifications to the user using the userId
     * On connection if the user is authenticated, return a Flux of ServerSentEvents containing the notifications
     * Also returns a Flux of ServerSentEvents containing the older notifications as well
     * if user has no notifications, return a ping event
     *
     * @param userId The userId of the user
     * @return A Flux of ServerSentEvents containing the notifications
     */
    // Map to keep track of SseEmitters for each user.
    @Override
    public Flux<ServerSentEvent<Notification>> streamNotifications(UUID userId) {
        // Create a Flux for the initial ping event.
        Flux<ServerSentEvent<Notification>> pingEvent = Flux.just(ServerSentEvent.<Notification>builder()
                .event("ping")
                .data(null) // Ping event can have null data or a placeholder
                .build());

        // Fetch existing notifications for the user from the database and map them to SSE events.
        Flux<ServerSentEvent<Notification>> existingEvents = notificationRepository
                .findAllByDestinationUserId(userId)
                .map(notification -> ServerSentEvent.<Notification>builder()
                        .event("notification")
                        .data(notification)
                        .build());

        // Create a Flux for new notifications that will be pushed via the sink and map them to SSE events.
        Flux<ServerSentEvent<Notification>> newEvents = Flux.<Notification>create(emitter -> {
            sinks.put(userId, emitter);
            emitter.onDispose(() -> sinks.remove(userId));
        }).map(notification -> ServerSentEvent.<Notification>builder()
                .event("notification")
                .data(notification)
                .build());

        // Combine all SSE streams into one continuous stream.
        return Flux.concat(pingEvent, existingEvents, newEvents);
    }

    /**
     * Send a notification to the user using the userId and the notification
     *
     * @param userId The userId of the user
     * @param notification The notification to send
     */
    // Send a notification to the user
    @Override
    public void sendNotification(UUID userId, Notification notification){
        FluxSink<Notification> sink = sinks.get(userId);
        if (sink != null) {
            sink.next(notification);
        }
    }

}
