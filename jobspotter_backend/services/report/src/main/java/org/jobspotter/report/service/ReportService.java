package org.jobspotter.report.service;

import org.jobspotter.report.dto.ReportRequest;

public interface ReportService {

    void generateReport(ReportRequest reportRequest);

}
