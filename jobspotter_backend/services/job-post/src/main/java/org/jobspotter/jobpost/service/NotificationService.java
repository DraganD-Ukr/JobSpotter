package org.jobspotter.jobpost.service;

import org.jobspotter.jobpost.model.Notification;

public interface NotificationService {

    void sendNotification(Notification notification, String topic);

}
