package com.jiotms.tmsreactapp.repository;

import com.jiotms.tmsreactapp.domain.ProductItem;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the ProductItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProductItemRepository extends JpaRepository<ProductItem, Long> {
}
