import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './contact.reducer';
import { IContact } from 'app/shared/model/contact.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContactUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContactUpdate = (props: IContactUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { contactEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/contact');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...contactEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tmsreactappApp.contact.home.createOrEditLabel">Create or edit a Contact</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : contactEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="contact-id">ID</Label>
                  <AvInput id="contact-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="firstNameLabel" for="contact-firstName">
                  First Name
                </Label>
                <AvField id="contact-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="contact-lastName">
                  Last Name
                </Label>
                <AvField id="contact-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="contactDesignationLabel" for="contact-contactDesignation">
                  Contact Designation
                </Label>
                <AvInput
                  id="contact-contactDesignation"
                  type="select"
                  className="form-control"
                  name="contactDesignation"
                  value={(!isNew && contactEntity.contactDesignation) || 'MANAGER'}
                >
                  <option value="MANAGER">MANAGER</option>
                  <option value="ACCOUNTANT">ACCOUNTANT</option>
                  <option value="OWNER">OWNER</option>
                  <option value="DISPATCHER">DISPATCHER</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="contact-email">
                  Email
                </Label>
                <AvField id="contact-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="contact-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="contact-phoneNumber" type="string" className="form-control" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="contact-remarks">
                  Remarks
                </Label>
                <AvField id="contact-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <Label id="preferredTimeLabel" for="contact-preferredTime">
                  Preferred Time
                </Label>
                <AvField id="contact-preferredTime" type="text" name="preferredTime" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="contact-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="contact-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.contactEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="contact-createdBy">
                  Created By
                </Label>
                <AvField id="contact-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="contact-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="contact-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.contactEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="contact-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="contact-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="contact-customer">Customer</Label>
                <AvInput id="contact-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.company}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/contact" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  contactEntity: storeState.contact.entity,
  loading: storeState.contact.loading,
  updating: storeState.contact.updating,
  updateSuccess: storeState.contact.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContactUpdate);
