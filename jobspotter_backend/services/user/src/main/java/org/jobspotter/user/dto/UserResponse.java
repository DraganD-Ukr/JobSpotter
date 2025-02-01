package org.jobspotter.user.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.jobspotter.user.model.UserType;

import java.time.LocalDateTime;
import java.util.UUID;

@Getter
@Setter
@AllArgsConstructor
@Builder
public class UserResponse {


    private UUID userId;

    private String username;

    private String firstName;

    private String lastName;

    private String email;

    private String phoneNumber;

    private String about;

    private LocalDateTime createdAt;

    private LocalDateTime lastUpdatedAt;

    private UserType userType;


}
