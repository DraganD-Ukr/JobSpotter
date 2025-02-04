package org.jobspotter.user.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.Map;

@FeignClient(name = "google-geocoding-client", url = "https://maps.googleapis.com/maps/api/geocode/json")
public interface GoogleGeocodingClient {


    @GetMapping
    Map<String, Object> getCoordinates(
            @RequestParam("address") String address,
            @RequestParam("key") String apiKey
    );

}
