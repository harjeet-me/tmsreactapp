package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.Container;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Container}.
 */
public interface ContainerService {

    /**
     * Save a container.
     *
     * @param container the entity to save.
     * @return the persisted entity.
     */
    Container save(Container container);

    /**
     * Get all the containers.
     *
     * @return the list of entities.
     */
    List<Container> findAll();


    /**
     * Get the "id" container.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Container> findOne(Long id);

    /**
     * Delete the "id" container.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
