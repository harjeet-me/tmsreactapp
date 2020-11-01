package com.jiotms.tmsreactapp.repository;

import com.jiotms.tmsreactapp.domain.InvoiceHistory;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the InvoiceHistory entity.
 */
@SuppressWarnings("unused")
@Repository
public interface InvoiceHistoryRepository extends JpaRepository<InvoiceHistory, Long> {
}
