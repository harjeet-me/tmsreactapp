package com.jiotms.tmsreactapp.config;

import io.github.jhipster.config.JHipsterProperties;
import io.github.jhipster.config.cache.PrefixedKeyGenerator;
import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {
    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.jiotms.tmsreactapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.jiotms.tmsreactapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.jiotms.tmsreactapp.domain.User.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Authority.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.jiotms.tmsreactapp.domain.CompanyProfile.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".loadOrders");
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".invoices");
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".payments");
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".emails");
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".morecontacts");
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".transactionsRecords");
            createCache(cm, com.jiotms.tmsreactapp.domain.Customer.class.getName() + ".charges");
            createCache(cm, com.jiotms.tmsreactapp.domain.Trip.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Trip.class.getName() + ".invoices");
            createCache(cm, com.jiotms.tmsreactapp.domain.Trip.class.getName() + ".containers");
            createCache(cm, com.jiotms.tmsreactapp.domain.Invoice.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Invoice.class.getName() + ".invoiceItems");
            createCache(cm, com.jiotms.tmsreactapp.domain.Invoice.class.getName() + ".invoiceHistories");
            createCache(cm, com.jiotms.tmsreactapp.domain.Invoice.class.getName() + ".invoiceReports");
            createCache(cm, com.jiotms.tmsreactapp.domain.Payment.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.InvoiceReport.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.InvoiceReport.class.getName() + ".invoices");
            createCache(cm, com.jiotms.tmsreactapp.domain.InvoiceItem.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.ProductItem.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.ProductItem.class.getName() + ".customers");
            createCache(cm, com.jiotms.tmsreactapp.domain.Accounts.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.TransactionsRecord.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Container.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Equipment.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Equipment.class.getName() + ".trips");
            createCache(cm, com.jiotms.tmsreactapp.domain.Insurance.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Contact.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Driver.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Driver.class.getName() + ".trips");
            createCache(cm, com.jiotms.tmsreactapp.domain.Carrier.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Carrier.class.getName() + ".loadOrders");
            createCache(cm, com.jiotms.tmsreactapp.domain.Location.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Location.class.getName() + ".trippicks");
            createCache(cm, com.jiotms.tmsreactapp.domain.Location.class.getName() + ".tripdrops");
            createCache(cm, com.jiotms.tmsreactapp.domain.Location.class.getName() + ".contpicks");
            createCache(cm, com.jiotms.tmsreactapp.domain.Location.class.getName() + ".contdrops");
            createCache(cm, com.jiotms.tmsreactapp.domain.Email.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Email.class.getName() + ".fileSystems");
            createCache(cm, com.jiotms.tmsreactapp.domain.InvoiceHistory.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.AccountHistory.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.Report.class.getName());
            createCache(cm, com.jiotms.tmsreactapp.domain.FileSystem.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache == null) {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
