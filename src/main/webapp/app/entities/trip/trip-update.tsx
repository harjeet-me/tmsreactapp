import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ILocation } from 'app/shared/model/location.model';
import { getEntities as getLocations } from 'app/entities/location/location.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { getEntities as getDrivers } from 'app/entities/driver/driver.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { getEntities as getEquipment } from 'app/entities/equipment/equipment.reducer';
import { ICarrier } from 'app/shared/model/carrier.model';
import { getEntities as getCarriers } from 'app/entities/carrier/carrier.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITripUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TripUpdate = (props: ITripUpdateProps) => {
  const [pickupLocationId, setPickupLocationId] = useState('0');
  const [dropLocationId, setDropLocationId] = useState('0');
  const [customerId, setCustomerId] = useState('0');
  const [driverId, setDriverId] = useState('0');
  const [equipmentId, setEquipmentId] = useState('0');
  const [carrierId, setCarrierId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tripEntity, locations, customers, drivers, equipment, carriers, loading, updating } = props;

  const { orderDocument, orderDocumentContentType, pod, podContentType } = tripEntity;

  const handleClose = () => {
    props.history.push('/trip' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getLocations();
    props.getCustomers();
    props.getDrivers();
    props.getEquipment();
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
    values.chasisInTime = convertDateTimeToServer(values.chasisInTime);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...tripEntity,
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
          <h2 id="tmsreactappApp.trip.home.createOrEditLabel">Create or edit a Trip</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : tripEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="trip-id">ID</Label>
                  <AvInput id="trip-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="customTripNumberLabel" for="trip-customTripNumber">
                  Custom Trip Number
                </Label>
                <AvField id="trip-customTripNumber" type="text" name="customTripNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="trip-description">
                  Description
                </Label>
                <AvField id="trip-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="tripTypeLabel" for="trip-tripType">
                  Trip Type
                </Label>
                <AvInput
                  id="trip-tripType"
                  type="select"
                  className="form-control"
                  name="tripType"
                  value={(!isNew && tripEntity.tripType) || 'PICKUP'}
                >
                  <option value="PICKUP">PICKUP</option>
                  <option value="RETURN">RETURN</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="shipmentNumberLabel" for="trip-shipmentNumber">
                  Shipment Number
                </Label>
                <AvField id="trip-shipmentNumber" type="text" name="shipmentNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="orderNumberLabel" for="trip-orderNumber">
                  Order Number
                </Label>
                <AvField id="trip-orderNumber" type="text" name="orderNumber" />
              </AvGroup>
              <AvGroup>
                <Label id="bolLabel" for="trip-bol">
                  Bol
                </Label>
                <AvField id="trip-bol" type="text" name="bol" />
              </AvGroup>
              <AvGroup>
                <Label id="pickupLabel" for="trip-pickup">
                  Pickup
                </Label>
                <AvField id="trip-pickup" type="date" className="form-control" name="pickup" />
              </AvGroup>
              <AvGroup>
                <Label id="dropLabel" for="trip-drop">
                  Drop
                </Label>
                <AvField id="trip-drop" type="date" className="form-control" name="drop" />
              </AvGroup>
              <AvGroup>
                <Label id="currentLocationLabel" for="trip-currentLocation">
                  Current Location
                </Label>
                <AvField id="trip-currentLocation" type="text" name="currentLocation" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="trip-status">
                  Status
                </Label>
                <AvInput
                  id="trip-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && tripEntity.status) || 'CREATED'}
                >
                  <option value="CREATED">CREATED</option>
                  <option value="PICKEDUP">PICKEDUP</option>
                  <option value="ONROAD">ONROAD</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="INVOICED">INVOICED</option>
                  <option value="COMPLETED">COMPLETED</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="detentionLabel" for="trip-detention">
                  Detention
                </Label>
                <AvField id="trip-detention" type="string" className="form-control" name="detention" />
              </AvGroup>
              <AvGroup>
                <Label id="chasisInTimeLabel" for="trip-chasisInTime">
                  Chasis In Time
                </Label>
                <AvInput
                  id="trip-chasisInTime"
                  type="datetime-local"
                  className="form-control"
                  name="chasisInTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tripEntity.chasisInTime)}
                />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="orderDocumentLabel" for="orderDocument">
                    Order Document
                  </Label>
                  <br />
                  {orderDocument ? (
                    <div>
                      {orderDocumentContentType ? <a onClick={openFile(orderDocumentContentType, orderDocument)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {orderDocumentContentType}, {byteSize(orderDocument)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('orderDocument')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_orderDocument" type="file" onChange={onBlobChange(false, 'orderDocument')} />
                  <AvInput type="hidden" name="orderDocument" value={orderDocument} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="podLabel" for="pod">
                    Pod
                  </Label>
                  <br />
                  {pod ? (
                    <div>
                      {podContentType ? <a onClick={openFile(podContentType, pod)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {podContentType}, {byteSize(pod)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('pod')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_pod" type="file" onChange={onBlobChange(false, 'pod')} />
                  <AvInput type="hidden" name="pod" value={pod} />
                </AvGroup>
              </AvGroup>
              <AvGroup check>
                <Label id="hazmatLabel">
                  <AvInput id="trip-hazmat" type="checkbox" className="form-check-input" name="hazmat" />
                  Hazmat
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="refrigeratedLabel">
                  <AvInput id="trip-refrigerated" type="checkbox" className="form-check-input" name="refrigerated" />
                  Refrigerated
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="liftgateLabel">
                  <AvInput id="trip-liftgate" type="checkbox" className="form-check-input" name="liftgate" />
                  Liftgate
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="recievedByLabel" for="trip-recievedBy">
                  Recieved By
                </Label>
                <AvField id="trip-recievedBy" type="text" name="recievedBy" />
              </AvGroup>
              <AvGroup>
                <Label id="coveredByLabel" for="trip-coveredBy">
                  Covered By
                </Label>
                <AvInput
                  id="trip-coveredBy"
                  type="select"
                  className="form-control"
                  name="coveredBy"
                  value={(!isNew && tripEntity.coveredBy) || 'CompanyDriver'}
                >
                  <option value="CompanyDriver">CompanyDriver</option>
                  <option value="OwnerOperator">OwnerOperator</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="loadTypeLabel" for="trip-loadType">
                  Load Type
                </Label>
                <AvInput
                  id="trip-loadType"
                  type="select"
                  className="form-control"
                  name="loadType"
                  value={(!isNew && tripEntity.loadType) || 'REEFER'}
                >
                  <option value="REEFER">REEFER</option>
                  <option value="FLATBED">FLATBED</option>
                  <option value="LTL">LTL</option>
                  <option value="DRYVAN">DRYVAN</option>
                  <option value="FLAT_DECK">FLAT_DECK</option>
                  <option value="CONTAINER">CONTAINER</option>
                  <option value="POWERONLY">POWERONLY</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="containerSizeLabel" for="trip-containerSize">
                  Container Size
                </Label>
                <AvInput
                  id="trip-containerSize"
                  type="select"
                  className="form-control"
                  name="containerSize"
                  value={(!isNew && tripEntity.containerSize) || 'C53'}
                >
                  <option value="C53">C53</option>
                  <option value="C43">C43</option>
                  <option value="C20">C20</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="numbersOfContainerLabel" for="trip-numbersOfContainer">
                  Numbers Of Container
                </Label>
                <AvField id="trip-numbersOfContainer" type="string" className="form-control" name="numbersOfContainer" />
              </AvGroup>
              <AvGroup>
                <Label id="commentsLabel" for="trip-comments">
                  Comments
                </Label>
                <AvField id="trip-comments" type="text" name="comments" />
              </AvGroup>
              <AvGroup check>
                <Label id="autoGenerateInvoiceLabel">
                  <AvInput id="trip-autoGenerateInvoice" type="checkbox" className="form-check-input" name="autoGenerateInvoice" />
                  Auto Generate Invoice
                </Label>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="trip-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="trip-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tripEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="trip-createdBy">
                  Created By
                </Label>
                <AvField id="trip-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="trip-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="trip-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.tripEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="trip-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="trip-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="trip-pickupLocation">Pickup Location</Label>
                <AvInput id="trip-pickupLocation" type="select" className="form-control" name="pickupLocation.id">
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
                <Label for="trip-dropLocation">Drop Location</Label>
                <AvInput id="trip-dropLocation" type="select" className="form-control" name="dropLocation.id">
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
                <Label for="trip-customer">Customer</Label>
                <AvInput id="trip-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.email}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="trip-driver">Driver</Label>
                <AvInput id="trip-driver" type="select" className="form-control" name="driver.id">
                  <option value="" key="0" />
                  {drivers
                    ? drivers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.firstName}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="trip-equipment">Equipment</Label>
                <AvInput id="trip-equipment" type="select" className="form-control" name="equipment.id">
                  <option value="" key="0" />
                  {equipment
                    ? equipment.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="trip-carrier">Carrier</Label>
                <AvInput id="trip-carrier" type="select" className="form-control" name="carrier.id">
                  <option value="" key="0" />
                  {carriers
                    ? carriers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.company}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/trip" replace color="info">
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
  customers: storeState.customer.entities,
  drivers: storeState.driver.entities,
  equipment: storeState.equipment.entities,
  carriers: storeState.carrier.entities,
  tripEntity: storeState.trip.entity,
  loading: storeState.trip.loading,
  updating: storeState.trip.updating,
  updateSuccess: storeState.trip.updateSuccess,
});

const mapDispatchToProps = {
  getLocations,
  getCustomers,
  getDrivers,
  getEquipment,
  getCarriers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TripUpdate);
