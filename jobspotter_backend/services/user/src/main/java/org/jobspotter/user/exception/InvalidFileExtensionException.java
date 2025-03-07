package org.jobspotter.user.exception;

import java.util.Arrays;

public class InvalidFileExtensionException extends RuntimeException {

    public InvalidFileExtensionException() {
        super();
    }

    public InvalidFileExtensionException(String name, String[] extensions) {
        super("Invalid file extension for file: " + name + ". Allowed extensions are: " + Arrays.toString(extensions));
    }
}
