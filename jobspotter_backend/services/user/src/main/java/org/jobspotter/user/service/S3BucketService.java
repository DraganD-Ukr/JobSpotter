package org.jobspotter.user.service;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.UUID;

public interface S3BucketService {

    void uploadFile(UUID userID, MultipartFile file) throws IOException;

    void deleteFile(UUID userID);

    boolean fileExists(UUID userID);
}
