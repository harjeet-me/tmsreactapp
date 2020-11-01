package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.InvoiceItem;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link InvoiceItem}.
 */
public interface InvoiceItemService {

    /**
     * Save a invoiceItem.
     *
     * @param invoiceItem the entity to save.
     * @return the persisted entity.
     */
    InvoiceItem save(InvoiceItem invoiceItem);

    /**
     * Get all the invoiceItems.
     *
     * @return the list of entities.
     */
    List<InvoiceItem> findAll();


    /**
     * Get the "id" invoiceItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InvoiceItem> findOne(Long id);

    /**
     * Delete the "id" invoiceItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
