import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './container.reducer';
import { IContainer } from 'app/shared/model/container.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContainerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Container = (props: IContainerProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { containerList, match, loading } = props;
  return (
    <div>
      <h2 id="container-heading">
        Containers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Container
        </Link>
      </h2>
      <div className="table-responsive">
        {containerList && containerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Number</th>
                <th>Trip Type</th>
                <th>Pickup</th>
                <th>Drop</th>
                <th>Container Size</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Pickup Location</th>
                <th>Drop Location</th>
                <th>Trip</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {containerList.map((container, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${container.id}`} color="link" size="sm">
                      {container.id}
                    </Button>
                  </td>
                  <td>{container.number}</td>
                  <td>{container.tripType}</td>
                  <td>{container.pickup ? <TextFormat type="date" value={container.pickup} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{container.drop ? <TextFormat type="date" value={container.drop} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{container.containerSize}</td>
                  <td>
                    {container.createdDate ? <TextFormat type="date" value={container.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{container.createdBy}</td>
                  <td>
                    {container.lastModifiedDate ? (
                      <TextFormat type="date" value={container.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{container.lastModifiedBy}</td>
                  <td>
                    {container.pickupLocation ? (
                      <Link to={`location/${container.pickupLocation.id}`}>{container.pickupLocation.address}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {container.dropLocation ? (
                      <Link to={`location/${container.dropLocation.id}`}>{container.dropLocation.address}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{container.trip ? <Link to={`trip/${container.trip.id}`}>{container.trip.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${container.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${container.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${container.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Containers found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ container }: IRootState) => ({
  containerList: container.entities,
  loading: container.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Container);
