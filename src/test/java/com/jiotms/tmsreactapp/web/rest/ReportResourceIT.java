package com.jiotms.tmsreactapp.web.rest;

import com.jiotms.tmsreactapp.TmsreactappApp;
import com.jiotms.tmsreactapp.domain.Report;
import com.jiotms.tmsreactapp.repository.ReportRepository;
import com.jiotms.tmsreactapp.service.ReportService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.Instant;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.jiotms.tmsreactapp.domain.enumeration.ReportType;
/**
 * Integration tests for the {@link ReportResource} REST controller.
 */
@SpringBootTest(classes = TmsreactappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class ReportResourceIT {

    private static final ReportType DEFAULT_REPORT_TYPE = ReportType.INV_STMT_OF_CUSTOMER;
    private static final ReportType UPDATED_REPORT_TYPE = ReportType.TRIP_STMT_OF_CUSTOMER;

    private static final String DEFAULT_DESCRIPTION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPTION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_FROM_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FROM_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_TO_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_TO_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_EMAIL_TO = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL_TO = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private ReportRepository reportRepository;

    @Autowired
    private ReportService reportService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restReportMockMvc;

    private Report report;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Report createEntity(EntityManager em) {
        Report report = new Report()
            .reportType(DEFAULT_REPORT_TYPE)
            .description(DEFAULT_DESCRIPTION)
            .fromDate(DEFAULT_FROM_DATE)
            .toDate(DEFAULT_TO_DATE)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE)
            .emailTo(DEFAULT_EMAIL_TO)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return report;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Report createUpdatedEntity(EntityManager em) {
        Report report = new Report()
            .reportType(UPDATED_REPORT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .emailTo(UPDATED_EMAIL_TO)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return report;
    }

    @BeforeEach
    public void initTest() {
        report = createEntity(em);
    }

    @Test
    @Transactional
    public void createReport() throws Exception {
        int databaseSizeBeforeCreate = reportRepository.findAll().size();
        // Create the Report
        restReportMockMvc.perform(post("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isCreated());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeCreate + 1);
        Report testReport = reportList.get(reportList.size() - 1);
        assertThat(testReport.getReportType()).isEqualTo(DEFAULT_REPORT_TYPE);
        assertThat(testReport.getDescription()).isEqualTo(DEFAULT_DESCRIPTION);
        assertThat(testReport.getFromDate()).isEqualTo(DEFAULT_FROM_DATE);
        assertThat(testReport.getToDate()).isEqualTo(DEFAULT_TO_DATE);
        assertThat(testReport.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testReport.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testReport.getEmailTo()).isEqualTo(DEFAULT_EMAIL_TO);
        assertThat(testReport.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testReport.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testReport.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testReport.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createReportWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = reportRepository.findAll().size();

        // Create the Report with an existing ID
        report.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restReportMockMvc.perform(post("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isBadRequest());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllReports() throws Exception {
        // Initialize the database
        reportRepository.saveAndFlush(report);

        // Get all the reportList
        restReportMockMvc.perform(get("/api/reports?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(report.getId().intValue())))
            .andExpect(jsonPath("$.[*].reportType").value(hasItem(DEFAULT_REPORT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].description").value(hasItem(DEFAULT_DESCRIPTION)))
            .andExpect(jsonPath("$.[*].fromDate").value(hasItem(DEFAULT_FROM_DATE.toString())))
            .andExpect(jsonPath("$.[*].toDate").value(hasItem(DEFAULT_TO_DATE.toString())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].emailTo").value(hasItem(DEFAULT_EMAIL_TO)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }
    
    @Test
    @Transactional
    public void getReport() throws Exception {
        // Initialize the database
        reportRepository.saveAndFlush(report);

        // Get the report
        restReportMockMvc.perform(get("/api/reports/{id}", report.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(report.getId().intValue()))
            .andExpect(jsonPath("$.reportType").value(DEFAULT_REPORT_TYPE.toString()))
            .andExpect(jsonPath("$.description").value(DEFAULT_DESCRIPTION))
            .andExpect(jsonPath("$.fromDate").value(DEFAULT_FROM_DATE.toString()))
            .andExpect(jsonPath("$.toDate").value(DEFAULT_TO_DATE.toString()))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .andExpect(jsonPath("$.emailTo").value(DEFAULT_EMAIL_TO))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingReport() throws Exception {
        // Get the report
        restReportMockMvc.perform(get("/api/reports/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateReport() throws Exception {
        // Initialize the database
        reportService.save(report);

        int databaseSizeBeforeUpdate = reportRepository.findAll().size();

        // Update the report
        Report updatedReport = reportRepository.findById(report.getId()).get();
        // Disconnect from session so that the updates on updatedReport are not directly saved in db
        em.detach(updatedReport);
        updatedReport
            .reportType(UPDATED_REPORT_TYPE)
            .description(UPDATED_DESCRIPTION)
            .fromDate(UPDATED_FROM_DATE)
            .toDate(UPDATED_TO_DATE)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .emailTo(UPDATED_EMAIL_TO)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restReportMockMvc.perform(put("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedReport)))
            .andExpect(status().isOk());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeUpdate);
        Report testReport = reportList.get(reportList.size() - 1);
        assertThat(testReport.getReportType()).isEqualTo(UPDATED_REPORT_TYPE);
        assertThat(testReport.getDescription()).isEqualTo(UPDATED_DESCRIPTION);
        assertThat(testReport.getFromDate()).isEqualTo(UPDATED_FROM_DATE);
        assertThat(testReport.getToDate()).isEqualTo(UPDATED_TO_DATE);
        assertThat(testReport.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testReport.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testReport.getEmailTo()).isEqualTo(UPDATED_EMAIL_TO);
        assertThat(testReport.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testReport.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testReport.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testReport.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingReport() throws Exception {
        int databaseSizeBeforeUpdate = reportRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restReportMockMvc.perform(put("/api/reports")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(report)))
            .andExpect(status().isBadRequest());

        // Validate the Report in the database
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteReport() throws Exception {
        // Initialize the database
        reportService.save(report);

        int databaseSizeBeforeDelete = reportRepository.findAll().size();

        // Delete the report
        restReportMockMvc.perform(delete("/api/reports/{id}", report.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Report> reportList = reportRepository.findAll();
        assertThat(reportList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
