package org.job_spotter.jobpost.model;

public enum JobTagEnum {

    GENERAL_HELP(1, "General Help"),
    HANDYMAN_SERVICES(2, "Handyman Services"),
    SKILLED_TRADES(3, "Skilled Trades"),
    CLEANING_SERVICES(4, "Cleaning Services"),
    DELIVERY_SERVICES(5, "Delivery Services"),
    CAREGIVING(6, "Caregiving"),
    PET_CARE(7, "Pet Care"),
    TUTORING_MENTORING(8, "Tutoring/Mentoring"),
    EVENT_STAFF(9, "Event Staff"),
    ADMINISTRATIVE_SUPPORT(10, "Administrative Support"),
    VIRTUAL_ASSISTANCE(11, "Virtual Assistance"),
    FOOD_SERVICES(12, "Food Services"),
    GARDENING_LANDSCAPING(13, "Gardening/Landscaping"),
    COMMUNITY_OUTREACH(14, "Community Outreach"),
    IT_SUPPORT(15, "IT Support"),
    CREATIVE_SERVICES(16, "Creative Services"),
    PERSONAL_SERVICES(17, "Personal Services"),
    TUTORING_LANGUAGES(18, "Tutoring Languages"),
    MUSIC_INSTRUCTION(19, "Music Instruction"),
    OTHER(20, "Other");

    private final int id;
    private final String displayName;

    JobTagEnum(int id, String displayName) {
        this.id = id;
        this.displayName = displayName;
    }

    public int getId() {
        return id;
    }

    public String getDisplayName() {
        return displayName;
    }

    @Override
    public String toString() {
        return displayName;
    }

}
