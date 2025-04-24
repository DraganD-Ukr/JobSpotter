package org.jobspotter.notification.unit;

import org.jobspotter.notification.exception.ResourceNotFoundException;
import org.jobspotter.notification.exception.UnauthorizedException;
import org.jobspotter.notification.model.Notification;
import org.jobspotter.notification.repository.NotificationRepository;
import org.jobspotter.notification.service.Implementation.NotificationServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentMatchers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class NotificationServiceImplTest {

    @Mock
    private NotificationRepository notificationRepository;

    @InjectMocks
    private NotificationServiceImpl notificationService;

    private UUID userId;
    private String notificationId;
    private Notification unReadNotification;
    private Notification readNotification;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        notificationId = UUID.randomUUID().toString();

        unReadNotification = new Notification();
        unReadNotification.setNotificationID(notificationId);
        unReadNotification.setDestinationUserId(userId);
        unReadNotification.setRead(false);

        readNotification = new Notification();
        readNotification.setNotificationID(notificationId);
        readNotification.setDestinationUserId(userId);
        readNotification.setRead(true);
    }

    @Test
    void shouldMarkNotificationAsRead() {
        when(notificationRepository.findById(notificationId)).thenReturn(Mono.just(unReadNotification));
        when(notificationRepository.save(ArgumentMatchers.any())).thenReturn(Mono.just(unReadNotification));

//        Subscribes to the reactive stream returned by the markNotificationAsReadOrUnread method
        StepVerifier.create(notificationService.markNotificationAsReadOrUnread(userId, notificationId))
                .verifyComplete();

        assertTrue(unReadNotification.isRead());
    }

    @Test
    void shouldMarkNotificationAsUnread() {

        when(notificationRepository.findById(notificationId)).thenReturn(Mono.just(readNotification));
        when(notificationRepository.save(ArgumentMatchers.any())).thenReturn(Mono.just(readNotification));

        StepVerifier.create(notificationService.markNotificationAsReadOrUnread(userId, notificationId))
                .verifyComplete();

        assertFalse(readNotification.isRead());
    }

    @Test
    void shouldThrowErrorWhenNotificationNotFound() {
        when(notificationRepository.findById(notificationId)).thenReturn(Mono.empty());

        StepVerifier.create(notificationService.markNotificationAsReadOrUnread(userId, notificationId))
                .expectError(ResourceNotFoundException.class)
                .verify();
    }

    @Test
    void shouldThrowErrorWhenUserNotAuthorized() {
        UUID anotherUserId = UUID.randomUUID();
        unReadNotification.setDestinationUserId(anotherUserId);

        when(notificationRepository.findById(notificationId)).thenReturn(Mono.just(unReadNotification));

        StepVerifier.create(notificationService.markNotificationAsReadOrUnread(userId, notificationId))
                .expectError(UnauthorizedException.class)
                .verify();
    }
}

