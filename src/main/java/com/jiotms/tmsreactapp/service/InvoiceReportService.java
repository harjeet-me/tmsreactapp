package com.jiotms.tmsreactapp.service;

import com.jiotms.tmsreactapp.domain.InvoiceReport;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

/**
 * Service Interface for managing {@link InvoiceReport}.
 */
public interface InvoiceReportService {

    /**
     * Save a invoiceReport.
     *
     * @param invoiceReport the entity to save.
     * @return the persisted entity.
     */
    InvoiceReport save(InvoiceReport invoiceReport);

    /**
     * Get all the invoiceReports.
     *
     * @return the list of entities.
     */
    List<InvoiceReport> findAll();

    /**
     * Get all the invoiceReports with eager load of many-to-many relationships.
     *
     * @return the list of entities.
     */
    Page<InvoiceReport> findAllWithEagerRelationships(Pageable pageable);


    /**
     * Get the "id" invoiceReport.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<InvoiceReport> findOne(Long id);

    /**
     * Delete the "id" invoiceReport.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
