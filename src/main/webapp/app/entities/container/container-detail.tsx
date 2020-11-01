import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContainerDetail = (props: IContainerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { containerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Container [<b>{containerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="number">Number</span>
          </dt>
          <dd>{containerEntity.number}</dd>
          <dt>
            <span id="tripType">Trip Type</span>
          </dt>
          <dd>{containerEntity.tripType}</dd>
          <dt>
            <span id="pickup">Pickup</span>
          </dt>
          <dd>
            {containerEntity.pickup ? <TextFormat value={containerEntity.pickup} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="drop">Drop</span>
          </dt>
          <dd>{containerEntity.drop ? <TextFormat value={containerEntity.drop} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="containerSize">Container Size</span>
          </dt>
          <dd>{containerEntity.containerSize}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {containerEntity.createdDate ? <TextFormat value={containerEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{containerEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {containerEntity.lastModifiedDate ? (
              <TextFormat value={containerEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{containerEntity.lastModifiedBy}</dd>
          <dt>Pickup Location</dt>
          <dd>{containerEntity.pickupLocation ? containerEntity.pickupLocation.address : ''}</dd>
          <dt>Drop Location</dt>
          <dd>{containerEntity.dropLocation ? containerEntity.dropLocation.address : ''}</dd>
          <dt>Trip</dt>
          <dd>{containerEntity.trip ? containerEntity.trip.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/container" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/container/${containerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ container }: IRootState) => ({
  containerEntity: container.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContainerDetail);
