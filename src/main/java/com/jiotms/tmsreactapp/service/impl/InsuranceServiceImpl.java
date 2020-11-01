package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.InsuranceService;
import com.jiotms.tmsreactapp.domain.Insurance;
import com.jiotms.tmsreactapp.repository.InsuranceRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

/**
 * Service Implementation for managing {@link Insurance}.
 */
@Service
@Transactional
public class InsuranceServiceImpl implements InsuranceService {

    private final Logger log = LoggerFactory.getLogger(InsuranceServiceImpl.class);

    private final InsuranceRepository insuranceRepository;

    public InsuranceServiceImpl(InsuranceRepository insuranceRepository) {
        this.insuranceRepository = insuranceRepository;
    }

    @Override
    public Insurance save(Insurance insurance) {
        log.debug("Request to save Insurance : {}", insurance);
        return insuranceRepository.save(insurance);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Insurance> findAll() {
        log.debug("Request to get all Insurances");
        return insuranceRepository.findAll();
    }



    /**
     *  Get all the insurances where Carrier is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true) 
    public List<Insurance> findAllWhereCarrierIsNull() {
        log.debug("Request to get all insurances where Carrier is null");
        return StreamSupport
            .stream(insuranceRepository.findAll().spliterator(), false)
            .filter(insurance -> insurance.getCarrier() == null)
            .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Insurance> findOne(Long id) {
        log.debug("Request to get Insurance : {}", id);
        return insuranceRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Insurance : {}", id);
        insuranceRepository.deleteById(id);
    }
}
