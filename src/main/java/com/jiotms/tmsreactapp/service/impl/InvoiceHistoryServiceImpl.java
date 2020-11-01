package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.InvoiceHistoryService;
import com.jiotms.tmsreactapp.domain.InvoiceHistory;
import com.jiotms.tmsreactapp.repository.InvoiceHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link InvoiceHistory}.
 */
@Service
@Transactional
public class InvoiceHistoryServiceImpl implements InvoiceHistoryService {

    private final Logger log = LoggerFactory.getLogger(InvoiceHistoryServiceImpl.class);

    private final InvoiceHistoryRepository invoiceHistoryRepository;

    public InvoiceHistoryServiceImpl(InvoiceHistoryRepository invoiceHistoryRepository) {
        this.invoiceHistoryRepository = invoiceHistoryRepository;
    }

    @Override
    public InvoiceHistory save(InvoiceHistory invoiceHistory) {
        log.debug("Request to save InvoiceHistory : {}", invoiceHistory);
        return invoiceHistoryRepository.save(invoiceHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceHistory> findAll() {
        log.debug("Request to get all InvoiceHistories");
        return invoiceHistoryRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceHistory> findOne(Long id) {
        log.debug("Request to get InvoiceHistory : {}", id);
        return invoiceHistoryRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete InvoiceHistory : {}", id);
        invoiceHistoryRepository.deleteById(id);
    }
}
