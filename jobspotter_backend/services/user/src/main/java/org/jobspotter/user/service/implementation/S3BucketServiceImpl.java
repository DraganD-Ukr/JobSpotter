package org.jobspotter.user.service.implementation;

import feign.Request;
import lombok.extern.slf4j.Slf4j;
import software.amazon.awssdk.auth.credentials.AwsBasicCredentials;
import software.amazon.awssdk.auth.credentials.StaticCredentialsProvider;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.regions.Region;
import software.amazon.awssdk.services.s3.S3Client;
import org.jobspotter.user.service.S3BucketService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.model.DeleteObjectRequest;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

import java.io.IOException;
import java.util.UUID;

@Slf4j
@Service
public class S3BucketServiceImpl implements S3BucketService {

    @Value("${aws.s3.bucket}")
    private String bucketName;

    @Value("${aws.accessKeyId}")
    private String accessKeyId;

    @Value("${aws.secretAccessKey}")
    private String secretAccessKey;

    @Value("${aws.s3.region}")
    private String region;

    private S3Client s3Client;

    public S3BucketServiceImpl() {
    }

    /**
     * This method creates a S3Client object which connects to the JobSpotter S3 bucket
     * @return S3Client object
     */
    // Create a S3Client object
    private S3Client getS3Client() {
        if (s3Client == null) {
            AwsBasicCredentials credentials = AwsBasicCredentials.create(accessKeyId, secretAccessKey);
            s3Client = S3Client.builder()
                    .region(Region.of(region))
                    .credentialsProvider(StaticCredentialsProvider.create(credentials))
                    .build();
        }else{
            log.warn("S3 Client exists returning the existing client");
        }

        log.info("S3 Client created");

        return s3Client;
    }

    /**
     * Uploads A file to the S3 bucket could be any file type
     * Stitches the file name with the user ID to make it unique to the user who uploads it
     *
     * @param userID User ID to whom the file belongs
     * @param file File to be uploaded
     */
    //Uploads a file to the S3 bucket
    @Override
    public void uploadFile(UUID userID, MultipartFile file) throws IOException {

        // Covnert the user ID to a string
        String fileName = userID.toString();

        // Create a PutObjectRequest object
        PutObjectRequest putObjectRequest = PutObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        // Upload the file to the S3 bucket
        s3Client.putObject(putObjectRequest, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

        log.info("File uploaded to S3 bucket by :{}", userID);
    }

    /**
     * Deletes a file from the S3 bucket that belongs to a user
     *
     * @param userID User ID to whom the file belongs
     */

    @Override
    public void deleteFile(UUID userID) {

        // Convert the user ID to a string
        String fileName = userID.toString();

        // Create a DeleteObjectRequest object
        DeleteObjectRequest deleteObjectRequest = DeleteObjectRequest.builder()
                .bucket(bucketName)
                .key(fileName)
                .build();

        // Delete the file from the S3 bucket
        s3Client.deleteObject(deleteObjectRequest);

        log.info("File deleted from S3 bucket by :{}", userID);
    }
}
