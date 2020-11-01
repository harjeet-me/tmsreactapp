import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EquipmentDetail = (props: IEquipmentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { equipmentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Equipment [<b>{equipmentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="enumber">Enumber</span>
          </dt>
          <dd>{equipmentEntity.enumber}</dd>
          <dt>
            <span id="type">Type</span>
          </dt>
          <dd>{equipmentEntity.type}</dd>
          <dt>
            <span id="ownershiptype">Ownershiptype</span>
          </dt>
          <dd>{equipmentEntity.ownershiptype}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{equipmentEntity.status}</dd>
          <dt>
            <span id="vin">Vin</span>
          </dt>
          <dd>{equipmentEntity.vin}</dd>
          <dt>
            <span id="make">Make</span>
          </dt>
          <dd>{equipmentEntity.make}</dd>
          <dt>
            <span id="model">Model</span>
          </dt>
          <dd>{equipmentEntity.model}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{equipmentEntity.description}</dd>
          <dt>
            <span id="year">Year</span>
          </dt>
          <dd>{equipmentEntity.year}</dd>
          <dt>
            <span id="yearPurchased">Year Purchased</span>
          </dt>
          <dd>{equipmentEntity.yearPurchased}</dd>
          <dt>
            <span id="licensePlateNumber">License Plate Number</span>
          </dt>
          <dd>{equipmentEntity.licensePlateNumber}</dd>
          <dt>
            <span id="licensePlateExpiration">License Plate Expiration</span>
          </dt>
          <dd>
            {equipmentEntity.licensePlateExpiration ? (
              <TextFormat value={equipmentEntity.licensePlateExpiration} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="inspectionStickerExpiration">Inspection Sticker Expiration</span>
          </dt>
          <dd>
            {equipmentEntity.inspectionStickerExpiration ? (
              <TextFormat value={equipmentEntity.inspectionStickerExpiration} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {equipmentEntity.createdDate ? <TextFormat value={equipmentEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{equipmentEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {equipmentEntity.lastModifiedDate ? (
              <TextFormat value={equipmentEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{equipmentEntity.lastModifiedBy}</dd>
          <dt>Insurance</dt>
          <dd>{equipmentEntity.insurance ? equipmentEntity.insurance.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/equipment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/equipment/${equipmentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ equipment }: IRootState) => ({
  equipmentEntity: equipment.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EquipmentDetail);
