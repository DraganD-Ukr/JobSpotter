package org.jobspotter.user.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import lombok.*;
import org.jobspotter.user.model.UserType;

import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.UUID;

/**
 * The user representation(profile) response DTO.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    /**
     * The user id.
     */
    private UUID userId;

    /**
     * The username.
     */
    private String username;

    /**
     * The first name of the user.
     */
    private String firstName;

    /**
     * The last name of the user.
     */
    private String lastName;

    /**
     * The email of the user.
     */
    private String email;

    /**
     * Irish phone number of the user.
     */
    private String phoneNumber;

    /**
     * The "about" of the user.
     */
    private String about;

    /**
     * Created at timestamp.
     */
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime createdAt;

    /**
     * Last updated at timestamp.
     */
    private LocalDateTime lastUpdatedAt;

    /**
     * The user type.
     */
    private UserType userType;


}
