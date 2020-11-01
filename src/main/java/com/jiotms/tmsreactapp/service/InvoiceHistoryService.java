package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.InvoiceHistory;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link InvoiceHistory}.
 */
public interface InvoiceHistoryService {

    /**
     * Save a invoiceHistory.
     *
     * @param invoiceHistory the entity to save.
     * @return the persisted entity.
     */
    InvoiceHistory save(InvoiceHistory invoiceHistory);

    /**
     * Get all the invoiceHistories.
     *
     * @return the list of entities.
     */
    List<InvoiceHistory> findAll();


    /**
     * Get the "id" invoiceHistory.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InvoiceHistory> findOne(Long id);

    /**
     * Delete the "id" invoiceHistory.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
