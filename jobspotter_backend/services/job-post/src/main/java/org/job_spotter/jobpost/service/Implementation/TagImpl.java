package org.job_spotter.jobpost.service.Implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.job_spotter.jobpost.model.JobTagEnum;
import org.job_spotter.jobpost.service.TagService;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class TagImpl implements TagService {
    @Override
    @Cacheable(value = "jobTagCache", key = "'jobTags'")
    public Map<String, String> getJobTags() {
        log.info("Loading job tags from enum because cache is empty");
        return JobTagEnum.getAllEnumValues();
    }
}
