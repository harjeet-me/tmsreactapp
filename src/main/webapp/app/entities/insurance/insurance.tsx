import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Insurance = (props: IInsuranceProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { insuranceList, match, loading } = props;
  return (
    <div>
      <h2 id="insurance-heading">
        Insurances
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Insurance
        </Link>
      </h2>
      <div className="table-responsive">
        {insuranceList && insuranceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Provider Name</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Policy Document</th>
                <th>Coverage Statement</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {insuranceList.map((insurance, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${insurance.id}`} color="link" size="sm">
                      {insurance.id}
                    </Button>
                  </td>
                  <td>{insurance.providerName}</td>
                  <td>
                    {insurance.issueDate ? <TextFormat type="date" value={insurance.issueDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {insurance.expiryDate ? <TextFormat type="date" value={insurance.expiryDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {insurance.policyDocument ? (
                      <div>
                        {insurance.policyDocumentContentType ? (
                          <a onClick={openFile(insurance.policyDocumentContentType, insurance.policyDocument)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {insurance.policyDocumentContentType}, {byteSize(insurance.policyDocument)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{insurance.coverageStatement}</td>
                  <td>
                    {insurance.createdDate ? <TextFormat type="date" value={insurance.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{insurance.createdBy}</td>
                  <td>
                    {insurance.lastModifiedDate ? (
                      <TextFormat type="date" value={insurance.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{insurance.lastModifiedBy}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${insurance.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${insurance.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${insurance.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Insurances found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceList: insurance.entities,
  loading: insurance.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Insurance);
