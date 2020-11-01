package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.AccountsService;
import com.jiotms.tmsreactapp.domain.Accounts;
import com.jiotms.tmsreactapp.repository.AccountsRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link Accounts}.
 */
@Service
@Transactional
public class AccountsServiceImpl implements AccountsService {

    private final Logger log = LoggerFactory.getLogger(AccountsServiceImpl.class);

    private final AccountsRepository accountsRepository;

    public AccountsServiceImpl(AccountsRepository accountsRepository) {
        this.accountsRepository = accountsRepository;
    }

    @Override
    public Accounts save(Accounts accounts) {
        log.debug("Request to save Accounts : {}", accounts);
        return accountsRepository.save(accounts);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Accounts> findAll() {
        log.debug("Request to get all Accounts");
        return accountsRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<Accounts> findOne(Long id) {
        log.debug("Request to get Accounts : {}", id);
        return accountsRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Accounts : {}", id);
        accountsRepository.deleteById(id);
    }
}
