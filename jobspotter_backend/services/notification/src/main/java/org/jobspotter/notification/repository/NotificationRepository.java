package org.jobspotter.notification.repository;

import org.jobspotter.notification.model.Notification;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.UUID;

@Repository
public interface NotificationRepository extends ReactiveMongoRepository<Notification, String> {

    Flux<Notification> findAllByDestinationUserId(UUID userId);
}
