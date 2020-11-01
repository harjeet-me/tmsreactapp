import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './trip.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ITripProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Trip = (props: ITripProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { tripList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="trip-heading">
        Trips
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Trip
        </Link>
      </h2>
      <div className="table-responsive">
        {tripList && tripList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('customTripNumber')}>
                  Custom Trip Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('description')}>
                  Description <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('tripType')}>
                  Trip Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('shipmentNumber')}>
                  Shipment Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('orderNumber')}>
                  Order Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('bol')}>
                  Bol <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pickup')}>
                  Pickup <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('drop')}>
                  Drop <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('currentLocation')}>
                  Current Location <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('status')}>
                  Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('detention')}>
                  Detention <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('chasisInTime')}>
                  Chasis In Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('orderDocument')}>
                  Order Document <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('pod')}>
                  Pod <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('hazmat')}>
                  Hazmat <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refrigerated')}>
                  Refrigerated <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('liftgate')}>
                  Liftgate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('recievedBy')}>
                  Recieved By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('coveredBy')}>
                  Covered By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('loadType')}>
                  Load Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('containerSize')}>
                  Container Size <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('numbersOfContainer')}>
                  Numbers Of Container <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('comments')}>
                  Comments <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('autoGenerateInvoice')}>
                  Auto Generate Invoice <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  Created Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  Created By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifiedDate')}>
                  Last Modified Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifiedBy')}>
                  Last Modified By <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Pickup Location <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Drop Location <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Customer <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Driver <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Equipment <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Carrier <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tripList.map((trip, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${trip.id}`} color="link" size="sm">
                      {trip.id}
                    </Button>
                  </td>
                  <td>{trip.customTripNumber}</td>
                  <td>{trip.description}</td>
                  <td>{trip.tripType}</td>
                  <td>{trip.shipmentNumber}</td>
                  <td>{trip.orderNumber}</td>
                  <td>{trip.bol}</td>
                  <td>{trip.pickup ? <TextFormat type="date" value={trip.pickup} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{trip.drop ? <TextFormat type="date" value={trip.drop} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{trip.currentLocation}</td>
                  <td>{trip.status}</td>
                  <td>{trip.detention}</td>
                  <td>{trip.chasisInTime ? <TextFormat type="date" value={trip.chasisInTime} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>
                    {trip.orderDocument ? (
                      <div>
                        {trip.orderDocumentContentType ? (
                          <a onClick={openFile(trip.orderDocumentContentType, trip.orderDocument)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {trip.orderDocumentContentType}, {byteSize(trip.orderDocument)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {trip.pod ? (
                      <div>
                        {trip.podContentType ? <a onClick={openFile(trip.podContentType, trip.pod)}>Open &nbsp;</a> : null}
                        <span>
                          {trip.podContentType}, {byteSize(trip.pod)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{trip.hazmat ? 'true' : 'false'}</td>
                  <td>{trip.refrigerated ? 'true' : 'false'}</td>
                  <td>{trip.liftgate ? 'true' : 'false'}</td>
                  <td>{trip.recievedBy}</td>
                  <td>{trip.coveredBy}</td>
                  <td>{trip.loadType}</td>
                  <td>{trip.containerSize}</td>
                  <td>{trip.numbersOfContainer}</td>
                  <td>{trip.comments}</td>
                  <td>{trip.autoGenerateInvoice ? 'true' : 'false'}</td>
                  <td>{trip.createdDate ? <TextFormat type="date" value={trip.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{trip.createdBy}</td>
                  <td>
                    {trip.lastModifiedDate ? <TextFormat type="date" value={trip.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{trip.lastModifiedBy}</td>
                  <td>{trip.pickupLocation ? <Link to={`location/${trip.pickupLocation.id}`}>{trip.pickupLocation.address}</Link> : ''}</td>
                  <td>{trip.dropLocation ? <Link to={`location/${trip.dropLocation.id}`}>{trip.dropLocation.address}</Link> : ''}</td>
                  <td>{trip.customer ? <Link to={`customer/${trip.customer.id}`}>{trip.customer.email}</Link> : ''}</td>
                  <td>{trip.driver ? <Link to={`driver/${trip.driver.id}`}>{trip.driver.firstName}</Link> : ''}</td>
                  <td>{trip.equipment ? <Link to={`equipment/${trip.equipment.id}`}>{trip.equipment.id}</Link> : ''}</td>
                  <td>{trip.carrier ? <Link to={`carrier/${trip.carrier.id}`}>{trip.carrier.company}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${trip.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${trip.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${trip.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Trips found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={tripList && tripList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ trip }: IRootState) => ({
  tripList: trip.entities,
  loading: trip.loading,
  totalItems: trip.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
