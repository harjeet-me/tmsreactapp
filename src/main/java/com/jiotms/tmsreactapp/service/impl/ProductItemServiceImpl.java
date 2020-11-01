package com.jiotms.tmsreactapp.service.impl;

import com.jiotms.tmsreactapp.service.ProductItemService;
import com.jiotms.tmsreactapp.domain.ProductItem;
import com.jiotms.tmsreactapp.repository.ProductItemRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link ProductItem}.
 */
@Service
@Transactional
public class ProductItemServiceImpl implements ProductItemService {

    private final Logger log = LoggerFactory.getLogger(ProductItemServiceImpl.class);

    private final ProductItemRepository productItemRepository;

    public ProductItemServiceImpl(ProductItemRepository productItemRepository) {
        this.productItemRepository = productItemRepository;
    }

    @Override
    public ProductItem save(ProductItem productItem) {
        log.debug("Request to save ProductItem : {}", productItem);
        return productItemRepository.save(productItem);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ProductItem> findAll() {
        log.debug("Request to get all ProductItems");
        return productItemRepository.findAll();
    }


    @Override
    @Transactional(readOnly = true)
    public Optional<ProductItem> findOne(Long id) {
        log.debug("Request to get ProductItem : {}", id);
        return productItemRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete ProductItem : {}", id);
        productItemRepository.deleteById(id);
    }
}
