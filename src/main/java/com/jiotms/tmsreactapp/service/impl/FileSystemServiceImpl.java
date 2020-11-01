package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.FileSystemService;
import com.jiotms.tmsreactapp.domain.FileSystem;
import com.jiotms.tmsreactapp.repository.FileSystemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link FileSystem}.
 */
@Service
@Transactional
public class FileSystemServiceImpl implements FileSystemService {

    private final Logger log = LoggerFactory.getLogger(FileSystemServiceImpl.class);

    private final FileSystemRepository fileSystemRepository;

    public FileSystemServiceImpl(FileSystemRepository fileSystemRepository) {
        this.fileSystemRepository = fileSystemRepository;
    }

    @Override
    public FileSystem save(FileSystem fileSystem) {
        log.debug("Request to save FileSystem : {}", fileSystem);
        return fileSystemRepository.save(fileSystem);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<FileSystem> findAll(Pageable pageable) {
        log.debug("Request to get all FileSystems");
        return fileSystemRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<FileSystem> findOne(Long id) {
        log.debug("Request to get FileSystem : {}", id);
        return fileSystemRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete FileSystem : {}", id);
        fileSystemRepository.deleteById(id);
    }
}
