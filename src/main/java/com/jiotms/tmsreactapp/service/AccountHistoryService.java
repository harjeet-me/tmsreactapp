package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.AccountHistory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link AccountHistory}.
 */
public interface AccountHistoryService {

    /**
     * Save a accountHistory.
     *
     * @param accountHistory the entity to save.
     * @return the persisted entity.
     */
    AccountHistory save(AccountHistory accountHistory);

    /**
     * Get all the accountHistories.
     *
     * @return the list of entities.
     */
    List<AccountHistory> findAll();


    /**
     * Get the "id" accountHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AccountHistory> findOne(Long id);

    /**
     * Delete the "id" accountHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
