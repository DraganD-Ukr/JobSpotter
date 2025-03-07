package org.jobspotter.user.fileUtils;

import lombok.Getter;

import java.util.Arrays;

/**
 * This class is used to provide utility methods for file operations
 */
public class FileUtils {

    public static final String[] IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".bmp", ".svg", ".webp"};

    /**
     * This method is used to check if a file is an image
     *
     * @param fileName The name of the file
     * @return True if the file is an image, false otherwise
     */
    //Check the file extension is an image
    public static boolean isImage(String fileName) {
        String extension = getExtension(fileName);
        return Arrays.asList(IMAGE_EXTENSIONS).contains(extension);
    }

    /**
     * This method is used to get the extension of a file
     *
     * @param fileName The name of the file
     * @return The extension of the file
     */
    // This method is used to get the extension of a file
    private static String getExtension(String fileName) {
        if (fileName == null) {
            return null;
        }
        int lastIndexOf = fileName.lastIndexOf(".");
        if (lastIndexOf == -1) {
            return "";
        }
        return fileName.substring(lastIndexOf);
    }
}
