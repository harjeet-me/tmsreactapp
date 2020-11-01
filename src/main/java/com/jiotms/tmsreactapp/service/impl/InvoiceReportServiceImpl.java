package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.InvoiceReportService;
import com.jiotms.tmsreactapp.domain.InvoiceReport;
import com.jiotms.tmsreactapp.repository.InvoiceReportRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link InvoiceReport}.
 */
@Service
@Transactional
public class InvoiceReportServiceImpl implements InvoiceReportService {

    private final Logger log = LoggerFactory.getLogger(InvoiceReportServiceImpl.class);

    private final InvoiceReportRepository invoiceReportRepository;

    public InvoiceReportServiceImpl(InvoiceReportRepository invoiceReportRepository) {
        this.invoiceReportRepository = invoiceReportRepository;
    }

    @Override
    public InvoiceReport save(InvoiceReport invoiceReport) {
        log.debug("Request to save InvoiceReport : {}", invoiceReport);
        return invoiceReportRepository.save(invoiceReport);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceReport> findAll() {
        log.debug("Request to get all InvoiceReports");
        return invoiceReportRepository.findAllWithEagerRelationships();
    }


    public Page<InvoiceReport> findAllWithEagerRelationships(Pageable pageable) {
        return invoiceReportRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceReport> findOne(Long id) {
        log.debug("Request to get InvoiceReport : {}", id);
        return invoiceReportRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete InvoiceReport : {}", id);
        invoiceReportRepository.deleteById(id);
    }
}
