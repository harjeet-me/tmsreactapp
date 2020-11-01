package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.Equipment;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link Equipment}.
 */
public interface EquipmentService {

    /**
     * Save a equipment.
     *
     * @param equipment the entity to save.
     * @return the persisted entity.
     */
    Equipment save(Equipment equipment);

    /**
     * Get all the equipment.
     *
     * @return the list of entities.
     */
    List<Equipment> findAll();


    /**
     * Get the "id" equipment.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Equipment> findOne(Long id);

    /**
     * Delete the "id" equipment.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
