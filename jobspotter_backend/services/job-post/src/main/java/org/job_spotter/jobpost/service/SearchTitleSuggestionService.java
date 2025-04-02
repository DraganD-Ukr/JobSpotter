package org.job_spotter.jobpost.service;

import java.util.List;

public interface SearchTitleSuggestionService {

    List<String> suggestTitles(String title);

    boolean addTitle(String title);

    boolean removeTitle(String title);

    boolean incrementTitleScore(String title);


}
