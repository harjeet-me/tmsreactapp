package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.DriverService;
import com.jiotms.tmsreactapp.domain.Driver;
import com.jiotms.tmsreactapp.repository.DriverRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Driver}.
 */
@Service
@Transactional
public class DriverServiceImpl implements DriverService {

    private final Logger log = LoggerFactory.getLogger(DriverServiceImpl.class);

    private final DriverRepository driverRepository;

    public DriverServiceImpl(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    @Override
    public Driver save(Driver driver) {
        log.debug("Request to save Driver : {}", driver);
        return driverRepository.save(driver);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Driver> findAll() {
        log.debug("Request to get all Drivers");
        return driverRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Driver> findOne(Long id) {
        log.debug("Request to get Driver : {}", id);
        return driverRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Driver : {}", id);
        driverRepository.deleteById(id);
    }
}
