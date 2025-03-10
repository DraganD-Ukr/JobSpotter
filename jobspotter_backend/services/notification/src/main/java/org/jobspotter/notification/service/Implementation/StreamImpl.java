package org.jobspotter.notification.service.Implementation;

import lombok.extern.slf4j.Slf4j;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.model.NotificationType;
import org.jobspotter.notification.service.StreamService;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.FluxSink;

import java.io.IOException;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@Service
public class StreamImpl implements StreamService {

    // Map to keep track of FluxSinks for each user.
    private final Map<UUID, FluxSink<Notification>> sinks = new ConcurrentHashMap<>();

    /**
     * Stream notifications to the user using the userId
     *
     * @param userId The userId of the user
     * @return A Flux of ServerSentEvents containing the notifications
     */
    // Map to keep track of SseEmitters for each user.
    @Override
    public Flux<ServerSentEvent<Notification>> streamNotifications(UUID userId) {
        return Flux.<Notification>create(emitter -> {
                    // Save the sink so we can push notifications later.
                    sinks.put(userId, emitter);
                    // Remove the sink if the connection is closed.
                    emitter.onDispose(() -> sinks.remove(userId));
                })
                .map(notification -> ServerSentEvent.<Notification>builder()
                        .event("notification")
                        .data(notification)
                        .build());
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
