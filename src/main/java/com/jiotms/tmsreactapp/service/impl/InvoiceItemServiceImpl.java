package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.InvoiceItemService;
import com.jiotms.tmsreactapp.domain.InvoiceItem;
import com.jiotms.tmsreactapp.repository.InvoiceItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link InvoiceItem}.
 */
@Service
@Transactional
public class InvoiceItemServiceImpl implements InvoiceItemService {

    private final Logger log = LoggerFactory.getLogger(InvoiceItemServiceImpl.class);

    private final InvoiceItemRepository invoiceItemRepository;

    public InvoiceItemServiceImpl(InvoiceItemRepository invoiceItemRepository) {
        this.invoiceItemRepository = invoiceItemRepository;
    }

    @Override
    public InvoiceItem save(InvoiceItem invoiceItem) {
        log.debug("Request to save InvoiceItem : {}", invoiceItem);
        return invoiceItemRepository.save(invoiceItem);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InvoiceItem> findAll() {
        log.debug("Request to get all InvoiceItems");
        return invoiceItemRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<InvoiceItem> findOne(Long id) {
        log.debug("Request to get InvoiceItem : {}", id);
        return invoiceItemRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete InvoiceItem : {}", id);
        invoiceItemRepository.deleteById(id);
    }
}
