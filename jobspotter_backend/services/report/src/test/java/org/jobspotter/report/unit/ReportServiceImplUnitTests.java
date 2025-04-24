package org.jobspotter.report.unit;


import org.jobspotter.report.authUtils.JWTUtils;
import org.jobspotter.report.dto.ReportRequest;
import org.jobspotter.report.exception.ResourceAlreadyExistsException;
import org.jobspotter.report.exception.ResourceNotFoundException;
import org.jobspotter.report.exception.UnauthorizedException;
import org.jobspotter.report.model.Report;
import org.jobspotter.report.model.ReportStatus;
import org.jobspotter.report.model.ReportTag;
import org.jobspotter.report.repository.ReportRepository;
import org.jobspotter.report.repository.specification.ReportSpecification;
import org.jobspotter.report.service.impl.ReportServiceImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Query;

import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ReportServiceImplUnitTests {


    @Mock
    private MongoTemplate mongoTemplate;

    @Mock
    private ReportRepository reportRepository;

    @Mock
    private JWTUtils jwtUtils;

    @InjectMocks
    private ReportServiceImpl reportService;

//    GENERATE REPORT TESTS
    @Test
    void generateReport_newReport_shouldSaveReport() {
        // Arrange
        UUID reporterId = UUID.randomUUID();
        ReportRequest reportRequest = ReportRequest.builder()
                .reportedUserId(UUID.randomUUID())
                .reportTitle("Test Report")
                .reportMessage("This is a test report.")
                .reportTags(Set.of(ReportTag.INAPPROPRIATE_CONTENT))
                .build();
        Report existingReport = Report.builder()
                .reporterId(reporterId)
                .reportedUserId(reportRequest.getReportedUserId())
                .reportedJobPostId(reportRequest.getReportedJobPostId())
                .reportedApplicantId(reportRequest.getReportedApplicantId())
                .reportedReviewId(reportRequest.getReportedReviewId())
                .reportTitle(reportRequest.getReportTitle())
                .build();
        when(reportRepository.exists(Example.of(existingReport))).thenReturn(false);

        // Act
        reportService.generateReport(reporterId, reportRequest);

        // Assert
        ArgumentCaptor<Report> reportCaptor = ArgumentCaptor.forClass(Report.class);
        verify(reportRepository, times(1)).save(reportCaptor.capture());
        Report savedReport = reportCaptor.getValue();
        assertEquals(reporterId, savedReport.getReporterId());
        assertEquals(reportRequest.getReportedUserId(), savedReport.getReportedUserId());
        assertEquals(reportRequest.getReportTitle(), savedReport.getReportTitle());
        assertEquals(reportRequest.getReportMessage(), savedReport.getReportMessage());
        assertEquals(reportRequest.getReportTags(), savedReport.getReportTags());
        assertEquals(ReportStatus.OPEN, savedReport.getReportStatus());
    }

    @Test
    void generateReport_existingReport_shouldThrowResourceAlreadyExistsException() {
        // Arrange
        UUID reporterId = UUID.randomUUID();
        ReportRequest reportRequest = ReportRequest.builder()
                .reportedUserId(UUID.randomUUID())
                .reportTitle("Test Report")
                .build();
        Report existingReport = Report.builder()
                .reporterId(reporterId)
                .reportedUserId(reportRequest.getReportedUserId())
                .reportedJobPostId(reportRequest.getReportedJobPostId())
                .reportedApplicantId(reportRequest.getReportedApplicantId())
                .reportedReviewId(reportRequest.getReportedReviewId())
                .reportTitle(reportRequest.getReportTitle())
                .build();
        when(reportRepository.exists(Example.of(existingReport))).thenReturn(true);

        // Act and Assert
        assertThrows(ResourceAlreadyExistsException.class, () -> reportService.generateReport(reporterId, reportRequest));
        verify(reportRepository, never()).save(any());
    }

//    SEARCH REPORTS TESTS

    @Test
    void searchReports_noCriteria_shouldReturnAllReports() throws Exception {
        // Arrange
        String accToken = "testToken";
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);
        List<Report> reportList = Collections.singletonList(Report.builder().reportTitle("Test Report").build());
        Query query = new Query();

        try (MockedStatic<ReportSpecification> reportSpecification = mockStatic(ReportSpecification.class)) {

            when(jwtUtils.hasAdminRole(anyString())).thenReturn(true);
            reportSpecification.when(() -> ReportSpecification.createQuery(null, null, null, null, null, null, null)).thenReturn(query);
            when(mongoTemplate.count(query, Report.class)).thenReturn((long) reportList.size());
            when(mongoTemplate.find(query.with(pageable), Report.class)).thenReturn(reportList);

            // Act
            Page<Report> result = reportService.searchReports(accToken, null, null, null, null, null, null, null, page, size, null, false);

            // Assert
            assertEquals(reportList.size(), result.getContent().size());
            assertEquals(page, result.getNumber());
            assertEquals(size, result.getSize());
            assertEquals(reportList.size(), result.getTotalElements());
            reportSpecification.verify(() -> ReportSpecification.createQuery(null, null, null, null, null, null, null));
            verify(mongoTemplate, times(1)).count(query, Report.class);
            verify(mongoTemplate, times(1)).find(query.with(pageable), Report.class);
        }


    }

    @Test
    void searchReports_withCriteria_shouldReturnFilteredReports() throws Exception {
        // Arrange
        String accToken = "testToken";
        Set<ReportTag> tags = Set.of(ReportTag.SPAM);
        ReportStatus status = ReportStatus.OPEN;
        UUID reporterId = UUID.randomUUID();
        int page = 0;
        int size = 10;
        Pageable pageable = PageRequest.of(page, size);
        List<Report> reportList = Collections.singletonList(Report.builder().reportTitle("Filtered Report").reportTags(tags).reportStatus(status).reporterId(reporterId).build());
        Query query = new Query();

        try (MockedStatic<ReportSpecification> reportSpecification = mockStatic(ReportSpecification.class)) {

            when(jwtUtils.hasAdminRole(anyString())).thenReturn(true);
            reportSpecification.when(() -> ReportSpecification.createQuery(tags, status, reporterId, null, null, null, null)).thenReturn(query);
            when(mongoTemplate.count(query, Report.class)).thenReturn((long) reportList.size());
            when(mongoTemplate.find(query.with(pageable), Report.class)).thenReturn(reportList);

            // Act
            Page<Report> result = reportService.searchReports(accToken, tags, status, reporterId, null, null, null, null, page, size, null, false);

            // Assert
            assertEquals(reportList.size(), result.getContent().size());
            when(ReportSpecification.createQuery(tags, status, reporterId, null, null, null, null)).thenReturn(query);
            verify(mongoTemplate, times(1)).count(query, Report.class);
            verify(mongoTemplate, times(1)).find(query.with(pageable), Report.class);
        }





    }


