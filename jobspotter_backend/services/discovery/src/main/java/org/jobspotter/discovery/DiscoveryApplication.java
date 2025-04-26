package org.jobspotter.discovery;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

// Main class for the Spring
@SpringBootApplication
@EnableEurekaServer // creates Eureka server
public class DiscoveryApplication {


	public static void main(String[] args) {
		SpringApplication.run(DiscoveryApplication.class, args);
	}

}
