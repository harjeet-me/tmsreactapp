package com.jiotms.tmsreactapp.web.rest;

import com.jiotms.tmsreactapp.TmsreactappApp;
import com.jiotms.tmsreactapp.domain.Insurance;
import com.jiotms.tmsreactapp.repository.InsuranceRepository;
import com.jiotms.tmsreactapp.service.InsuranceService;

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

/**
 * Integration tests for the {@link InsuranceResource} REST controller.
 */
@SpringBootTest(classes = TmsreactappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class InsuranceResourceIT {

    private static final String DEFAULT_PROVIDER_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROVIDER_NAME = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_ISSUE_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_ISSUE_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_EXPIRY_DATE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_EXPIRY_DATE = LocalDate.now(ZoneId.systemDefault());

    private static final byte[] DEFAULT_POLICY_DOCUMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_POLICY_DOCUMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_POLICY_DOCUMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_POLICY_DOCUMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_COVERAGE_STATEMENT = "AAAAAAAAAA";
    private static final String UPDATED_COVERAGE_STATEMENT = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private InsuranceRepository insuranceRepository;

    @Autowired
    private InsuranceService insuranceService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restInsuranceMockMvc;

    private Insurance insurance;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Insurance createEntity(EntityManager em) {
        Insurance insurance = new Insurance()
            .providerName(DEFAULT_PROVIDER_NAME)
            .issueDate(DEFAULT_ISSUE_DATE)
            .expiryDate(DEFAULT_EXPIRY_DATE)
            .policyDocument(DEFAULT_POLICY_DOCUMENT)
            .policyDocumentContentType(DEFAULT_POLICY_DOCUMENT_CONTENT_TYPE)
            .coverageStatement(DEFAULT_COVERAGE_STATEMENT)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return insurance;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Insurance createUpdatedEntity(EntityManager em) {
        Insurance insurance = new Insurance()
            .providerName(UPDATED_PROVIDER_NAME)
            .issueDate(UPDATED_ISSUE_DATE)
            .expiryDate(UPDATED_EXPIRY_DATE)
            .policyDocument(UPDATED_POLICY_DOCUMENT)
            .policyDocumentContentType(UPDATED_POLICY_DOCUMENT_CONTENT_TYPE)
            .coverageStatement(UPDATED_COVERAGE_STATEMENT)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return insurance;
    }

    @BeforeEach
    public void initTest() {
        insurance = createEntity(em);
    }

    @Test
    @Transactional
    public void createInsurance() throws Exception {
        int databaseSizeBeforeCreate = insuranceRepository.findAll().size();
        // Create the Insurance
        restInsuranceMockMvc.perform(post("/api/insurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurance)))
            .andExpect(status().isCreated());

        // Validate the Insurance in the database
        List<Insurance> insuranceList = insuranceRepository.findAll();
        assertThat(insuranceList).hasSize(databaseSizeBeforeCreate + 1);
        Insurance testInsurance = insuranceList.get(insuranceList.size() - 1);
        assertThat(testInsurance.getProviderName()).isEqualTo(DEFAULT_PROVIDER_NAME);
        assertThat(testInsurance.getIssueDate()).isEqualTo(DEFAULT_ISSUE_DATE);
        assertThat(testInsurance.getExpiryDate()).isEqualTo(DEFAULT_EXPIRY_DATE);
        assertThat(testInsurance.getPolicyDocument()).isEqualTo(DEFAULT_POLICY_DOCUMENT);
        assertThat(testInsurance.getPolicyDocumentContentType()).isEqualTo(DEFAULT_POLICY_DOCUMENT_CONTENT_TYPE);
        assertThat(testInsurance.getCoverageStatement()).isEqualTo(DEFAULT_COVERAGE_STATEMENT);
        assertThat(testInsurance.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testInsurance.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testInsurance.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testInsurance.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createInsuranceWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = insuranceRepository.findAll().size();

        // Create the Insurance with an existing ID
        insurance.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restInsuranceMockMvc.perform(post("/api/insurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurance)))
            .andExpect(status().isBadRequest());

        // Validate the Insurance in the database
        List<Insurance> insuranceList = insuranceRepository.findAll();
        assertThat(insuranceList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllInsurances() throws Exception {
        // Initialize the database
        insuranceRepository.saveAndFlush(insurance);

        // Get all the insuranceList
        restInsuranceMockMvc.perform(get("/api/insurances?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(insurance.getId().intValue())))
            .andExpect(jsonPath("$.[*].providerName").value(hasItem(DEFAULT_PROVIDER_NAME)))
            .andExpect(jsonPath("$.[*].issueDate").value(hasItem(DEFAULT_ISSUE_DATE.toString())))
            .andExpect(jsonPath("$.[*].expiryDate").value(hasItem(DEFAULT_EXPIRY_DATE.toString())))
            .andExpect(jsonPath("$.[*].policyDocumentContentType").value(hasItem(DEFAULT_POLICY_DOCUMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].policyDocument").value(hasItem(Base64Utils.encodeToString(DEFAULT_POLICY_DOCUMENT))))
            .andExpect(jsonPath("$.[*].coverageStatement").value(hasItem(DEFAULT_COVERAGE_STATEMENT)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }
    
    @Test
    @Transactional
    public void getInsurance() throws Exception {
        // Initialize the database
        insuranceRepository.saveAndFlush(insurance);

        // Get the insurance
        restInsuranceMockMvc.perform(get("/api/insurances/{id}", insurance.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(insurance.getId().intValue()))
            .andExpect(jsonPath("$.providerName").value(DEFAULT_PROVIDER_NAME))
            .andExpect(jsonPath("$.issueDate").value(DEFAULT_ISSUE_DATE.toString()))
            .andExpect(jsonPath("$.expiryDate").value(DEFAULT_EXPIRY_DATE.toString()))
            .andExpect(jsonPath("$.policyDocumentContentType").value(DEFAULT_POLICY_DOCUMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.policyDocument").value(Base64Utils.encodeToString(DEFAULT_POLICY_DOCUMENT)))
            .andExpect(jsonPath("$.coverageStatement").value(DEFAULT_COVERAGE_STATEMENT))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingInsurance() throws Exception {
        // Get the insurance
        restInsuranceMockMvc.perform(get("/api/insurances/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateInsurance() throws Exception {
        // Initialize the database
        insuranceService.save(insurance);

        int databaseSizeBeforeUpdate = insuranceRepository.findAll().size();

        // Update the insurance
        Insurance updatedInsurance = insuranceRepository.findById(insurance.getId()).get();
        // Disconnect from session so that the updates on updatedInsurance are not directly saved in db
        em.detach(updatedInsurance);
        updatedInsurance
            .providerName(UPDATED_PROVIDER_NAME)
            .issueDate(UPDATED_ISSUE_DATE)
            .expiryDate(UPDATED_EXPIRY_DATE)
            .policyDocument(UPDATED_POLICY_DOCUMENT)
            .policyDocumentContentType(UPDATED_POLICY_DOCUMENT_CONTENT_TYPE)
            .coverageStatement(UPDATED_COVERAGE_STATEMENT)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restInsuranceMockMvc.perform(put("/api/insurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedInsurance)))
            .andExpect(status().isOk());

        // Validate the Insurance in the database
        List<Insurance> insuranceList = insuranceRepository.findAll();
        assertThat(insuranceList).hasSize(databaseSizeBeforeUpdate);
        Insurance testInsurance = insuranceList.get(insuranceList.size() - 1);
        assertThat(testInsurance.getProviderName()).isEqualTo(UPDATED_PROVIDER_NAME);
        assertThat(testInsurance.getIssueDate()).isEqualTo(UPDATED_ISSUE_DATE);
        assertThat(testInsurance.getExpiryDate()).isEqualTo(UPDATED_EXPIRY_DATE);
        assertThat(testInsurance.getPolicyDocument()).isEqualTo(UPDATED_POLICY_DOCUMENT);
        assertThat(testInsurance.getPolicyDocumentContentType()).isEqualTo(UPDATED_POLICY_DOCUMENT_CONTENT_TYPE);
        assertThat(testInsurance.getCoverageStatement()).isEqualTo(UPDATED_COVERAGE_STATEMENT);
        assertThat(testInsurance.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testInsurance.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testInsurance.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testInsurance.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingInsurance() throws Exception {
        int databaseSizeBeforeUpdate = insuranceRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restInsuranceMockMvc.perform(put("/api/insurances")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(insurance)))
            .andExpect(status().isBadRequest());

        // Validate the Insurance in the database
        List<Insurance> insuranceList = insuranceRepository.findAll();
        assertThat(insuranceList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteInsurance() throws Exception {
        // Initialize the database
        insuranceService.save(insurance);

        int databaseSizeBeforeDelete = insuranceRepository.findAll().size();

        // Delete the insurance
        restInsuranceMockMvc.perform(delete("/api/insurances/{id}", insurance.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Insurance> insuranceList = insuranceRepository.findAll();
        assertThat(insuranceList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
