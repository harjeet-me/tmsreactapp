import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IProductItem } from 'app/shared/model/product-item.model';
import { getEntities as getProductItems } from 'app/entities/product-item/product-item.reducer';
import { IAccounts } from 'app/shared/model/accounts.model';
import { getEntities as getAccounts } from 'app/entities/accounts/accounts.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICustomerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerUpdate = (props: ICustomerUpdateProps) => {
  const [idscharge, setIdscharge] = useState([]);
  const [accountsId, setAccountsId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { customerEntity, productItems, accounts, loading, updating } = props;

  const { companyLogo, companyLogoContentType, contract, contractContentType } = customerEntity;

  const handleClose = () => {
    props.history.push('/customer' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getProductItems();
    props.getAccounts();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.preferredContactTime = convertDateTimeToServer(values.preferredContactTime);
    values.timeZone = convertDateTimeToServer(values.timeZone);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...customerEntity,
        ...values,
        charges: mapIdList(values.charges),
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
          <h2 id="tmsreactappApp.customer.home.createOrEditLabel">Create or edit a Customer</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : customerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="customer-id">ID</Label>
                  <AvInput id="customer-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyLabel" for="customer-company">
                  Company
                </Label>
                <AvField id="customer-company" type="text" name="company" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="customer-firstName">
                  First Name
                </Label>
                <AvField id="customer-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="customer-lastName">
                  Last Name
                </Label>
                <AvField id="customer-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="contactDesignationLabel" for="customer-contactDesignation">
                  Contact Designation
                </Label>
                <AvInput
                  id="customer-contactDesignation"
                  type="select"
                  className="form-control"
                  name="contactDesignation"
                  value={(!isNew && customerEntity.contactDesignation) || 'MANAGER'}
                >
                  <option value="MANAGER">MANAGER</option>
                  <option value="ACCOUNTANT">ACCOUNTANT</option>
                  <option value="OWNER">OWNER</option>
                  <option value="DISPATCHER">DISPATCHER</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="customer-email">
                  Email
                </Label>
                <AvField id="customer-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="customer-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="customer-phoneNumber" type="string" className="form-control" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberExtentionLabel" for="customer-phoneNumberExtention">
                  Phone Number Extention
                </Label>
                <AvField id="customer-phoneNumberExtention" type="string" className="form-control" name="phoneNumberExtention" />
              </AvGroup>
              <AvGroup>
                <Label id="preffredContactTypeLabel" for="customer-preffredContactType">
                  Preffred Contact Type
                </Label>
                <AvInput
                  id="customer-preffredContactType"
                  type="select"
                  className="form-control"
                  name="preffredContactType"
                  value={(!isNew && customerEntity.preffredContactType) || 'PHONE'}
                >
                  <option value="PHONE">PHONE</option>
                  <option value="EMAIL">EMAIL</option>
                  <option value="FAX">FAX</option>
                  <option value="MAIL">MAIL</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="websiteLabel" for="customer-website">
                  Website
                </Label>
                <AvField id="customer-website" type="text" name="website" />
              </AvGroup>
              <AvGroup>
                <Label id="alternateContactPersonLabel" for="customer-alternateContactPerson">
                  Alternate Contact Person
                </Label>
                <AvField id="customer-alternateContactPerson" type="text" name="alternateContactPerson" />
              </AvGroup>
              <AvGroup>
                <Label id="alternateContactNumberLabel" for="customer-alternateContactNumber">
                  Alternate Contact Number
                </Label>
                <AvField id="customer-alternateContactNumber" type="string" className="form-control" name="alternateContactNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="alternatePhoneNumberExtentionLabel" for="customer-alternatePhoneNumberExtention">
                  Alternate Phone Number Extention
                </Label>
                <AvField
                  id="customer-alternatePhoneNumberExtention"
                  type="string"
                  className="form-control"
                  name="alternatePhoneNumberExtention"
                />
              </AvGroup>
              <AvGroup>
                <Label id="alternateContactEmailLabel" for="customer-alternateContactEmail">
                  Alternate Contact Email
                </Label>
                <AvField id="customer-alternateContactEmail" type="text" name="alternateContactEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="preferredContactTimeLabel" for="customer-preferredContactTime">
                  Preferred Contact Time
                </Label>
                <AvInput
                  id="customer-preferredContactTime"
                  type="datetime-local"
                  className="form-control"
                  name="preferredContactTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.preferredContactTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="faxLabel" for="customer-fax">
                  Fax
                </Label>
                <AvField id="customer-fax" type="string" className="form-control" name="fax" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="customer-address">
                  Address
                </Label>
                <AvField id="customer-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="streetAddressLabel" for="customer-streetAddress">
                  Street Address
                </Label>
                <AvField id="customer-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="customer-city">
                  City
                </Label>
                <AvField id="customer-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="customer-stateProvince">
                  State Province
                </Label>
                <AvField id="customer-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="customer-country">
                  Country
                </Label>
                <AvInput
                  id="customer-country"
                  type="select"
                  className="form-control"
                  name="country"
                  value={(!isNew && customerEntity.country) || 'USA'}
                >
                  <option value="USA">USA</option>
                  <option value="CANADA">CANADA</option>
                  <option value="MEXICO">MEXICO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="customer-postalCode">
                  Postal Code
                </Label>
                <AvField id="customer-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dotLabel" for="customer-dot">
                  Dot
                </Label>
                <AvField id="customer-dot" type="text" name="dot" />
              </AvGroup>
              <AvGroup>
                <Label id="mcLabel" for="customer-mc">
                  Mc
                </Label>
                <AvField id="customer-mc" type="string" className="form-control" name="mc" />
              </AvGroup>
              <AvGroup>
                <Label id="taxIdLabel" for="customer-taxId">
                  Tax Id
                </Label>
                <AvField id="customer-taxId" type="text" name="taxId" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="companyLogoLabel" for="companyLogo">
                    Company Logo
                  </Label>
                  <br />
                  {companyLogo ? (
                    <div>
                      {companyLogoContentType ? (
                        <a onClick={openFile(companyLogoContentType, companyLogo)}>
                          <img src={`data:${companyLogoContentType};base64,${companyLogo}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {companyLogoContentType}, {byteSize(companyLogo)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('companyLogo')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_companyLogo" type="file" onChange={onBlobChange(true, 'companyLogo')} accept="image/*" />
                  <AvInput type="hidden" name="companyLogo" value={companyLogo} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="customerSinceLabel" for="customer-customerSince">
                  Customer Since
                </Label>
                <AvField id="customer-customerSince" type="date" className="form-control" name="customerSince" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="customer-notes">
                  Notes
                </Label>
                <AvField id="customer-notes" type="text" name="notes" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="contractLabel" for="contract">
                    Contract
                  </Label>
                  <br />
                  {contract ? (
                    <div>
                      {contractContentType ? <a onClick={openFile(contractContentType, contract)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {contractContentType}, {byteSize(contract)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('contract')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_contract" type="file" onChange={onBlobChange(false, 'contract')} />
                  <AvInput type="hidden" name="contract" value={contract} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="customer-status">
                  Status
                </Label>
                <AvInput
                  id="customer-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && customerEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="preffredCurrencyLabel" for="customer-preffredCurrency">
                  Preffred Currency
                </Label>
                <AvInput
                  id="customer-preffredCurrency"
                  type="select"
                  className="form-control"
                  name="preffredCurrency"
                  value={(!isNew && customerEntity.preffredCurrency) || 'USD'}
                >
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="INR">INR</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="paytermsLabel" for="customer-payterms">
                  Payterms
                </Label>
                <AvField id="customer-payterms" type="text" name="payterms" />
              </AvGroup>
              <AvGroup>
                <Label id="timeZoneLabel" for="customer-timeZone">
                  Time Zone
                </Label>
                <AvInput
                  id="customer-timeZone"
                  type="datetime-local"
                  className="form-control"
                  name="timeZone"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.timeZone)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="customer-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="customer-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="customer-createdBy">
                  Created By
                </Label>
                <AvField id="customer-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="customer-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="customer-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.customerEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="customer-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="customer-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="customer-charge">Charge</Label>
                <AvInput
                  id="customer-charge"
                  type="select"
                  multiple
                  className="form-control"
                  name="charges"
                  value={customerEntity.charges && customerEntity.charges.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {productItems
                    ? productItems.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.itemName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/customer" replace color="info">
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
  productItems: storeState.productItem.entities,
  accounts: storeState.accounts.entities,
  customerEntity: storeState.customer.entity,
  loading: storeState.customer.loading,
  updating: storeState.customer.updating,
  updateSuccess: storeState.customer.updateSuccess,
});

const mapDispatchToProps = {
  getProductItems,
  getAccounts,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerUpdate);
