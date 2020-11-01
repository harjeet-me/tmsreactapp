package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.CompanyProfile;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link CompanyProfile}.
 */
public interface CompanyProfileService {

    /**
     * Save a companyProfile.
     *
     * @param companyProfile the entity to save.
     * @return the persisted entity.
     */
    CompanyProfile save(CompanyProfile companyProfile);

    /**
     * Get all the companyProfiles.
     *
     * @return the list of entities.
     */
    List<CompanyProfile> findAll();


    /**
     * Get the "id" companyProfile.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CompanyProfile> findOne(Long id);

    /**
     * Delete the "id" companyProfile.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
