package org.jobspotter.notification.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.notification.authUtils.JWTUtils;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.model.NotificationType;
import org.jobspotter.notification.service.NotificationService;
import org.jobspotter.notification.service.StreamService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Slf4j
public class NotificationController {

    private final StreamService streamService;
    private final NotificationService notificationService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Mono<Notification> createNotification(@RequestBody Notification notification) {
        return notificationService.sendNotification(notification);
    }

    @GetMapping
    public Flux<Notification> getAllNotifications() {
        return notificationService.getAllNotifications();
    }


    @GetMapping("/stream")
    public Flux<ServerSentEvent<Notification>> notificationStream(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        // Extract the user ID from the access token.
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        return streamService.streamNotifications(userId);
    }

    @GetMapping("/simulate")
    public ResponseEntity<String> simulateNotification(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        Notification notification = Notification.builder()
                .sourceUserId(userId)
                .destinationUserId(userId)
                .message("Senpai noticed you! (>‿o)")
                .type(NotificationType.OTHER)
                .build();

        // Use the streaming service to send the notification to the given user
        streamService.sendNotification(userId, notification);

        return ResponseEntity.ok("Simulated notification sent");
    }
}
