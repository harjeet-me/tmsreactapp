import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './accounts.reducer';
import { IAccounts } from 'app/shared/model/accounts.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountsProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Accounts = (props: IAccountsProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { accountsList, match, loading } = props;
  return (
    <div>
      <h2 id="accounts-heading">
        Accounts
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Accounts
        </Link>
      </h2>
      <div className="table-responsive">
        {accountsList && accountsList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Balance</th>
                <th>Over 30</th>
                <th>Over 60</th>
                <th>Over 90</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Customer</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {accountsList.map((accounts, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${accounts.id}`} color="link" size="sm">
                      {accounts.id}
                    </Button>
                  </td>
                  <td>{accounts.balance}</td>
                  <td>{accounts.over30}</td>
                  <td>{accounts.over60}</td>
                  <td>{accounts.over90}</td>
                  <td>{accounts.createdDate ? <TextFormat type="date" value={accounts.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{accounts.createdBy}</td>
                  <td>
                    {accounts.lastModifiedDate ? (
                      <TextFormat type="date" value={accounts.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{accounts.lastModifiedBy}</td>
                  <td>{accounts.customer ? <Link to={`customer/${accounts.customer.id}`}>{accounts.customer.company}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${accounts.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accounts.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${accounts.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Accounts found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ accounts }: IRootState) => ({
  accountsList: accounts.entities,
  loading: accounts.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);
