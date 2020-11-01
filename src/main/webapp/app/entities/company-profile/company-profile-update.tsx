import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './company-profile.reducer';
import { ICompanyProfile } from 'app/shared/model/company-profile.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICompanyProfileUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyProfileUpdate = (props: ICompanyProfileUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { companyProfileEntity, loading, updating } = props;

  const { companyLogo, companyLogoContentType } = companyProfileEntity;

  const handleClose = () => {
    props.history.push('/company-profile');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
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
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...companyProfileEntity,
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
          <h2 id="tmsreactappApp.companyProfile.home.createOrEditLabel">Create or edit a CompanyProfile</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : companyProfileEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="company-profile-id">ID</Label>
                  <AvInput id="company-profile-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup check>
                <Label id="activeLabel">
                  <AvInput id="company-profile-active" type="checkbox" className="form-check-input" name="active" />
                  Active
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="companyLabel" for="company-profile-company">
                  Company
                </Label>
                <AvField id="company-profile-company" type="text" name="company" />
              </AvGroup>
              <AvGroup>
                <Label id="addressLabel" for="company-profile-address">
                  Address
                </Label>
                <AvField id="company-profile-address" type="text" name="address" />
              </AvGroup>
              <AvGroup>
                <Label id="streetAddressLabel" for="company-profile-streetAddress">
                  Street Address
                </Label>
                <AvField id="company-profile-streetAddress" type="text" name="streetAddress" />
              </AvGroup>
              <AvGroup>
                <Label id="cityLabel" for="company-profile-city">
                  City
                </Label>
                <AvField id="company-profile-city" type="text" name="city" />
              </AvGroup>
              <AvGroup>
                <Label id="stateProvinceLabel" for="company-profile-stateProvince">
                  State Province
                </Label>
                <AvField id="company-profile-stateProvince" type="text" name="stateProvince" />
              </AvGroup>
              <AvGroup>
                <Label id="countryLabel" for="company-profile-country">
                  Country
                </Label>
                <AvInput
                  id="company-profile-country"
                  type="select"
                  className="form-control"
                  name="country"
                  value={(!isNew && companyProfileEntity.country) || 'USA'}
                >
                  <option value="USA">USA</option>
                  <option value="CANADA">CANADA</option>
                  <option value="MEXICO">MEXICO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="postalCodeLabel" for="company-profile-postalCode">
                  Postal Code
                </Label>
                <AvField id="company-profile-postalCode" type="text" name="postalCode" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="company-profile-email">
                  Email
                </Label>
                <AvField id="company-profile-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="websiteLabel" for="company-profile-website">
                  Website
                </Label>
                <AvField id="company-profile-website" type="text" name="website" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="company-profile-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="company-profile-phoneNumber" type="string" className="form-control" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="dotLabel" for="company-profile-dot">
                  Dot
                </Label>
                <AvField id="company-profile-dot" type="text" name="dot" />
              </AvGroup>
              <AvGroup>
                <Label id="mcLabel" for="company-profile-mc">
                  Mc
                </Label>
                <AvField id="company-profile-mc" type="string" className="form-control" name="mc" />
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
                <Label id="profileStatusLabel" for="company-profile-profileStatus">
                  Profile Status
                </Label>
                <AvInput
                  id="company-profile-profileStatus"
                  type="select"
                  className="form-control"
                  name="profileStatus"
                  value={(!isNew && companyProfileEntity.profileStatus) || 'ACTIVE'}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="preffredCurrencyLabel" for="company-profile-preffredCurrency">
                  Preffred Currency
                </Label>
                <AvInput
                  id="company-profile-preffredCurrency"
                  type="select"
                  className="form-control"
                  name="preffredCurrency"
                  value={(!isNew && companyProfileEntity.preffredCurrency) || 'USD'}
                >
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="INR">INR</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="company-profile-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="company-profile-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.companyProfileEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="company-profile-createdBy">
                  Created By
                </Label>
                <AvField id="company-profile-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="company-profile-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="company-profile-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.companyProfileEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="company-profile-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="company-profile-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/company-profile" replace color="info">
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
  companyProfileEntity: storeState.companyProfile.entity,
  loading: storeState.companyProfile.loading,
  updating: storeState.companyProfile.updating,
  updateSuccess: storeState.companyProfile.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfileUpdate);
