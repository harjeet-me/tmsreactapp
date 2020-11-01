package com.jiotms.tmsreactapp.repository;

import com.jiotms.tmsreactapp.domain.Carrier;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Carrier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CarrierRepository extends JpaRepository<Carrier, Long> {
}
