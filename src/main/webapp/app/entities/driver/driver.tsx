import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Driver = (props: IDriverProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { driverList, match, loading } = props;
  return (
    <div>
      <h2 id="driver-heading">
        Drivers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Driver
        </Link>
      </h2>
      <div className="table-responsive">
        {driverList && driverList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Licence Number</th>
                <th>Dob</th>
                <th>Company Joined On</th>
                <th>Company Left On</th>
                <th>Image</th>
                <th>Licence Image</th>
                <th>Remarks</th>
                <th>Contract Doc</th>
                <th>Status</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {driverList.map((driver, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${driver.id}`} color="link" size="sm">
                      {driver.id}
                    </Button>
                  </td>
                  <td>{driver.company}</td>
                  <td>{driver.firstName}</td>
                  <td>{driver.lastName}</td>
                  <td>{driver.email}</td>
                  <td>{driver.phoneNumber}</td>
                  <td>{driver.licenceNumber}</td>
                  <td>{driver.dob ? <TextFormat type="date" value={driver.dob} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {driver.companyJoinedOn ? (
                      <TextFormat type="date" value={driver.companyJoinedOn} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {driver.companyLeftOn ? <TextFormat type="date" value={driver.companyLeftOn} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {driver.image ? (
                      <div>
                        {driver.imageContentType ? (
                          <a onClick={openFile(driver.imageContentType, driver.image)}>
                            <img src={`data:${driver.imageContentType};base64,${driver.image}`} style={{ maxHeight: '30px' }} />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {driver.imageContentType}, {byteSize(driver.image)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {driver.licenceImage ? (
                      <div>
                        {driver.licenceImageContentType ? (
                          <a onClick={openFile(driver.licenceImageContentType, driver.licenceImage)}>
                            <img
                              src={`data:${driver.licenceImageContentType};base64,${driver.licenceImage}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {driver.licenceImageContentType}, {byteSize(driver.licenceImage)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{driver.remarks}</td>
                  <td>
                    {driver.contractDoc ? (
                      <div>
                        {driver.contractDocContentType ? (
                          <a onClick={openFile(driver.contractDocContentType, driver.contractDoc)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {driver.contractDocContentType}, {byteSize(driver.contractDoc)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{driver.status}</td>
                  <td>{driver.createdDate ? <TextFormat type="date" value={driver.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{driver.createdBy}</td>
                  <td>
                    {driver.lastModifiedDate ? <TextFormat type="date" value={driver.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{driver.lastModifiedBy}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${driver.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driver.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${driver.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Drivers found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ driver }: IRootState) => ({
  driverList: driver.entities,
  loading: driver.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Driver);
