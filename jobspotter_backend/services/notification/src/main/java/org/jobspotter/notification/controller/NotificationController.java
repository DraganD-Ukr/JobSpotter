package org.jobspotter.notification.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.notification.authUtils.JWTUtils;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.model.NotificationType;
import org.jobspotter.notification.service.NotificationService;
import org.jobspotter.notification.service.StreamService;
import org.jobspotter.notification.exception.*;
import org.jobspotter.notification.dto.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.codec.ServerSentEvent;
import org.springframework.web.bind.annotation.*;
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

//------------------------------------------------------------------------------------------------------------------
//                                                Notification View Endpoints
//------------------------------------------------------------------------------------------------------------------
    @Operation(
            summary = "Stream notifications to the user",
            description = "Stream notifications to the user using the userId" +
                    "The user must be authenticated to access this endpoint" +
                    "Also returns a Flux of ServerSentEvents containing the older notifications as well"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Successfully streamed notifications"),

                    @ApiResponse(responseCode = "401", description = "Unauthorized"),

                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            }
    )
    @GetMapping("/stream")
    public Flux<ServerSentEvent<Notification>> notificationStream(
            @RequestHeader("Authorization") String accessToken
    ) throws Exception {
        // Extract the user ID from the access token.
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);
        return streamService.streamNotifications(userId);
    }

//------------------------------------------------------------------------------------------------------------------
//                                                Notification Management Endpoints
//------------------------------------------------------------------------------------------------------------------

    @Operation(
            summary = "Mark a notification as read",
            description = "Mark a notification as read using the notification ID" +
                    "The user must be authenticated to access this endpoint"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Successfully marked notification as read",
                    content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = String.class))),

                    @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ErrorResponse.class))),

                    @ApiResponse(responseCode = "404", description = "Notification not found",
                    content = @io.swagger.v3.oas.annotations.media.Content(schema = @io.swagger.v3.oas.annotations.media.Schema(implementation = ErrorResponse.class)))
            }
    )
    @GetMapping("/{notificationId}/mark-as-read")
    public Mono<ResponseEntity<Object>> markNotificationAsRead(
            @RequestHeader("Authorization") String accessToken,
            @PathVariable String notificationId
    ) throws Exception {
        UUID userId = JWTUtils.getUserIdFromToken(accessToken);

        return notificationService.markNotificationAsRead(userId, notificationId)
                .then(Mono.just(ResponseEntity.ok((Object)"Notification marked as unread.")))
                .onErrorResume(ResourceNotFoundException.class, e ->
                        Mono.just(ResponseEntity.status(HttpStatus.NOT_FOUND)
                                .body(new ErrorResponse(e.getMessage()))))
                .onErrorResume(UnauthorizedException.class, e ->
                        Mono.just(ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                                .body(new ErrorResponse(e.getMessage()))));
    }


    @Operation(
            summary = "Simulate a notification",
            description = "Simulate a notification to the user" +
                    "The user must be authenticated to access this endpoint"
    )
    @ApiResponses(
            value = {
                    @ApiResponse(responseCode = "200", description = "Successfully simulated notification"),
                    @ApiResponse(responseCode = "401", description = "Unauthorized"),
                    @ApiResponse(responseCode = "500", description = "Internal Server Error")
            }
    )
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
