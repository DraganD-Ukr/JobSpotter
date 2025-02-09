package org.job_spotter.jobpost.service.Implementation;

import lombok.RequiredArgsConstructor;
import org.job_spotter.jobpost.authUtils.JWTUtils;
import org.job_spotter.jobpost.client.AddressServiceClient;
import org.job_spotter.jobpost.dto.AddressResponse;
import org.job_spotter.jobpost.dto.JobPostPostRequest;
import org.job_spotter.jobpost.model.JobPost;
import org.job_spotter.jobpost.model.JobStatus;
import org.job_spotter.jobpost.model.JobTagEnum;
import org.job_spotter.jobpost.model.Tag;
import org.job_spotter.jobpost.repository.JobPostRepository;
import org.job_spotter.jobpost.repository.TagRepository;
import org.job_spotter.jobpost.service.JobPostService;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class JobPostImpl implements JobPostService {

    private final JobPostRepository jobPostRepository;
    private final TagRepository tagRepository;
    private final AddressServiceClient addressServiceClient;


    @Override
    public List<JobPost> getAllJobPosts() {
        return jobPostRepository.findAll();
    }

    @Override
    public List<JobPost> getJobPostByTag(String tag) {
        return jobPostRepository.findAllByTags_Name(tag);
    }


    @Override
    public void createJobPostDomainDummyData() {
        // Define the allowed tags
        List<String> tagNames = List.of("Cleaner", "IT", "Handyman", "Gardening", "Delivery", "Painting");

        // Create and save tags if they don't exist
        Map<String, Tag> tagMap = new HashMap<>();
        for (String tagName : tagNames) {
            Tag existingTag = tagRepository.findByName(tagName);
            if (existingTag == null) {
                Tag newTag = tagRepository.save(new Tag(null, new HashSet<>(), tagName));
                tagMap.put(tagName, newTag);
            } else {
                tagMap.put(tagName, existingTag);
            }
        }

        // List of job locations in Ireland
        List<String> locations = List.of(
                "Dublin", "Cork", "Galway", "Limerick", "Waterford",
                "Kilkenny", "Sligo", "Wexford", "Athlone", "Drogheda"
        );

        // Create job posts with only the allowed tags
        List<JobPost> jobPosts = List.of(
                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Cleaner")))
                        .title("Window Cleaning Needed").description("Clean my house windows").address("Dublin")
                        .longitude(-6.2603).latitude(53.3498).maxApplicants(5).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Cleaner"), tagMap.get("Handyman")))
                        .title("House Cleaning & Repairs").description("Need someone to clean and fix minor issues").address("Cork")
                        .longitude(-8.472).latitude(51.8985).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("IT")))
                        .title("Need Help with Computer Issues").description("Laptop not working properly, need a technician").address("Galway")
                        .longitude(-9.0579).latitude(53.2707).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Handyman"), tagMap.get("Gardening")))
                        .title("Garden Maintenance").description("Lawn mowing and trimming required").address("Limerick")
                        .longitude(-8.6238).latitude(52.668).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Delivery")))
                        .title("Parcel Delivery").description("Need someone to deliver a package").address("Waterford")
                        .longitude(-7.1101).latitude(52.2567).maxApplicants(1).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Painting"), tagMap.get("Handyman")))
                        .title("Paint a Small Room").description("Looking for someone to paint my room").address("Kilkenny")
                        .longitude(-7.254).latitude(52.6541).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Handyman")))
                        .title("Fix a Door Handle").description("Need a handyman to fix a broken door handle").address("Sligo")
                        .longitude(-8.4695).latitude(54.2766).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Gardening")))
                        .title("Trim Overgrown Hedge").description("Garden hedge is overgrown, need trimming").address("Wexford")
                        .longitude(-6.4575).latitude(52.3361).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Cleaner")))
                        .title("Office Cleaning Needed").description("Need someone to clean an office after hours").address("Athlone")
                        .longitude(-7.9407).latitude(53.4239).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Delivery")))
                        .title("Grocery Delivery").description("Pick up groceries and deliver them to my home").address("Drogheda")
                        .longitude(-6.3478).latitude(53.7179).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("IT"), tagMap.get("Handyman")))
                        .title("Set Up Home WiFi").description("Need someone to configure and secure WiFi network").address("Dublin")
                        .longitude(-6.2603).latitude(53.3498).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Painting")))
                        .title("Fence Painting Needed").description("Looking for someone to paint my wooden fence").address("Cork")
                        .longitude(-8.472).latitude(51.8985).maxApplicants(2).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Gardening"), tagMap.get("Cleaner")))
                        .title("Yard Cleanup").description("Clean up leaves and debris from my yard").address("Galway")
                        .longitude(-9.0579).latitude(53.2707).maxApplicants(3).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("Delivery"), tagMap.get("Handyman")))
                        .title("Furniture Pickup and Assembly").description("Pick up a table and assemble it at my home").address("Limerick")
                        .longitude(-8.6238).latitude(52.668).maxApplicants(1).status(JobStatus.OPEN).build(),

                JobPost.builder().jobPosterId(UUID.randomUUID()).tags(Set.of(tagMap.get("IT")))
                        .title("Fix Printer Issue").description("My printer is not working, need troubleshooting").address("Waterford")
                        .longitude(-7.1101).latitude(52.2567).maxApplicants(1).status(JobStatus.OPEN).build()
        );

        // Save job posts
        jobPostRepository.saveAll(jobPosts);
    }

    @Override
    public Long createJobPost(JobPostPostRequest jobPostPostRequest, String accessToken) {

        AddressResponse userAddress = addressServiceClient.getAddressById(accessToken, jobPostPostRequest.getAddressId());
        if (userAddress == null) {
            throw new RuntimeException("Address not found");
        }

        Set<Tag> tags = convertTagsFromDto(jobPostPostRequest.getTags());

        UUID userId;
        try {
            userId = JWTUtils.getUserIdFromToken(accessToken);
        } catch (Exception e) {
            throw new RuntimeException("Invalid access token");
        }


        JobPost jobPost = JobPost.builder()
                .jobPosterId(userId)
                .tags(tags)
                .title(jobPostPostRequest.getTitle())
                .description(jobPostPostRequest.getDescription())
                .address(userAddress.getAddress())
                .longitude(userAddress.getLongitude())
                .latitude(userAddress.getLatitude())
                .maxApplicants(jobPostPostRequest.getMaxApplicants())
                .status(JobStatus.OPEN)
                .build();

        jobPostRepository.save(jobPost);

        return jobPost.getJobPostId();
    }

    private Set<Tag> convertTagsFromDto(Set<JobTagEnum> tags){
        Set<Tag> tagSet = new HashSet<>();
        for (JobTagEnum tagEnum : tags) {
            Tag tag = Tag.builder()
                    .tagId(tagEnum.getId())
                    .name(tagEnum.getDisplayName())
                    .build();
            tagSet.add(tag);
        }
        return tagSet;
    }


}

