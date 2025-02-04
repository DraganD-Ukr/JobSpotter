package org.jobspotter.user.service;

import java.util.Map;

public interface GeoCodingService {

    Map<String, Double> getCoordinates(String address);

}
