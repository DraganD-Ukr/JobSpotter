package org.job_spotter.jobpost.service;

import org.job_spotter.jobpost.model.Notification;

public interface NotificationService {

    void sendNotification(Notification notification, String topic);

}
