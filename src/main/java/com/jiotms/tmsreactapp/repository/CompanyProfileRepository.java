package com.jiotms.tmsreactapp.repository;

import com.jiotms.tmsreactapp.domain.CompanyProfile;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the CompanyProfile entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CompanyProfileRepository extends JpaRepository<CompanyProfile, Long> {
}
