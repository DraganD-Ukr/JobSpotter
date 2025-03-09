package org.jobspotter.notification.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "notifications") // MongoDB Collection
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    private String notificationID; // MongoDB uses String/ObjectId

    private String userID;  // Storing user reference as String

    private String jobPostID; // Storing jobPost reference as String (nullable)

    private String message;

    private boolean isRead;

    @CreatedDate // Automatically set when document is created
    private LocalDateTime createdAt;

    private NotificationType type;
}