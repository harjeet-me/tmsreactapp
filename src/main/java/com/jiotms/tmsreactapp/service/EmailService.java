package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.Email;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Email}.
 */
public interface EmailService {

    /**
     * Save a email.
     *
     * @param email the entity to save.
     * @return the persisted entity.
     */
    Email save(Email email);

    /**
     * Get all the emails.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Email> findAll(Pageable pageable);


    /**
     * Get the "id" email.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Email> findOne(Long id);

    /**
     * Delete the "id" email.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
