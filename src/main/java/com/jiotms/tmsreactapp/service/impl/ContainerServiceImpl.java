package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.ContainerService;
import com.jiotms.tmsreactapp.domain.Container;
import com.jiotms.tmsreactapp.repository.ContainerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Container}.
 */
@Service
@Transactional
public class ContainerServiceImpl implements ContainerService {

    private final Logger log = LoggerFactory.getLogger(ContainerServiceImpl.class);

    private final ContainerRepository containerRepository;

    public ContainerServiceImpl(ContainerRepository containerRepository) {
        this.containerRepository = containerRepository;
    }

    @Override
    public Container save(Container container) {
        log.debug("Request to save Container : {}", container);
        return containerRepository.save(container);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Container> findAll() {
        log.debug("Request to get all Containers");
        return containerRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Container> findOne(Long id) {
        log.debug("Request to get Container : {}", id);
        return containerRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Container : {}", id);
        containerRepository.deleteById(id);
    }
}
