package com.jiotms.tmsreactapp.web.rest;

import com.jiotms.tmsreactapp.TmsreactappApp;
import com.jiotms.tmsreactapp.domain.FileSystem;
import com.jiotms.tmsreactapp.repository.FileSystemRepository;
import com.jiotms.tmsreactapp.service.FileSystemService;

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
 * Integration tests for the {@link FileSystemResource} REST controller.
 */
@SpringBootTest(classes = TmsreactappApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class FileSystemResourceIT {

    private static final byte[] DEFAULT_FILE_DATA = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_FILE_DATA = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_FILE_DATA_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_FILE_DATA_CONTENT_TYPE = "image/png";

    private static final String DEFAULT_FILE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_FILE_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_CREATED_BY = "AAAAAAAAAA";
    private static final String UPDATED_CREATED_BY = "BBBBBBBBBB";

    private static final Instant DEFAULT_LAST_MODIFIED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_LAST_MODIFIED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_LAST_MODIFIED_BY = "AAAAAAAAAA";
    private static final String UPDATED_LAST_MODIFIED_BY = "BBBBBBBBBB";

    @Autowired
    private FileSystemRepository fileSystemRepository;

    @Autowired
    private FileSystemService fileSystemService;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restFileSystemMockMvc;

    private FileSystem fileSystem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FileSystem createEntity(EntityManager em) {
        FileSystem fileSystem = new FileSystem()
            .fileData(DEFAULT_FILE_DATA)
            .fileDataContentType(DEFAULT_FILE_DATA_CONTENT_TYPE)
            .fileName(DEFAULT_FILE_NAME)
            .createdDate(DEFAULT_CREATED_DATE)
            .createdBy(DEFAULT_CREATED_BY)
            .lastModifiedDate(DEFAULT_LAST_MODIFIED_DATE)
            .lastModifiedBy(DEFAULT_LAST_MODIFIED_BY);
        return fileSystem;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static FileSystem createUpdatedEntity(EntityManager em) {
        FileSystem fileSystem = new FileSystem()
            .fileData(UPDATED_FILE_DATA)
            .fileDataContentType(UPDATED_FILE_DATA_CONTENT_TYPE)
            .fileName(UPDATED_FILE_NAME)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);
        return fileSystem;
    }

    @BeforeEach
    public void initTest() {
        fileSystem = createEntity(em);
    }

    @Test
    @Transactional
    public void createFileSystem() throws Exception {
        int databaseSizeBeforeCreate = fileSystemRepository.findAll().size();
        // Create the FileSystem
        restFileSystemMockMvc.perform(post("/api/file-systems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fileSystem)))
            .andExpect(status().isCreated());

        // Validate the FileSystem in the database
        List<FileSystem> fileSystemList = fileSystemRepository.findAll();
        assertThat(fileSystemList).hasSize(databaseSizeBeforeCreate + 1);
        FileSystem testFileSystem = fileSystemList.get(fileSystemList.size() - 1);
        assertThat(testFileSystem.getFileData()).isEqualTo(DEFAULT_FILE_DATA);
        assertThat(testFileSystem.getFileDataContentType()).isEqualTo(DEFAULT_FILE_DATA_CONTENT_TYPE);
        assertThat(testFileSystem.getFileName()).isEqualTo(DEFAULT_FILE_NAME);
        assertThat(testFileSystem.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testFileSystem.getCreatedBy()).isEqualTo(DEFAULT_CREATED_BY);
        assertThat(testFileSystem.getLastModifiedDate()).isEqualTo(DEFAULT_LAST_MODIFIED_DATE);
        assertThat(testFileSystem.getLastModifiedBy()).isEqualTo(DEFAULT_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void createFileSystemWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = fileSystemRepository.findAll().size();

        // Create the FileSystem with an existing ID
        fileSystem.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restFileSystemMockMvc.perform(post("/api/file-systems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fileSystem)))
            .andExpect(status().isBadRequest());

        // Validate the FileSystem in the database
        List<FileSystem> fileSystemList = fileSystemRepository.findAll();
        assertThat(fileSystemList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllFileSystems() throws Exception {
        // Initialize the database
        fileSystemRepository.saveAndFlush(fileSystem);

        // Get all the fileSystemList
        restFileSystemMockMvc.perform(get("/api/file-systems?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(fileSystem.getId().intValue())))
            .andExpect(jsonPath("$.[*].fileDataContentType").value(hasItem(DEFAULT_FILE_DATA_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].fileData").value(hasItem(Base64Utils.encodeToString(DEFAULT_FILE_DATA))))
            .andExpect(jsonPath("$.[*].fileName").value(hasItem(DEFAULT_FILE_NAME)))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].createdBy").value(hasItem(DEFAULT_CREATED_BY)))
            .andExpect(jsonPath("$.[*].lastModifiedDate").value(hasItem(DEFAULT_LAST_MODIFIED_DATE.toString())))
            .andExpect(jsonPath("$.[*].lastModifiedBy").value(hasItem(DEFAULT_LAST_MODIFIED_BY)));
    }
    
    @Test
    @Transactional
    public void getFileSystem() throws Exception {
        // Initialize the database
        fileSystemRepository.saveAndFlush(fileSystem);

        // Get the fileSystem
        restFileSystemMockMvc.perform(get("/api/file-systems/{id}", fileSystem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(fileSystem.getId().intValue()))
            .andExpect(jsonPath("$.fileDataContentType").value(DEFAULT_FILE_DATA_CONTENT_TYPE))
            .andExpect(jsonPath("$.fileData").value(Base64Utils.encodeToString(DEFAULT_FILE_DATA)))
            .andExpect(jsonPath("$.fileName").value(DEFAULT_FILE_NAME))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.createdBy").value(DEFAULT_CREATED_BY))
            .andExpect(jsonPath("$.lastModifiedDate").value(DEFAULT_LAST_MODIFIED_DATE.toString()))
            .andExpect(jsonPath("$.lastModifiedBy").value(DEFAULT_LAST_MODIFIED_BY));
    }
    @Test
    @Transactional
    public void getNonExistingFileSystem() throws Exception {
        // Get the fileSystem
        restFileSystemMockMvc.perform(get("/api/file-systems/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateFileSystem() throws Exception {
        // Initialize the database
        fileSystemService.save(fileSystem);

        int databaseSizeBeforeUpdate = fileSystemRepository.findAll().size();

        // Update the fileSystem
        FileSystem updatedFileSystem = fileSystemRepository.findById(fileSystem.getId()).get();
        // Disconnect from session so that the updates on updatedFileSystem are not directly saved in db
        em.detach(updatedFileSystem);
        updatedFileSystem
            .fileData(UPDATED_FILE_DATA)
            .fileDataContentType(UPDATED_FILE_DATA_CONTENT_TYPE)
            .fileName(UPDATED_FILE_NAME)
            .createdDate(UPDATED_CREATED_DATE)
            .createdBy(UPDATED_CREATED_BY)
            .lastModifiedDate(UPDATED_LAST_MODIFIED_DATE)
            .lastModifiedBy(UPDATED_LAST_MODIFIED_BY);

        restFileSystemMockMvc.perform(put("/api/file-systems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedFileSystem)))
            .andExpect(status().isOk());

        // Validate the FileSystem in the database
        List<FileSystem> fileSystemList = fileSystemRepository.findAll();
        assertThat(fileSystemList).hasSize(databaseSizeBeforeUpdate);
        FileSystem testFileSystem = fileSystemList.get(fileSystemList.size() - 1);
        assertThat(testFileSystem.getFileData()).isEqualTo(UPDATED_FILE_DATA);
        assertThat(testFileSystem.getFileDataContentType()).isEqualTo(UPDATED_FILE_DATA_CONTENT_TYPE);
        assertThat(testFileSystem.getFileName()).isEqualTo(UPDATED_FILE_NAME);
        assertThat(testFileSystem.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testFileSystem.getCreatedBy()).isEqualTo(UPDATED_CREATED_BY);
        assertThat(testFileSystem.getLastModifiedDate()).isEqualTo(UPDATED_LAST_MODIFIED_DATE);
        assertThat(testFileSystem.getLastModifiedBy()).isEqualTo(UPDATED_LAST_MODIFIED_BY);
    }

    @Test
    @Transactional
    public void updateNonExistingFileSystem() throws Exception {
        int databaseSizeBeforeUpdate = fileSystemRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restFileSystemMockMvc.perform(put("/api/file-systems")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(fileSystem)))
            .andExpect(status().isBadRequest());

        // Validate the FileSystem in the database
        List<FileSystem> fileSystemList = fileSystemRepository.findAll();
        assertThat(fileSystemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteFileSystem() throws Exception {
        // Initialize the database
        fileSystemService.save(fileSystem);

        int databaseSizeBeforeDelete = fileSystemRepository.findAll().size();

        // Delete the fileSystem
        restFileSystemMockMvc.perform(delete("/api/file-systems/{id}", fileSystem.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<FileSystem> fileSystemList = fileSystemRepository.findAll();
        assertThat(fileSystemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
