import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInsurance } from 'app/shared/model/insurance.model';
import { getEntities as getInsurances } from 'app/entities/insurance/insurance.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './carrier.reducer';
import { ICarrier } from 'app/shared/model/carrier.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICarrierUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarrierUpdate = (props: ICarrierUpdateProps) => {
  const [operInsuranceId, setOperInsuranceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { carrierEntity, insurances, loading, updating } = props;

  const { companyLogo, companyLogoContentType, contract, contractContentType } = carrierEntity;

  const handleClose = () => {
    props.history.push('/carrier');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInsurances();
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
    values.timeZone = convertDateTimeToServer(values.timeZone);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...carrierEntity,
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
          <h2 id="tmsreactappApp.carrier.home.createOrEditLabel">Create or edit a Carrier</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : carrierEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="carrier-id">ID</Label>
                  <AvInput id="carrier-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyLabel" for="carrier-company">
                  Company
                </Label>
                <AvField id="carrier-company" type="text" name="company" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="carrier-firstName">
                  First Name
                </Label>
                <AvField id="carrier-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="carrier-lastName">
                  Last Name
                </Label>
                <AvField id="carrier-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="contactDesignationLabel" for="carrier-contactDesignation">
                  Contact Designation
                </Label>
                <AvInput
                  id="carrier-contactDesignation"
                  type="select"
                  className="form-control"
                  name="contactDesignation"
                  value={(!isNew && carrierEntity.contactDesignation) || 'MANAGER'}
                >
                  <option value="MANAGER">MANAGER</option>
                  <option value="ACCOUNTANT">ACCOUNTANT</option>
                  <option value="OWNER">OWNER</option>
                  <option value="DISPATCHER">DISPATCHER</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="carrier-email">
                  Email
                </Label>
                <AvField id="carrier-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="carrier-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="carrier-phoneNumber" type="string" className="form-control" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberExtentionLabel" for="carrier-phoneNumberExtention">
                  Phone Number Extention
                </Label>
                <AvField id="carrier-phoneNumberExtention" type="string" className="form-control" name="phoneNumberExtention" />
              </AvGroup>
              <AvGroup>
                <Label id="preffredContactTypeLabel" for="carrier-preffredContactType">
                  Preffred Contact Type
                </Label>
                <AvInput
                  id="carrier-preffredContactType"
                  type="select"
                  className="form-control"
                  name="preffredContactType"
                  value={(!isNew && carrierEntity.preffredContactType) || 'PHONE'}
                >
                  <option value="PHONE">PHONE</option>
                  <option value="EMAIL">EMAIL</option>
                  <option value="FAX">FAX</option>
                  <option value="MAIL">MAIL</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="websiteLabel" for="carrier-website">
                  Website
                </Label>
                <AvField id="carrier-website" type="text" name="website" />
              </AvGroup>
              <AvGroup>
                <Label id="alternateContactPersonLabel" for="carrier-alternateContactPerson">
                  Alternate Contact Person
                </Label>
                <AvField id="carrier-alternateContactPerson" type="text" name="alternateContactPerson" />
              </AvGroup>
              <AvGroup>
                <Label id="alternateContactNumberLabel" for="carrier-alternateContactNumber">
                  Alternate Contact Number
                </Label>
                <AvField id="carrier-alternateContactNumber" type="string" className="form-control" name="alternateContactNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="alternatePhoneNumberExtentionLabel" for="carrier-alternatePhoneNumberExtention">
                  Alternate Phone Number Extention
                </Label>
                <AvField
                  id="carrier-alternatePhoneNumberExtention"
                  type="string"
                  className="form-control"
                  name="alternatePhoneNumberExtention"
                />
              </AvGroup>
              <AvGroup>
                <Label id="alternateContactEmailLabel" for="carrier-alternateContactEmail">
                  Alternate Contact Email
                </Label>
                <AvField id="carrier-alternateContactEmail" type="text" name="alternateContactEmail" />
              </AvGroup>
              <AvGroup>
                <Label id="preferredContactTimeLabel" for="carrier-preferredContactTime">
                  Preferred Contact Time
                </Label>
                <AvField id="carrier-preferredContactTime" type="text" name="preferredContactTime" />
              </AvGroup>
              <AvGroup>
                <Label id="faxLabel" for="carrier-fax">
                  Fax
                </Label>
                <AvField id="carrier-fax" type="string" className="form-control" name="fax" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="carrier-address">
                  Address
                </Label>
                <AvField id="carrier-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="streetAddressLabel" for="carrier-streetAddress">
                  Street Address
                </Label>
                <AvField id="carrier-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="carrier-city">
                  City
                </Label>
                <AvField id="carrier-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="carrier-stateProvince">
                  State Province
                </Label>
                <AvField id="carrier-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="carrier-country">
                  Country
                </Label>
                <AvInput
                  id="carrier-country"
                  type="select"
                  className="form-control"
                  name="country"
                  value={(!isNew && carrierEntity.country) || 'USA'}
                >
                  <option value="USA">USA</option>
                  <option value="CANADA">CANADA</option>
                  <option value="MEXICO">MEXICO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="carrier-postalCode">
                  Postal Code
                </Label>
                <AvField id="carrier-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="dotLabel" for="carrier-dot">
                  Dot
                </Label>
                <AvField id="carrier-dot" type="text" name="dot" />
              </AvGroup>
              <AvGroup>
                <Label id="mcLabel" for="carrier-mc">
                  Mc
                </Label>
                <AvField id="carrier-mc" type="string" className="form-control" name="mc" />
              </AvGroup>
              <AvGroup>
                <Label id="taxIdLabel" for="carrier-taxId">
                  Tax Id
                </Label>
                <AvField id="carrier-taxId" type="text" name="taxId" />
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
                <Label id="customerSinceLabel" for="carrier-customerSince">
                  Customer Since
                </Label>
                <AvField id="carrier-customerSince" type="date" className="form-control" name="customerSince" />
              </AvGroup>
              <AvGroup>
                <Label id="notesLabel" for="carrier-notes">
                  Notes
                </Label>
                <AvField id="carrier-notes" type="text" name="notes" />
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
                <Label id="statusLabel" for="carrier-status">
                  Status
                </Label>
                <AvInput
                  id="carrier-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && carrierEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="preffredCurrencyLabel" for="carrier-preffredCurrency">
                  Preffred Currency
                </Label>
                <AvInput
                  id="carrier-preffredCurrency"
                  type="select"
                  className="form-control"
                  name="preffredCurrency"
                  value={(!isNew && carrierEntity.preffredCurrency) || 'USD'}
                >
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="INR">INR</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="paytermsLabel" for="carrier-payterms">
                  Payterms
                </Label>
                <AvField id="carrier-payterms" type="text" name="payterms" />
              </AvGroup>
              <AvGroup>
                <Label id="timeZoneLabel" for="carrier-timeZone">
                  Time Zone
                </Label>
                <AvInput
                  id="carrier-timeZone"
                  type="datetime-local"
                  className="form-control"
                  name="timeZone"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.carrierEntity.timeZone)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="carrier-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="carrier-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.carrierEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="carrier-createdBy">
                  Created By
                </Label>
                <AvField id="carrier-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="carrier-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="carrier-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.carrierEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="carrier-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="carrier-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="carrier-operInsurance">Oper Insurance</Label>
                <AvInput id="carrier-operInsurance" type="select" className="form-control" name="operInsurance.id">
                  <option value="" key="0" />
                  {insurances
                    ? insurances.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/carrier" replace color="info">
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
  insurances: storeState.insurance.entities,
  carrierEntity: storeState.carrier.entity,
  loading: storeState.carrier.loading,
  updating: storeState.carrier.updating,
  updateSuccess: storeState.carrier.updateSuccess,
});

const mapDispatchToProps = {
  getInsurances,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarrierUpdate);
