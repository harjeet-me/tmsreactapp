import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { getEntities as getTrips } from 'app/entities/trip/trip.reducer';
import { getEntity, updateEntity, createEntity, reset } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContainerUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ContainerUpdate = (props: IContainerUpdateProps) => {
  const [pickupLocationId, setPickupLocationId] = useState('0');
  const [dropLocationId, setDropLocationId] = useState('0');
  const [tripId, setTripId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { containerEntity, locations, trips, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/container');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocations();
    props.getTrips();
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
        ...containerEntity,
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
          <h2 id="tmsreactappApp.container.home.createOrEditLabel">Create or edit a Container</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : containerEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="container-id">ID</Label>
                  <AvInput id="container-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="numberLabel" for="container-number">
                  Number
                </Label>
                <AvField id="container-number" type="text" name="number" />
              </AvGroup>
              <AvGroup>
                <Label id="tripTypeLabel" for="container-tripType">
                  Trip Type
                </Label>
                <AvInput
                  id="container-tripType"
                  type="select"
                  className="form-control"
                  name="tripType"
                  value={(!isNew && containerEntity.tripType) || 'PICKUP'}
                >
                  <option value="PICKUP">PICKUP</option>
                  <option value="RETURN">RETURN</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="pickupLabel" for="container-pickup">
                  Pickup
                </Label>
                <AvField id="container-pickup" type="date" className="form-control" name="pickup" />
              </AvGroup>
              <AvGroup>
                <Label id="dropLabel" for="container-drop">
                  Drop
                </Label>
                <AvField id="container-drop" type="date" className="form-control" name="drop" />
              </AvGroup>
              <AvGroup>
                <Label id="containerSizeLabel" for="container-containerSize">
                  Container Size
                </Label>
                <AvInput
                  id="container-containerSize"
                  type="select"
                  className="form-control"
                  name="containerSize"
                  value={(!isNew && containerEntity.containerSize) || 'C53'}
                >
                  <option value="C53">C53</option>
                  <option value="C43">C43</option>
                  <option value="C20">C20</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="container-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="container-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.containerEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="container-createdBy">
                  Created By
                </Label>
                <AvField id="container-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="container-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="container-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.containerEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="container-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="container-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="container-pickupLocation">Pickup Location</Label>
                <AvInput id="container-pickupLocation" type="select" className="form-control" name="pickupLocation.id">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.address}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="container-dropLocation">Drop Location</Label>
                <AvInput id="container-dropLocation" type="select" className="form-control" name="dropLocation.id">
                  <option value="" key="0" />
                  {locations
                    ? locations.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.address}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="container-trip">Trip</Label>
                <AvInput id="container-trip" type="select" className="form-control" name="trip.id">
                  <option value="" key="0" />
                  {trips
                    ? trips.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/container" replace color="info">
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
  locations: storeState.location.entities,
  trips: storeState.trip.entities,
  containerEntity: storeState.container.entity,
  loading: storeState.container.loading,
  updating: storeState.container.updating,
  updateSuccess: storeState.container.updateSuccess,
});

const mapDispatchToProps = {
  getLocations,
  getTrips,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ContainerUpdate);
