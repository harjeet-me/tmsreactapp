package com.jiotms.tmsreactapp.repository;

import com.jiotms.tmsreactapp.domain.AccountHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the AccountHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AccountHistoryRepository extends JpaRepository<AccountHistory, Long> {
}
