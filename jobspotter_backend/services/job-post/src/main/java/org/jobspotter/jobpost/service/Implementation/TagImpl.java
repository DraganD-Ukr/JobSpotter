package org.jobspotter.jobpost.service.Implementation;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.jobspotter.jobpost.model.JobTagEnum;
import org.jobspotter.jobpost.service.TagService;
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
