import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInsurance } from 'app/shared/model/insurance.model';
import { getEntities as getInsurances } from 'app/entities/insurance/insurance.reducer';
import { getEntity, updateEntity, createEntity, reset } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEquipmentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EquipmentUpdate = (props: IEquipmentUpdateProps) => {
  const [insuranceId, setInsuranceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { equipmentEntity, insurances, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/equipment');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInsurances();
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
        ...equipmentEntity,
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
          <h2 id="tmsreactappApp.equipment.home.createOrEditLabel">Create or edit a Equipment</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : equipmentEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="equipment-id">ID</Label>
                  <AvInput id="equipment-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="enumberLabel" for="equipment-enumber">
                  Enumber
                </Label>
                <AvField id="equipment-enumber" type="text" name="enumber" />
              </AvGroup>
              <AvGroup>
                <Label id="typeLabel" for="equipment-type">
                  Type
                </Label>
                <AvInput
                  id="equipment-type"
                  type="select"
                  className="form-control"
                  name="type"
                  value={(!isNew && equipmentEntity.type) || 'TRAILER'}
                >
                  <option value="TRAILER">TRAILER</option>
                  <option value="CONTAINER">CONTAINER</option>
                  <option value="CHASIS">CHASIS</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="ownershiptypeLabel" for="equipment-ownershiptype">
                  Ownershiptype
                </Label>
                <AvField id="equipment-ownershiptype" type="text" name="ownershiptype" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="equipment-status">
                  Status
                </Label>
                <AvInput
                  id="equipment-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && equipmentEntity.status) || 'ACTIVE'}
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="vinLabel" for="equipment-vin">
                  Vin
                </Label>
                <AvField id="equipment-vin" type="text" name="vin" />
              </AvGroup>
              <AvGroup>
                <Label id="makeLabel" for="equipment-make">
                  Make
                </Label>
                <AvField id="equipment-make" type="text" name="make" />
              </AvGroup>
              <AvGroup>
                <Label id="modelLabel" for="equipment-model">
                  Model
                </Label>
                <AvField id="equipment-model" type="text" name="model" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="equipment-description">
                  Description
                </Label>
                <AvField id="equipment-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="yearLabel" for="equipment-year">
                  Year
                </Label>
                <AvField id="equipment-year" type="text" name="year" />
              </AvGroup>
              <AvGroup>
                <Label id="yearPurchasedLabel" for="equipment-yearPurchased">
                  Year Purchased
                </Label>
                <AvField id="equipment-yearPurchased" type="text" name="yearPurchased" />
              </AvGroup>
              <AvGroup>
                <Label id="licensePlateNumberLabel" for="equipment-licensePlateNumber">
                  License Plate Number
                </Label>
                <AvField id="equipment-licensePlateNumber" type="text" name="licensePlateNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="licensePlateExpirationLabel" for="equipment-licensePlateExpiration">
                  License Plate Expiration
                </Label>
                <AvField id="equipment-licensePlateExpiration" type="date" className="form-control" name="licensePlateExpiration" />
              </AvGroup>
              <AvGroup>
                <Label id="inspectionStickerExpirationLabel" for="equipment-inspectionStickerExpiration">
                  Inspection Sticker Expiration
                </Label>
                <AvField
                  id="equipment-inspectionStickerExpiration"
                  type="date"
                  className="form-control"
                  name="inspectionStickerExpiration"
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="equipment-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="equipment-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.equipmentEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="equipment-createdBy">
                  Created By
                </Label>
                <AvField id="equipment-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="equipment-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="equipment-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.equipmentEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="equipment-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="equipment-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="equipment-insurance">Insurance</Label>
                <AvInput id="equipment-insurance" type="select" className="form-control" name="insurance.id">
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
              <Button tag={Link} id="cancel-save" to="/equipment" replace color="info">
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
  equipmentEntity: storeState.equipment.entity,
  loading: storeState.equipment.loading,
  updating: storeState.equipment.updating,
  updateSuccess: storeState.equipment.updateSuccess,
});

const mapDispatchToProps = {
  getInsurances,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentUpdate);
