package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.AccountHistoryService;
import com.jiotms.tmsreactapp.domain.AccountHistory;
import com.jiotms.tmsreactapp.repository.AccountHistoryRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link AccountHistory}.
 */
@Service
@Transactional
public class AccountHistoryServiceImpl implements AccountHistoryService {

    private final Logger log = LoggerFactory.getLogger(AccountHistoryServiceImpl.class);

    private final AccountHistoryRepository accountHistoryRepository;

    public AccountHistoryServiceImpl(AccountHistoryRepository accountHistoryRepository) {
        this.accountHistoryRepository = accountHistoryRepository;
    }

    @Override
    public AccountHistory save(AccountHistory accountHistory) {
        log.debug("Request to save AccountHistory : {}", accountHistory);
        return accountHistoryRepository.save(accountHistory);
    }

    @Override
    @Transactional(readOnly = true)
    public List<AccountHistory> findAll() {
        log.debug("Request to get all AccountHistories");
        return accountHistoryRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<AccountHistory> findOne(Long id) {
        log.debug("Request to get AccountHistory : {}", id);
        return accountHistoryRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete AccountHistory : {}", id);
        accountHistoryRepository.deleteById(id);
    }
}
