import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './company-profile.reducer';
import { ICompanyProfile } from 'app/shared/model/company-profile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProfileProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const CompanyProfile = (props: ICompanyProfileProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { companyProfileList, match, loading } = props;
  return (
    <div>
      <h2 id="company-profile-heading">
        Company Profiles
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Company Profile
        </Link>
      </h2>
      <div className="table-responsive">
        {companyProfileList && companyProfileList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Active</th>
                <th>Company</th>
                <th>Address</th>
                <th>Street Address</th>
                <th>City</th>
                <th>State Province</th>
                <th>Country</th>
                <th>Postal Code</th>
                <th>Email</th>
                <th>Website</th>
                <th>Phone Number</th>
                <th>Dot</th>
                <th>Mc</th>
                <th>Company Logo</th>
                <th>Profile Status</th>
                <th>Preffred Currency</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {companyProfileList.map((companyProfile, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${companyProfile.id}`} color="link" size="sm">
                      {companyProfile.id}
                    </Button>
                  </td>
                  <td>{companyProfile.active ? 'true' : 'false'}</td>
                  <td>{companyProfile.company}</td>
                  <td>{companyProfile.address}</td>
                  <td>{companyProfile.streetAddress}</td>
                  <td>{companyProfile.city}</td>
                  <td>{companyProfile.stateProvince}</td>
                  <td>{companyProfile.country}</td>
                  <td>{companyProfile.postalCode}</td>
                  <td>{companyProfile.email}</td>
                  <td>{companyProfile.website}</td>
                  <td>{companyProfile.phoneNumber}</td>
                  <td>{companyProfile.dot}</td>
                  <td>{companyProfile.mc}</td>
                  <td>
                    {companyProfile.companyLogo ? (
                      <div>
                        {companyProfile.companyLogoContentType ? (
                          <a onClick={openFile(companyProfile.companyLogoContentType, companyProfile.companyLogo)}>
                            <img
                              src={`data:${companyProfile.companyLogoContentType};base64,${companyProfile.companyLogo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {companyProfile.companyLogoContentType}, {byteSize(companyProfile.companyLogo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{companyProfile.profileStatus}</td>
                  <td>{companyProfile.preffredCurrency}</td>
                  <td>
                    {companyProfile.createdDate ? (
                      <TextFormat type="date" value={companyProfile.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{companyProfile.createdBy}</td>
                  <td>
                    {companyProfile.lastModifiedDate ? (
                      <TextFormat type="date" value={companyProfile.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{companyProfile.lastModifiedBy}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${companyProfile.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${companyProfile.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${companyProfile.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Company Profiles found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ companyProfile }: IRootState) => ({
  companyProfileList: companyProfile.entities,
  loading: companyProfile.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile);
