import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './carrier.reducer';
import { ICarrier } from 'app/shared/model/carrier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarrierProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Carrier = (props: ICarrierProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { carrierList, match, loading } = props;
  return (
    <div>
      <h2 id="carrier-heading">
        Carriers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Carrier
        </Link>
      </h2>
      <div className="table-responsive">
        {carrierList && carrierList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Company</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Contact Designation</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Phone Number Extention</th>
                <th>Preffred Contact Type</th>
                <th>Website</th>
                <th>Alternate Contact Person</th>
                <th>Alternate Contact Number</th>
                <th>Alternate Phone Number Extention</th>
                <th>Alternate Contact Email</th>
                <th>Preferred Contact Time</th>
                <th>Fax</th>
                <th>Address</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State Province</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Dot</th>
                <th>Mc</th>
                <th>Tax Id</th>
                <th>Company Logo</th>
                <th>Customer Since</th>
                <th>Notes</th>
                <th>Contract</th>
                <th>Status</th>
                <th>Preffred Currency</th>
                <th>Payterms</th>
                <th>Time Zone</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Oper Insurance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {carrierList.map((carrier, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${carrier.id}`} color="link" size="sm">
                      {carrier.id}
                    </Button>
                  </td>
                  <td>{carrier.company}</td>
                  <td>{carrier.firstName}</td>
                  <td>{carrier.lastName}</td>
                  <td>{carrier.contactDesignation}</td>
                  <td>{carrier.email}</td>
                  <td>{carrier.phoneNumber}</td>
                  <td>{carrier.phoneNumberExtention}</td>
                  <td>{carrier.preffredContactType}</td>
                  <td>{carrier.website}</td>
                  <td>{carrier.alternateContactPerson}</td>
                  <td>{carrier.alternateContactNumber}</td>
                  <td>{carrier.alternatePhoneNumberExtention}</td>
                  <td>{carrier.alternateContactEmail}</td>
                  <td>{carrier.preferredContactTime}</td>
                  <td>{carrier.fax}</td>
                  <td>{carrier.address}</td>
                  <td>{carrier.streetAddress}</td>
                  <td>{carrier.city}</td>
                  <td>{carrier.stateProvince}</td>
                  <td>{carrier.country}</td>
                  <td>{carrier.postalCode}</td>
                  <td>{carrier.dot}</td>
                  <td>{carrier.mc}</td>
                  <td>{carrier.taxId}</td>
                  <td>
                    {carrier.companyLogo ? (
                      <div>
                        {carrier.companyLogoContentType ? (
                          <a onClick={openFile(carrier.companyLogoContentType, carrier.companyLogo)}>
                            <img
                              src={`data:${carrier.companyLogoContentType};base64,${carrier.companyLogo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {carrier.companyLogoContentType}, {byteSize(carrier.companyLogo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {carrier.customerSince ? <TextFormat type="date" value={carrier.customerSince} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{carrier.notes}</td>
                  <td>
                    {carrier.contract ? (
                      <div>
                        {carrier.contractContentType ? (
                          <a onClick={openFile(carrier.contractContentType, carrier.contract)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {carrier.contractContentType}, {byteSize(carrier.contract)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{carrier.status}</td>
                  <td>{carrier.preffredCurrency}</td>
                  <td>{carrier.payterms}</td>
                  <td>{carrier.timeZone ? <TextFormat type="date" value={carrier.timeZone} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{carrier.createdDate ? <TextFormat type="date" value={carrier.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{carrier.createdBy}</td>
                  <td>
                    {carrier.lastModifiedDate ? <TextFormat type="date" value={carrier.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{carrier.lastModifiedBy}</td>
                  <td>
                    {carrier.operInsurance ? <Link to={`insurance/${carrier.operInsurance.id}`}>{carrier.operInsurance.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${carrier.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carrier.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${carrier.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Carriers found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ carrier }: IRootState) => ({
  carrierList: carrier.entities,
  loading: carrier.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Carrier);
