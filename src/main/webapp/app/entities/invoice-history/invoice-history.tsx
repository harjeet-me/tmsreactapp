import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice-history.reducer';
import { IInvoiceHistory } from 'app/shared/model/invoice-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceHistoryProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InvoiceHistory = (props: IInvoiceHistoryProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { invoiceHistoryList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-history-heading">
        Invoice Histories
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Invoice History
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceHistoryList && invoiceHistoryList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Status</th>
                <th>Comment</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Previous</th>
                <th>Next</th>
                <th>Invoice</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceHistoryList.map((invoiceHistory, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoiceHistory.id}`} color="link" size="sm">
                      {invoiceHistory.id}
                    </Button>
                  </td>
                  <td>{invoiceHistory.status}</td>
                  <td>{invoiceHistory.comment}</td>
                  <td>
                    {invoiceHistory.createdDate ? (
                      <TextFormat type="date" value={invoiceHistory.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoiceHistory.createdBy}</td>
                  <td>
                    {invoiceHistory.lastModifiedDate ? (
                      <TextFormat type="date" value={invoiceHistory.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoiceHistory.lastModifiedBy}</td>
                  <td>
                    {invoiceHistory.previous ? (
                      <Link to={`invoice-history/${invoiceHistory.previous.id}`}>{invoiceHistory.previous.status}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {invoiceHistory.next ? <Link to={`invoice-history/${invoiceHistory.next.id}`}>{invoiceHistory.next.status}</Link> : ''}
                  </td>
                  <td>
                    {invoiceHistory.invoice ? <Link to={`invoice/${invoiceHistory.invoice.id}`}>{invoiceHistory.invoice.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoiceHistory.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceHistory.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceHistory.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Invoice Histories found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoiceHistory }: IRootState) => ({
  invoiceHistoryList: invoiceHistory.entities,
  loading: invoiceHistory.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceHistory);
