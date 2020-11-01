package com.jiotms.tmsreactapp.web.rest;

import com.jiotms.tmsreactapp.TmsreactappApp;
import com.jiotms.tmsreactapp.domain.AccountHistory;
import com.jiotms.tmsreactapp.repository.AccountHistoryRepository;
import com.jiotms.tmsreactapp.service.AccountHistoryService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link AccountHistoryResource} REST controller.
 */
@SpringBootTest(classes = TmsreactappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class AccountHistoryResourceIT {

    private static final String DEFAULT_ENITY_NAME = "AAAAAAAAAA";
    private static final String UPDATED_ENITY_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_ENTITY_LINK = "AAAAAAAAAA";
    private static final String UPDATED_ENTITY_LINK = "BBBBBBBBBB";

    private static final String DEFAULT_ACTION = "AAAAAAAAAA";
    private static final String UPDATED_ACTION = "BBBBBBBBBB";

    @Autowired
    private AccountHistoryRepository accountHistoryRepository;

    @Autowired
    private AccountHistoryService accountHistoryService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restAccountHistoryMockMvc;

    private AccountHistory accountHistory;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountHistory createEntity(EntityManager em) {
        AccountHistory accountHistory = new AccountHistory()
            .enityName(DEFAULT_ENITY_NAME)
            .entityLink(DEFAULT_ENTITY_LINK)
            .action(DEFAULT_ACTION);
        return accountHistory;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static AccountHistory createUpdatedEntity(EntityManager em) {
        AccountHistory accountHistory = new AccountHistory()
            .enityName(UPDATED_ENITY_NAME)
            .entityLink(UPDATED_ENTITY_LINK)
            .action(UPDATED_ACTION);
        return accountHistory;
    }

    @BeforeEach
    public void initTest() {
        accountHistory = createEntity(em);
    }

    @Test
    @Transactional
    public void createAccountHistory() throws Exception {
        int databaseSizeBeforeCreate = accountHistoryRepository.findAll().size();
        // Create the AccountHistory
        restAccountHistoryMockMvc.perform(post("/api/account-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountHistory)))
            .andExpect(status().isCreated());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeCreate + 1);
        AccountHistory testAccountHistory = accountHistoryList.get(accountHistoryList.size() - 1);
        assertThat(testAccountHistory.getEnityName()).isEqualTo(DEFAULT_ENITY_NAME);
        assertThat(testAccountHistory.getEntityLink()).isEqualTo(DEFAULT_ENTITY_LINK);
        assertThat(testAccountHistory.getAction()).isEqualTo(DEFAULT_ACTION);
    }

    @Test
    @Transactional
    public void createAccountHistoryWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = accountHistoryRepository.findAll().size();

        // Create the AccountHistory with an existing ID
        accountHistory.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restAccountHistoryMockMvc.perform(post("/api/account-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountHistory)))
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllAccountHistories() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        // Get all the accountHistoryList
        restAccountHistoryMockMvc.perform(get("/api/account-histories?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(accountHistory.getId().intValue())))
            .andExpect(jsonPath("$.[*].enityName").value(hasItem(DEFAULT_ENITY_NAME)))
            .andExpect(jsonPath("$.[*].entityLink").value(hasItem(DEFAULT_ENTITY_LINK)))
            .andExpect(jsonPath("$.[*].action").value(hasItem(DEFAULT_ACTION)));
    }
    
    @Test
    @Transactional
    public void getAccountHistory() throws Exception {
        // Initialize the database
        accountHistoryRepository.saveAndFlush(accountHistory);

        // Get the accountHistory
        restAccountHistoryMockMvc.perform(get("/api/account-histories/{id}", accountHistory.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(accountHistory.getId().intValue()))
            .andExpect(jsonPath("$.enityName").value(DEFAULT_ENITY_NAME))
            .andExpect(jsonPath("$.entityLink").value(DEFAULT_ENTITY_LINK))
            .andExpect(jsonPath("$.action").value(DEFAULT_ACTION));
    }
    @Test
    @Transactional
    public void getNonExistingAccountHistory() throws Exception {
        // Get the accountHistory
        restAccountHistoryMockMvc.perform(get("/api/account-histories/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateAccountHistory() throws Exception {
        // Initialize the database
        accountHistoryService.save(accountHistory);

        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();

        // Update the accountHistory
        AccountHistory updatedAccountHistory = accountHistoryRepository.findById(accountHistory.getId()).get();
        // Disconnect from session so that the updates on updatedAccountHistory are not directly saved in db
        em.detach(updatedAccountHistory);
        updatedAccountHistory
            .enityName(UPDATED_ENITY_NAME)
            .entityLink(UPDATED_ENTITY_LINK)
            .action(UPDATED_ACTION);

        restAccountHistoryMockMvc.perform(put("/api/account-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedAccountHistory)))
            .andExpect(status().isOk());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
        AccountHistory testAccountHistory = accountHistoryList.get(accountHistoryList.size() - 1);
        assertThat(testAccountHistory.getEnityName()).isEqualTo(UPDATED_ENITY_NAME);
        assertThat(testAccountHistory.getEntityLink()).isEqualTo(UPDATED_ENTITY_LINK);
        assertThat(testAccountHistory.getAction()).isEqualTo(UPDATED_ACTION);
    }

    @Test
    @Transactional
    public void updateNonExistingAccountHistory() throws Exception {
        int databaseSizeBeforeUpdate = accountHistoryRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restAccountHistoryMockMvc.perform(put("/api/account-histories")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(accountHistory)))
            .andExpect(status().isBadRequest());

        // Validate the AccountHistory in the database
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteAccountHistory() throws Exception {
        // Initialize the database
        accountHistoryService.save(accountHistory);

        int databaseSizeBeforeDelete = accountHistoryRepository.findAll().size();

        // Delete the accountHistory
        restAccountHistoryMockMvc.perform(delete("/api/account-histories/{id}", accountHistory.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<AccountHistory> accountHistoryList = accountHistoryRepository.findAll();
        assertThat(accountHistoryList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