//    UPDATE REPORT STATUS TESTS

    @Test
    void updateReportStatus_reportExists_shouldUpdateStatus() throws Exception {
        // Arrange
        String accToken = "testToken";

        String reportId = "testId";
        ReportStatus newStatus = ReportStatus.UNDER_REVIEW;
        Report existingReport = Report.builder().reportId(reportId).reportStatus(ReportStatus.OPEN).build();
        when(jwtUtils.hasAdminRole(accToken)).thenReturn(true);
        when(reportRepository.findById(reportId)).thenReturn(Optional.of(existingReport));
        ArgumentCaptor<Report> reportCaptor = ArgumentCaptor.forClass(Report.class);

        // Act
        reportService.updateReportStatus(accToken, reportId, newStatus);

        // Assert
        verify(reportRepository, times(1)).findById(reportId);
        verify(reportRepository, times(1)).save(reportCaptor.capture());
        assertEquals(newStatus, reportCaptor.getValue().getReportStatus());
    }

    @Test
    void updateReportStatus_reportNotFound_shouldNotFoundException() throws Exception {
        // Arrange
        String accToken = "testToken";
        String reportId = "nonExistingId";
        ReportStatus newStatus = ReportStatus.RESOLVED;
        when(jwtUtils.hasAdminRole(anyString())).thenReturn(true);
        when(reportRepository.findById(reportId)).thenReturn(Optional.empty());

        // Act and Assert
        assertThrows(ResourceNotFoundException.class, () -> reportService.updateReportStatus(accToken, reportId, newStatus));
        verify(reportRepository, times(1)).findById(reportId);
        verify(reportRepository, never()).save(any());
    }

    @Test
    void updateReportStatus_NotAdmin_shouldThrowIllegalArgumentException() throws Exception {
        // Arrange
        String reportId = "testId";

        when(jwtUtils.hasAdminRole(anyString())).thenReturn(false);

        // Act and Assert
        assertThrows(UnauthorizedException.class, () -> reportService.updateReportStatus("testToken", reportId, ReportStatus.UNDER_REVIEW));

        verify(reportRepository, never()).findById(reportId);
        verify(reportRepository, never()).save(any());

    }

}
