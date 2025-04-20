package org.jobspotter.jobpost.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.UUID;

@AllArgsConstructor
@Getter
@Setter
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Notification {

    /**
     * The message to be sent to the user
     */
    private String message;

    /**
     * The user id to whom the notification is to be sent
     */
    private UUID destinationUserId;

    /**
     * The user id whose action triggered the notification
     */
    private UUID sourceUserId;

    /**
     * The job post id for which the notification is to be sent
     */
    private Long jobPostId;


    /**
     * The action url to be sent to the user. E.g /jobpost/{jobPostId}
     */
    private String actionUrl;


    /**
     * The action to be performed by the user. E.g APPLY, VIEW
     */
    private String action;

    private LocalDateTime createdAt;

}
