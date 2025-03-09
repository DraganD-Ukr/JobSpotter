package org.jobspotter.notification.repository;

import org.jobspotter.notification.model.Notification;
import org.springframework.data.mongodb.repository.ReactiveMongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationRepository extends ReactiveMongoRepository<Notification, String> {

}
