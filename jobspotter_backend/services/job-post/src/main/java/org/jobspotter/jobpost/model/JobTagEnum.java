package org.jobspotter.jobpost.model;

import java.util.Arrays;
import java.util.Map;
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
    HOME_MAINTENANCE(20L, "Home Maintenance"),
    TRANSPORTATION_ASSISTANCE(21L, "Transportation Assistance"),
    ERRANDS_SHOPPING(22L, "Errands/Shopping"),
    VOLUNTEER_WORK(23L, "Volunteer Work"),  // Could be paid or unpaid
    COMMUNITY_EVENTS(24L, "Community Events"),
    FUNDRAISING(25L, "Fundraising"),
    ANIMAL_WELFARE(26L, "Animal Welfare"),
    MENTORING(27L, "Mentoring (Community)"), // Differentiate from Tutoring/Mentoring which might be more academic
    HEALTH_SUPPORT(28L, "Health Support"), // Non-medical, like companionship or post-op care
    COUNSELING_SUPPORT(29L, "Counseling Support"), // Non-clinical, like peer support
    DISASTER_RELIEF(30L, "Disaster Relief"),
    ENVIRONMENTAL_CONSERVATION(31L, "Environmental Conservation"),
    OTHER(32L, "Other");

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

    //Method to return the map of all enum values as Enum name and display name
    public static Map<String, String> getAllEnumValues() {
        return Arrays.stream(JobTagEnum.values())
                .collect(Collectors.toMap(JobTagEnum::name, JobTagEnum::getDisplayName));
    }

}
