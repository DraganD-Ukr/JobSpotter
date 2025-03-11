package org.jobspotter.report.service;

import org.jobspotter.report.dto.ReportRequest;

import java.util.UUID;

public interface ReportService {

    void generateReport(UUID reporterId, ReportRequest reportRequest);

}
