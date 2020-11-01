package com.jiotms.tmsreactapp.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A AccountHistory.
 */
@Entity
@Table(name = "account_history")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class AccountHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "enity_name")
    private String enityName;

    @Column(name = "entity_link")
    private String entityLink;

    @Column(name = "action")
    private String action;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEnityName() {
        return enityName;
    }

    public AccountHistory enityName(String enityName) {
        this.enityName = enityName;
        return this;
    }

    public void setEnityName(String enityName) {
        this.enityName = enityName;
    }

    public String getEntityLink() {
        return entityLink;
    }

    public AccountHistory entityLink(String entityLink) {
        this.entityLink = entityLink;
        return this;
    }

    public void setEntityLink(String entityLink) {
        this.entityLink = entityLink;
    }

    public String getAction() {
        return action;
    }

    public AccountHistory action(String action) {
        this.action = action;
        return this;
    }

    public void setAction(String action) {
        this.action = action;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AccountHistory)) {
            return false;
        }
        return id != null && id.equals(((AccountHistory) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AccountHistory{" +
            "id=" + getId() +
            ", enityName='" + getEnityName() + "'" +
            ", entityLink='" + getEntityLink() + "'" +
            ", action='" + getAction() + "'" +
            "}";
    }
}
