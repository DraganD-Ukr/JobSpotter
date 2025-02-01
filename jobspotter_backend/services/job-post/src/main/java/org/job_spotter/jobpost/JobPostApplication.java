package org.job_spotter.jobpost;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@SpringBootApplication
@EnableDiscoveryClient
public class JobPostApplication {

	public static void main(String[] args) {
		SpringApplication.run(JobPostApplication.class, args);

	}

}
