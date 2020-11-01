package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.CarrierService;
import com.jiotms.tmsreactapp.domain.Carrier;
import com.jiotms.tmsreactapp.repository.CarrierRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Carrier}.
 */
@Service
@Transactional
public class CarrierServiceImpl implements CarrierService {

    private final Logger log = LoggerFactory.getLogger(CarrierServiceImpl.class);

    private final CarrierRepository carrierRepository;

    public CarrierServiceImpl(CarrierRepository carrierRepository) {
        this.carrierRepository = carrierRepository;
    }

    @Override
    public Carrier save(Carrier carrier) {
        log.debug("Request to save Carrier : {}", carrier);
        return carrierRepository.save(carrier);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Carrier> findAll() {
        log.debug("Request to get all Carriers");
        return carrierRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Carrier> findOne(Long id) {
        log.debug("Request to get Carrier : {}", id);
        return carrierRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Carrier : {}", id);
        carrierRepository.deleteById(id);
    }
}
