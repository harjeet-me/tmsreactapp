import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './payment.reducer';
import { IPayment } from 'app/shared/model/payment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Payment = (props: IPaymentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { paymentList, match, loading } = props;
  return (
    <div>
      <h2 id="payment-heading">
        Payments
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Payment
        </Link>
      </h2>
      <div className="table-responsive">
        {paymentList && paymentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Invoice No</th>
                <th>Pay Date</th>
                <th>Pay Ref No</th>
                <th>Mode</th>
                <th>Ammount</th>
                <th>Unused Ammount</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Customer</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {paymentList.map((payment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${payment.id}`} color="link" size="sm">
                      {payment.id}
                    </Button>
                  </td>
                  <td>{payment.invoiceNo}</td>
                  <td>{payment.payDate ? <TextFormat type="date" value={payment.payDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{payment.payRefNo}</td>
                  <td>{payment.mode}</td>
                  <td>{payment.ammount}</td>
                  <td>{payment.unusedAmmount}</td>
                  <td>{payment.createdDate ? <TextFormat type="date" value={payment.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{payment.createdBy}</td>
                  <td>
                    {payment.lastModifiedDate ? <TextFormat type="date" value={payment.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{payment.lastModifiedBy}</td>
                  <td>{payment.customer ? <Link to={`customer/${payment.customer.id}`}>{payment.customer.company}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${payment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${payment.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Payments found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ payment }: IRootState) => ({
  paymentList: payment.entities,
  loading: payment.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
