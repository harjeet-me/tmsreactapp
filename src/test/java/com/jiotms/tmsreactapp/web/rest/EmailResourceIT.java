package com.jiotms.tmsreactapp.web.rest;

import com.jiotms.tmsreactapp.TmsreactappApp;
import com.jiotms.tmsreactapp.domain.Email;
import com.jiotms.tmsreactapp.repository.EmailRepository;
import com.jiotms.tmsreactapp.service.EmailService;

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
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link EmailResource} REST controller.
 */
@SpringBootTest(classes = TmsreactappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class EmailResourceIT {

    private static final String DEFAULT_USERTO = "AAAAAAAAAA";
    private static final String UPDATED_USERTO = "BBBBBBBBBB";

    private static final String DEFAULT_USERCC = "AAAAAAAAAA";
    private static final String UPDATED_USERCC = "BBBBBBBBBB";

    private static final String DEFAULT_USERBCC = "AAAAAAAAAA";
    private static final String UPDATED_USERBCC = "BBBBBBBBBB";

    private static final String DEFAULT_SUBJECT = "AAAAAAAAAA";
    private static final String UPDATED_SUBJECT = "BBBBBBBBBB";

    private static final String DEFAULT_MESSAGE = "AAAAAAAAAA";
    private static final String UPDATED_MESSAGE = "BBBBBBBBBB";

    private static final Boolean DEFAULT_MULTIPART = false;
    private static final Boolean UPDATED_MULTIPART = true;

    private static final Boolean DEFAULT_HTML_BODY = false;
    private static final Boolean UPDATED_HTML_BODY = true;

    private static final byte[] DEFAULT_ATTACHMENT = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_ATTACHMENT = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_ATTACHMENT_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_ATTACHMENT_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_ATTACHMENT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ATTACHMENT_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_STATUS = "AAAAAAAAAA";
    private static final String UPDATED_STATUS = "BBBBBBBBBB";

    private static final Instant DEFAULT_SENT_DATE_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_SENT_DATE_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restEmailMockMvc;

    private Email email;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Email createEntity(EntityManager em) {
        Email email = new Email()
            .userto(DEFAULT_USERTO)
            .usercc(DEFAULT_USERCC)
            .userbcc(DEFAULT_USERBCC)
            .subject(DEFAULT_SUBJECT)
            .message(DEFAULT_MESSAGE)
            .multipart(DEFAULT_MULTIPART)
            .htmlBody(DEFAULT_HTML_BODY)
            .attachment(DEFAULT_ATTACHMENT)
            .attachmentContentType(DEFAULT_ATTACHMENT_CONTENT_TYPE)
            .attachmentName(DEFAULT_ATTACHMENT_NAME)
            .status(DEFAULT_STATUS)
            .sentDateTime(DEFAULT_SENT_DATE_TIME)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return email;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Email createUpdatedEntity(EntityManager em) {
        Email email = new Email()
            .userto(UPDATED_USERTO)
            .usercc(UPDATED_USERCC)
            .userbcc(UPDATED_USERBCC)
            .subject(UPDATED_SUBJECT)
            .message(UPDATED_MESSAGE)
            .multipart(UPDATED_MULTIPART)
            .htmlBody(UPDATED_HTML_BODY)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .attachmentName(UPDATED_ATTACHMENT_NAME)
            .status(UPDATED_STATUS)
            .sentDateTime(UPDATED_SENT_DATE_TIME)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return email;
    }

    @BeforeEach
    public void initTest() {
        email = createEntity(em);
    }

    @Test
    @Transactional
    public void createEmail() throws Exception {
        int databaseSizeBeforeCreate = emailRepository.findAll().size();
        // Create the Email
        restEmailMockMvc.perform(post("/api/emails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isCreated());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeCreate + 1);
        Email testEmail = emailList.get(emailList.size() - 1);
        assertThat(testEmail.getUserto()).isEqualTo(DEFAULT_USERTO);
        assertThat(testEmail.getUsercc()).isEqualTo(DEFAULT_USERCC);
        assertThat(testEmail.getUserbcc()).isEqualTo(DEFAULT_USERBCC);
        assertThat(testEmail.getSubject()).isEqualTo(DEFAULT_SUBJECT);
        assertThat(testEmail.getMessage()).isEqualTo(DEFAULT_MESSAGE);
        assertThat(testEmail.isMultipart()).isEqualTo(DEFAULT_MULTIPART);
        assertThat(testEmail.isHtmlBody()).isEqualTo(DEFAULT_HTML_BODY);
        assertThat(testEmail.getAttachment()).isEqualTo(DEFAULT_ATTACHMENT);
        assertThat(testEmail.getAttachmentContentType()).isEqualTo(DEFAULT_ATTACHMENT_CONTENT_TYPE);
        assertThat(testEmail.getAttachmentName()).isEqualTo(DEFAULT_ATTACHMENT_NAME);
        assertThat(testEmail.getStatus()).isEqualTo(DEFAULT_STATUS);
        assertThat(testEmail.getSentDateTime()).isEqualTo(DEFAULT_SENT_DATE_TIME);
        assertThat(testEmail.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testEmail.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testEmail.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testEmail.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createEmailWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = emailRepository.findAll().size();

        // Create the Email with an existing ID
        email.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restEmailMockMvc.perform(post("/api/emails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isBadRequest());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllEmails() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);

        // Get all the emailList
        restEmailMockMvc.perform(get("/api/emails?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(email.getId().intValue())))
            .andExpect(jsonPath("$.[*].userto").value(hasItem(DEFAULT_USERTO)))
            .andExpect(jsonPath("$.[*].usercc").value(hasItem(DEFAULT_USERCC)))
            .andExpect(jsonPath("$.[*].userbcc").value(hasItem(DEFAULT_USERBCC)))
            .andExpect(jsonPath("$.[*].subject").value(hasItem(DEFAULT_SUBJECT)))
            .andExpect(jsonPath("$.[*].message").value(hasItem(DEFAULT_MESSAGE)))
            .andExpect(jsonPath("$.[*].multipart").value(hasItem(DEFAULT_MULTIPART.booleanValue())))
            .andExpect(jsonPath("$.[*].htmlBody").value(hasItem(DEFAULT_HTML_BODY.booleanValue())))
            .andExpect(jsonPath("$.[*].attachmentContentType").value(hasItem(DEFAULT_ATTACHMENT_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].attachment").value(hasItem(Base64Utils.encodeToString(DEFAULT_ATTACHMENT))))
            .andExpect(jsonPath("$.[*].attachmentName").value(hasItem(DEFAULT_ATTACHMENT_NAME)))
            .andExpect(jsonPath("$.[*].status").value(hasItem(DEFAULT_STATUS)))
            .andExpect(jsonPath("$.[*].sentDateTime").value(hasItem(DEFAULT_SENT_DATE_TIME.toString())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }
    
    @Test
    @Transactional
    public void getEmail() throws Exception {
        // Initialize the database
        emailRepository.saveAndFlush(email);

        // Get the email
        restEmailMockMvc.perform(get("/api/emails/{id}", email.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(email.getId().intValue()))
            .andExpect(jsonPath("$.userto").value(DEFAULT_USERTO))
            .andExpect(jsonPath("$.usercc").value(DEFAULT_USERCC))
            .andExpect(jsonPath("$.userbcc").value(DEFAULT_USERBCC))
            .andExpect(jsonPath("$.subject").value(DEFAULT_SUBJECT))
            .andExpect(jsonPath("$.message").value(DEFAULT_MESSAGE))
            .andExpect(jsonPath("$.multipart").value(DEFAULT_MULTIPART.booleanValue()))
            .andExpect(jsonPath("$.htmlBody").value(DEFAULT_HTML_BODY.booleanValue()))
            .andExpect(jsonPath("$.attachmentContentType").value(DEFAULT_ATTACHMENT_CONTENT_TYPE))
            .andExpect(jsonPath("$.attachment").value(Base64Utils.encodeToString(DEFAULT_ATTACHMENT)))
            .andExpect(jsonPath("$.attachmentName").value(DEFAULT_ATTACHMENT_NAME))
            .andExpect(jsonPath("$.status").value(DEFAULT_STATUS))
            .andExpect(jsonPath("$.sentDateTime").value(DEFAULT_SENT_DATE_TIME.toString()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingEmail() throws Exception {
        // Get the email
        restEmailMockMvc.perform(get("/api/emails/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateEmail() throws Exception {
        // Initialize the database
        emailService.save(email);

        int databaseSizeBeforeUpdate = emailRepository.findAll().size();

        // Update the email
        Email updatedEmail = emailRepository.findById(email.getId()).get();
        // Disconnect from session so that the updates on updatedEmail are not directly saved in db
        em.detach(updatedEmail);
        updatedEmail
            .userto(UPDATED_USERTO)
            .usercc(UPDATED_USERCC)
            .userbcc(UPDATED_USERBCC)
            .subject(UPDATED_SUBJECT)
            .message(UPDATED_MESSAGE)
            .multipart(UPDATED_MULTIPART)
            .htmlBody(UPDATED_HTML_BODY)
            .attachment(UPDATED_ATTACHMENT)
            .attachmentContentType(UPDATED_ATTACHMENT_CONTENT_TYPE)
            .attachmentName(UPDATED_ATTACHMENT_NAME)
            .status(UPDATED_STATUS)
            .sentDateTime(UPDATED_SENT_DATE_TIME)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restEmailMockMvc.perform(put("/api/emails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedEmail)))
            .andExpect(status().isOk());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeUpdate);
        Email testEmail = emailList.get(emailList.size() - 1);
        assertThat(testEmail.getUserto()).isEqualTo(UPDATED_USERTO);
        assertThat(testEmail.getUsercc()).isEqualTo(UPDATED_USERCC);
        assertThat(testEmail.getUserbcc()).isEqualTo(UPDATED_USERBCC);
        assertThat(testEmail.getSubject()).isEqualTo(UPDATED_SUBJECT);
        assertThat(testEmail.getMessage()).isEqualTo(UPDATED_MESSAGE);
        assertThat(testEmail.isMultipart()).isEqualTo(UPDATED_MULTIPART);
        assertThat(testEmail.isHtmlBody()).isEqualTo(UPDATED_HTML_BODY);
        assertThat(testEmail.getAttachment()).isEqualTo(UPDATED_ATTACHMENT);
        assertThat(testEmail.getAttachmentContentType()).isEqualTo(UPDATED_ATTACHMENT_CONTENT_TYPE);
        assertThat(testEmail.getAttachmentName()).isEqualTo(UPDATED_ATTACHMENT_NAME);
        assertThat(testEmail.getStatus()).isEqualTo(UPDATED_STATUS);
        assertThat(testEmail.getSentDateTime()).isEqualTo(UPDATED_SENT_DATE_TIME);
        assertThat(testEmail.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testEmail.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testEmail.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testEmail.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingEmail() throws Exception {
        int databaseSizeBeforeUpdate = emailRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restEmailMockMvc.perform(put("/api/emails")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(email)))
            .andExpect(status().isBadRequest());

        // Validate the Email in the database
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteEmail() throws Exception {
        // Initialize the database
        emailService.save(email);

        int databaseSizeBeforeDelete = emailRepository.findAll().size();

        // Delete the email
        restEmailMockMvc.perform(delete("/api/emails/{id}", email.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Email> emailList = emailRepository.findAll();
        assertThat(emailList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
