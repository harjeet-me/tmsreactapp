import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IDriverUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverUpdate = (props: IDriverUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { driverEntity, loading, updating } = props;

  const { image, imageContentType, licenceImage, licenceImageContentType, contractDoc, contractDocContentType } = driverEntity;

  const handleClose = () => {
    props.history.push('/driver');
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
        ...driverEntity,
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
          <h2 id="tmsreactappApp.driver.home.createOrEditLabel">Create or edit a Driver</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : driverEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="driver-id">ID</Label>
                  <AvInput id="driver-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="companyLabel" for="driver-company">
                  Company
                </Label>
                <AvField id="driver-company" type="text" name="company" />
              </AvGroup>
              <AvGroup>
                <Label id="firstNameLabel" for="driver-firstName">
                  First Name
                </Label>
                <AvField id="driver-firstName" type="text" name="firstName" />
              </AvGroup>
              <AvGroup>
                <Label id="lastNameLabel" for="driver-lastName">
                  Last Name
                </Label>
                <AvField id="driver-lastName" type="text" name="lastName" />
              </AvGroup>
              <AvGroup>
                <Label id="emailLabel" for="driver-email">
                  Email
                </Label>
                <AvField id="driver-email" type="text" name="email" />
              </AvGroup>
              <AvGroup>
                <Label id="phoneNumberLabel" for="driver-phoneNumber">
                  Phone Number
                </Label>
                <AvField id="driver-phoneNumber" type="string" className="form-control" name="phoneNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="licenceNumberLabel" for="driver-licenceNumber">
                  Licence Number
                </Label>
                <AvField id="driver-licenceNumber" type="text" name="licenceNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="dobLabel" for="driver-dob">
                  Dob
                </Label>
                <AvField id="driver-dob" type="date" className="form-control" name="dob" />
              </AvGroup>
              <AvGroup>
                <Label id="companyJoinedOnLabel" for="driver-companyJoinedOn">
                  Company Joined On
                </Label>
                <AvField id="driver-companyJoinedOn" type="date" className="form-control" name="companyJoinedOn" />
              </AvGroup>
              <AvGroup>
                <Label id="companyLeftOnLabel" for="driver-companyLeftOn">
                  Company Left On
                </Label>
                <AvField id="driver-companyLeftOn" type="date" className="form-control" name="companyLeftOn" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="imageLabel" for="image">
                    Image
                  </Label>
                  <br />
                  {image ? (
                    <div>
                      {imageContentType ? (
                        <a onClick={openFile(imageContentType, image)}>
                          <img src={`data:${imageContentType};base64,${image}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {imageContentType}, {byteSize(image)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('image')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_image" type="file" onChange={onBlobChange(true, 'image')} accept="image/*" />
                  <AvInput type="hidden" name="image" value={image} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="licenceImageLabel" for="licenceImage">
                    Licence Image
                  </Label>
                  <br />
                  {licenceImage ? (
                    <div>
                      {licenceImageContentType ? (
                        <a onClick={openFile(licenceImageContentType, licenceImage)}>
                          <img src={`data:${licenceImageContentType};base64,${licenceImage}`} style={{ maxHeight: '100px' }} />
                        </a>
                      ) : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {licenceImageContentType}, {byteSize(licenceImage)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('licenceImage')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_licenceImage" type="file" onChange={onBlobChange(true, 'licenceImage')} accept="image/*" />
                  <AvInput type="hidden" name="licenceImage" value={licenceImage} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="driver-remarks">
                  Remarks
                </Label>
                <AvField id="driver-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="contractDocLabel" for="contractDoc">
                    Contract Doc
                  </Label>
                  <br />
                  {contractDoc ? (
                    <div>
                      {contractDocContentType ? <a onClick={openFile(contractDocContentType, contractDoc)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {contractDocContentType}, {byteSize(contractDoc)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('contractDoc')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_contractDoc" type="file" onChange={onBlobChange(false, 'contractDoc')} />
                  <AvInput type="hidden" name="contractDoc" value={contractDoc} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="driver-status">
                  Status
                </Label>
                <AvInput
                  id="driver-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && driverEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="driver-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="driver-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="driver-createdBy">
                  Created By
                </Label>
                <AvField id="driver-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="driver-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="driver-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.driverEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="driver-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="driver-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/driver" replace color="info">
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
  driverEntity: storeState.driver.entity,
  loading: storeState.driver.loading,
  updating: storeState.driver.updating,
  updateSuccess: storeState.driver.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(DriverUpdate);
