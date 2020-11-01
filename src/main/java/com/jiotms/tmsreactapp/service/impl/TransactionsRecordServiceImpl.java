package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.TransactionsRecordService;
import com.jiotms.tmsreactapp.domain.TransactionsRecord;
import com.jiotms.tmsreactapp.repository.TransactionsRecordRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link TransactionsRecord}.
 */
@Service
@Transactional
public class TransactionsRecordServiceImpl implements TransactionsRecordService {

    private final Logger log = LoggerFactory.getLogger(TransactionsRecordServiceImpl.class);

    private final TransactionsRecordRepository transactionsRecordRepository;

    public TransactionsRecordServiceImpl(TransactionsRecordRepository transactionsRecordRepository) {
        this.transactionsRecordRepository = transactionsRecordRepository;
    }

    @Override
    public TransactionsRecord save(TransactionsRecord transactionsRecord) {
        log.debug("Request to save TransactionsRecord : {}", transactionsRecord);
        return transactionsRecordRepository.save(transactionsRecord);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<TransactionsRecord> findAll(Pageable pageable) {
        log.debug("Request to get all TransactionsRecords");
        return transactionsRecordRepository.findAll(pageable);
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<TransactionsRecord> findOne(Long id) {
        log.debug("Request to get TransactionsRecord : {}", id);
        return transactionsRecordRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete TransactionsRecord : {}", id);
        transactionsRecordRepository.deleteById(id);
    }
}
