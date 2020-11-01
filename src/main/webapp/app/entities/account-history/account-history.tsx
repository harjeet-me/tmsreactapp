import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './account-history.reducer';
import { IAccountHistory } from 'app/shared/model/account-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountHistoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const AccountHistory = (props: IAccountHistoryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { accountHistoryList, match, loading } = props;
  return (
    <div>
      <h2 id="account-history-heading">
        Account Histories
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Account History
        </Link>
      </h2>
      <div className="table-responsive">
        {accountHistoryList && accountHistoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Enity Name</th>
                <th>Entity Link</th>
                <th>Action</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountHistoryList.map((accountHistory, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${accountHistory.id}`} color="link" size="sm">
                      {accountHistory.id}
                    </Button>
                  </td>
                  <td>{accountHistory.enityName}</td>
                  <td>{accountHistory.entityLink}</td>
                  <td>{accountHistory.action}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${accountHistory.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accountHistory.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accountHistory.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Account Histories found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ accountHistory }: IRootState) => ({
  accountHistoryList: accountHistory.entities,
  loading: accountHistory.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountHistory);
