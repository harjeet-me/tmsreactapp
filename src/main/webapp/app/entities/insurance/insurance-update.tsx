import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICarrier } from 'app/shared/model/carrier.model';
import { getEntities as getCarriers } from 'app/entities/carrier/carrier.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInsuranceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InsuranceUpdate = (props: IInsuranceUpdateProps) => {
  const [carrierId, setCarrierId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { insuranceEntity, carriers, loading, updating } = props;

  const { policyDocument, policyDocumentContentType } = insuranceEntity;

  const handleClose = () => {
    props.history.push('/insurance');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCarriers();
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
        ...insuranceEntity,
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
          <h2 id="tmsreactappApp.insurance.home.createOrEditLabel">Create or edit a Insurance</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : insuranceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="insurance-id">ID</Label>
                  <AvInput id="insurance-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="providerNameLabel" for="insurance-providerName">
                  Provider Name
                </Label>
                <AvField id="insurance-providerName" type="text" name="providerName" />
              </AvGroup>
              <AvGroup>
                <Label id="issueDateLabel" for="insurance-issueDate">
                  Issue Date
                </Label>
                <AvField id="insurance-issueDate" type="date" className="form-control" name="issueDate" />
              </AvGroup>
              <AvGroup>
                <Label id="expiryDateLabel" for="insurance-expiryDate">
                  Expiry Date
                </Label>
                <AvField id="insurance-expiryDate" type="date" className="form-control" name="expiryDate" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="policyDocumentLabel" for="policyDocument">
                    Policy Document
                  </Label>
                  <br />
                  {policyDocument ? (
                    <div>
                      {policyDocumentContentType ? <a onClick={openFile(policyDocumentContentType, policyDocument)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {policyDocumentContentType}, {byteSize(policyDocument)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('policyDocument')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_policyDocument" type="file" onChange={onBlobChange(false, 'policyDocument')} />
                  <AvInput type="hidden" name="policyDocument" value={policyDocument} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="coverageStatementLabel" for="insurance-coverageStatement">
                  Coverage Statement
                </Label>
                <AvField id="insurance-coverageStatement" type="text" name="coverageStatement" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="insurance-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="insurance-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.insuranceEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="insurance-createdBy">
                  Created By
                </Label>
                <AvField id="insurance-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="insurance-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="insurance-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.insuranceEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="insurance-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="insurance-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/insurance" replace color="info">
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
  carriers: storeState.carrier.entities,
  insuranceEntity: storeState.insurance.entity,
  loading: storeState.insurance.loading,
  updating: storeState.insurance.updating,
  updateSuccess: storeState.insurance.updateSuccess,
});

const mapDispatchToProps = {
  getCarriers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceUpdate);
