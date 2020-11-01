package com.jiotms.tmsreactapp.web.rest;

import com.jiotms.tmsreactapp.domain.InvoiceHistory;
import com.jiotms.tmsreactapp.service.InvoiceHistoryService;
import com.jiotms.tmsreactapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.jiotms.tmsreactapp.domain.InvoiceHistory}.
 */
@RestController
@RequestMapping("/api")
public class InvoiceHistoryResource {

    private final Logger log = LoggerFactory.getLogger(InvoiceHistoryResource.class);

    private static final String ENTITY_NAME = "invoiceHistory";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final InvoiceHistoryService invoiceHistoryService;

    public InvoiceHistoryResource(InvoiceHistoryService invoiceHistoryService) {
        this.invoiceHistoryService = invoiceHistoryService;
    }

    /**
     * {@code POST  /invoice-histories} : Create a new invoiceHistory.
     *
     * @param invoiceHistory the invoiceHistory to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new invoiceHistory, or with status {@code 400 (Bad Request)} if the invoiceHistory has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/invoice-histories")
    public ResponseEntity<InvoiceHistory> createInvoiceHistory(@RequestBody InvoiceHistory invoiceHistory) throws URISyntaxException {
        log.debug("REST request to save InvoiceHistory : {}", invoiceHistory);
        if (invoiceHistory.getId() != null) {
            throw new BadRequestAlertException("A new invoiceHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        InvoiceHistory result = invoiceHistoryService.save(invoiceHistory);
        return ResponseEntity.created(new URI("/api/invoice-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /invoice-histories} : Updates an existing invoiceHistory.
     *
     * @param invoiceHistory the invoiceHistory to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated invoiceHistory,
     * or with status {@code 400 (Bad Request)} if the invoiceHistory is not valid,
     * or with status {@code 500 (Internal Server Error)} if the invoiceHistory couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/invoice-histories")
    public ResponseEntity<InvoiceHistory> updateInvoiceHistory(@RequestBody InvoiceHistory invoiceHistory) throws URISyntaxException {
        log.debug("REST request to update InvoiceHistory : {}", invoiceHistory);
        if (invoiceHistory.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        InvoiceHistory result = invoiceHistoryService.save(invoiceHistory);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, invoiceHistory.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /invoice-histories} : get all the invoiceHistories.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of invoiceHistories in body.
     */
    @GetMapping("/invoice-histories")
    public List<InvoiceHistory> getAllInvoiceHistories() {
        log.debug("REST request to get all InvoiceHistories");
        return invoiceHistoryService.findAll();
    }

    /**
     * {@code GET  /invoice-histories/:id} : get the "id" invoiceHistory.
     *
     * @param id the id of the invoiceHistory to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the invoiceHistory, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/invoice-histories/{id}")
    public ResponseEntity<InvoiceHistory> getInvoiceHistory(@PathVariable Long id) {
        log.debug("REST request to get InvoiceHistory : {}", id);
        Optional<InvoiceHistory> invoiceHistory = invoiceHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(invoiceHistory);
    }

    /**
     * {@code DELETE  /invoice-histories/:id} : delete the "id" invoiceHistory.
     *
     * @param id the id of the invoiceHistory to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/invoice-histories/{id}")
    public ResponseEntity<Void> deleteInvoiceHistory(@PathVariable Long id) {
        log.debug("REST request to delete InvoiceHistory : {}", id);
        invoiceHistoryService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
