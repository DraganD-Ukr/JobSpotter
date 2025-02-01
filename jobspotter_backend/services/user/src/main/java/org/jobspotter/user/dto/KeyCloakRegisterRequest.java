package org.jobspotter.user.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

public record KeyCloakRegisterRequest (
    boolean enabled,
    String firstName,
    String lastName,
    String email,
    String username,
    List<Credentials> credentials){

    public static class Credentials {
        String type = "password";
        @Getter
        @Setter
        String value;
        boolean temporary = false;

        // Custom Setter
        public Credentials(String value) {
            this.value = value;
        }
    }
}

