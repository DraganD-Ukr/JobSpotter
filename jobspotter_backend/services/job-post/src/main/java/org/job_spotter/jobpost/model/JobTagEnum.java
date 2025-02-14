package org.job_spotter.jobpost.model;

import java.util.Arrays;
import java.util.stream.Collectors;

public enum JobTagEnum {

    GENERAL_HELP(1L, "General Help"),
    HANDYMAN_SERVICES(2L, "Handyman Services"),
    SKILLED_TRADES(3L, "Skilled Trades"),
    CLEANING_SERVICES(4L, "Cleaning Services"),
    DELIVERY_SERVICES(5L, "Delivery Services"),
    CAREGIVING(6L, "Caregiving"),
    PET_CARE(7L, "Pet Care"),
    TUTORING_MENTORING(8L, "Tutoring/Mentoring"),
    EVENT_STAFF(9L, "Event Staff"),
    ADMINISTRATIVE_SUPPORT(10L, "Administrative Support"),
    VIRTUAL_ASSISTANCE(11L, "Virtual Assistance"),
    FOOD_SERVICES(12L, "Food Services"),
    GARDENING_LANDSCAPING(13L, "Gardening/Landscaping"),
    COMMUNITY_OUTREACH(14L, "Community Outreach"),
    IT_SUPPORT(15L, "IT Support"),
    CREATIVE_SERVICES(16L, "Creative Services"),
    PERSONAL_SERVICES(17L, "Personal Services"),
    TUTORING_LANGUAGES(18L, "Tutoring Languages"),
    MUSIC_INSTRUCTION(19L, "Music Instruction"),
    OTHER(20L, "Other");

    private final Long id;
    private final String displayName;

    JobTagEnum(Long id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public Long getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return name();
    }

    // Method to get all enum names as string values in the format 'ENUM_NAME'
    public static String getAllEnumNames() {
        return Arrays.stream(JobTagEnum.values())
                .map(JobTagEnum::name) // Get the enum constant name (e.g., GENERAL_HELP)
                .collect(Collectors.joining(", ")); // Join the enum names with commas
    }

}
