package org.jobspotter.notification.model;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.LocalDateTime;
import java.util.UUID;

@Document(collection = "notification")// MongoDB Collection
@Getter
@Builder
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor
@AllArgsConstructor
public class Notification {

    @Id
    private String notificationID; // MongoDB uses String/ObjectId

    private UUID destinationUserId;  // Storing user reference as String

    private UUID sourceUserId; // Storing user reference as String

    private String actionUrl;

    private Long jobPostID; // Storing jobPost reference as String (nullable)

    private String message;

    private boolean isRead;

    @CreatedDate // Automatically set when document is created
    private LocalDateTime createdAt;

    private NotificationType type;
}