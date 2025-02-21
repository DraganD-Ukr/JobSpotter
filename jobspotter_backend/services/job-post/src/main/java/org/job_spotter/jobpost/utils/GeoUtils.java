package org.job_spotter.jobpost.utils;

public class GeoUtils {
    public static final double EARTH_RADIUS_KM = 6371.0;
    public static final double EARTH_RADIUS_MILES = 3959.0;


    public static double haversine(double lat1, double lon1, double lat2, double lon2, double EARTH_RADIUS) {
        double dLat = Math.toRadians(lat2 - lat1);
        double dLon = Math.toRadians(lon2 - lon1);
        double a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(Math.toRadians(lat1)) * Math.cos(Math.toRadians(lat2)) * Math.pow(Math.sin(dLon / 2), 2);
        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return EARTH_RADIUS * c;
    }
}
