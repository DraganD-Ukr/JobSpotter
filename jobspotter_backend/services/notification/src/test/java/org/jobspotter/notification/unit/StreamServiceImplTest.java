package org.jobspotter.notification.unit;

import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.repository.NotificationRepository;
import org.jobspotter.notification.service.Implementation.StreamImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.codec.ServerSentEvent;
import reactor.core.publisher.Flux;
import reactor.test.StepVerifier;

import java.util.UUID;

import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class StreamServiceImplTest {

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private StreamImpl streamService;

    private UUID userId;
    private Notification notification1;
    private Notification notification2;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();

        notification1 = new Notification();
        notification1.setNotificationID(UUID.randomUUID().toString());
        notification1.setDestinationUserId(userId);
        notification1.setRead(false);

        notification2 = new Notification();
        notification2.setNotificationID(UUID.randomUUID().toString());
        notification2.setDestinationUserId(userId);
        notification2.setRead(true);
    }

    @Test
    void testStreamNotifications_SendsPingAndExistingNotifications() {
        // Mock repository to return existing notifications
        when(notificationRepository.findAllByDestinationUserId(userId))
                .thenReturn(Flux.just(notification1, notification2));

        // Subscribe to the notifications stream
        StepVerifier.create(streamService.streamNotifications(userId))
                .expectNextMatches(event -> event.event().equals("ping")) // Expect a ping event
                .expectNextMatches(event -> event.data().equals(notification1)) // Expect old notifications
                .expectNextMatches(event -> event.data().equals(notification2))
                .thenCancel()
                .verify();

        // Verify the repository was called once
        verify(notificationRepository, times(1)).findAllByDestinationUserId(userId);
    }

    @Test
    void testStreamNotifications_HandlesEmptyNotifications() {
        // Mock repository to return no notifications
        when(notificationRepository.findAllByDestinationUserId(userId))
                .thenReturn(Flux.empty());

        StepVerifier.create(streamService.streamNotifications(userId))
                .expectNextMatches(event -> event.event().equals("ping")) // Ping event should still be sent
                .thenCancel()
                .verify();

        verify(notificationRepository, times(1)).findAllByDestinationUserId(userId);
    }


    @Test
    void testSendNotification_PushesToExistingUserStream() {
        UUID userId = UUID.randomUUID();
        Notification notification = Notification.builder()
                .notificationID(UUID.randomUUID().toString())
                .destinationUserId(userId)
                .build();

        Notification existingNotification = Notification.builder()
                .notificationID(UUID.randomUUID().toString())
                .destinationUserId(userId)
                .build();



        notification.setNotificationID(UUID.randomUUID().toString());
        notification.setDestinationUserId(userId);

        when(notificationRepository.findAllByDestinationUserId(userId))
                .thenReturn(Flux.just(existingNotification));
        // Create a stream for the user
        Flux<ServerSentEvent<Notification>> notificationStream = streamService.streamNotifications(userId);

        StepVerifier.create(notificationStream)
                .expectNextMatches(event -> {
                    assert event.event() != null;
                    return event.event().equals("ping");
                }) // First event is always ping
                .expectNextMatches(event -> {
                    assert event.data() != null;
                    return event.data().equals(existingNotification);
                }) // Expect the existing notification FIRST
                .then(() -> streamService.sendNotification(userId, notification)) // Push a new notification
                .expectNextMatches(event -> {
                    assert event.data() != null;
                    return event.data().equals(notification);
                }) // Expect the pushed notification
                .thenCancel()
                .verify();

    }

    @Test
    void testSendNotification_NoEffectIfUserNotConnected() {
        UUID userId = UUID.randomUUID();
        Notification notification = new Notification();
        notification.setNotificationID(UUID.randomUUID().toString());
        notification.setDestinationUserId(userId);

        // User has never subscribed → no sink exists
        streamService.sendNotification(userId, notification);

        // No assertion needed, but we verify that no exception is thrown and nothing crashes
    }


}
