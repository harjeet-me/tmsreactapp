import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITripDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripDetail = (props: ITripDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tripEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Trip [<b>{tripEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="customTripNumber">Custom Trip Number</span>
          </dt>
          <dd>{tripEntity.customTripNumber}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{tripEntity.description}</dd>
          <dt>
            <span id="tripType">Trip Type</span>
          </dt>
          <dd>{tripEntity.tripType}</dd>
          <dt>
            <span id="shipmentNumber">Shipment Number</span>
          </dt>
          <dd>{tripEntity.shipmentNumber}</dd>
          <dt>
            <span id="orderNumber">Order Number</span>
          </dt>
          <dd>{tripEntity.orderNumber}</dd>
          <dt>
            <span id="bol">Bol</span>
          </dt>
          <dd>{tripEntity.bol}</dd>
          <dt>
            <span id="pickup">Pickup</span>
          </dt>
          <dd>{tripEntity.pickup ? <TextFormat value={tripEntity.pickup} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="drop">Drop</span>
          </dt>
          <dd>{tripEntity.drop ? <TextFormat value={tripEntity.drop} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="currentLocation">Current Location</span>
          </dt>
          <dd>{tripEntity.currentLocation}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{tripEntity.status}</dd>
          <dt>
            <span id="detention">Detention</span>
          </dt>
          <dd>{tripEntity.detention}</dd>
          <dt>
            <span id="chasisInTime">Chasis In Time</span>
          </dt>
          <dd>{tripEntity.chasisInTime ? <TextFormat value={tripEntity.chasisInTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="orderDocument">Order Document</span>
          </dt>
          <dd>
            {tripEntity.orderDocument ? (
              <div>
                {tripEntity.orderDocumentContentType ? (
                  <a onClick={openFile(tripEntity.orderDocumentContentType, tripEntity.orderDocument)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {tripEntity.orderDocumentContentType}, {byteSize(tripEntity.orderDocument)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="pod">Pod</span>
          </dt>
          <dd>
            {tripEntity.pod ? (
              <div>
                {tripEntity.podContentType ? <a onClick={openFile(tripEntity.podContentType, tripEntity.pod)}>Open&nbsp;</a> : null}
                <span>
                  {tripEntity.podContentType}, {byteSize(tripEntity.pod)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="hazmat">Hazmat</span>
          </dt>
          <dd>{tripEntity.hazmat ? 'true' : 'false'}</dd>
          <dt>
            <span id="refrigerated">Refrigerated</span>
          </dt>
          <dd>{tripEntity.refrigerated ? 'true' : 'false'}</dd>
          <dt>
            <span id="liftgate">Liftgate</span>
          </dt>
          <dd>{tripEntity.liftgate ? 'true' : 'false'}</dd>
          <dt>
            <span id="recievedBy">Recieved By</span>
          </dt>
          <dd>{tripEntity.recievedBy}</dd>
          <dt>
            <span id="coveredBy">Covered By</span>
          </dt>
          <dd>{tripEntity.coveredBy}</dd>
          <dt>
            <span id="loadType">Load Type</span>
          </dt>
          <dd>{tripEntity.loadType}</dd>
          <dt>
            <span id="containerSize">Container Size</span>
          </dt>
          <dd>{tripEntity.containerSize}</dd>
          <dt>
            <span id="numbersOfContainer">Numbers Of Container</span>
          </dt>
          <dd>{tripEntity.numbersOfContainer}</dd>
          <dt>
            <span id="comments">Comments</span>
          </dt>
          <dd>{tripEntity.comments}</dd>
          <dt>
            <span id="autoGenerateInvoice">Auto Generate Invoice</span>
          </dt>
          <dd>{tripEntity.autoGenerateInvoice ? 'true' : 'false'}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>{tripEntity.createdDate ? <TextFormat value={tripEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{tripEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {tripEntity.lastModifiedDate ? <TextFormat value={tripEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{tripEntity.lastModifiedBy}</dd>
          <dt>Pickup Location</dt>
          <dd>{tripEntity.pickupLocation ? tripEntity.pickupLocation.address : ''}</dd>
          <dt>Drop Location</dt>
          <dd>{tripEntity.dropLocation ? tripEntity.dropLocation.address : ''}</dd>
          <dt>Customer</dt>
          <dd>{tripEntity.customer ? tripEntity.customer.email : ''}</dd>
          <dt>Driver</dt>
          <dd>{tripEntity.driver ? tripEntity.driver.firstName : ''}</dd>
          <dt>Equipment</dt>
          <dd>{tripEntity.equipment ? tripEntity.equipment.id : ''}</dd>
          <dt>Carrier</dt>
          <dd>{tripEntity.carrier ? tripEntity.carrier.company : ''}</dd>
        </dl>
        <Button tag={Link} to="/trip" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/trip/${tripEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ trip }: IRootState) => ({
  tripEntity: trip.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripDetail);
