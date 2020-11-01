import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InvoiceItem = (props: IInvoiceItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { invoiceItemList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-item-heading">
        Invoice Items
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Invoice Item
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceItemList && invoiceItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Qty</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Total</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Invoice</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceItemList.map((invoiceItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoiceItem.id}`} color="link" size="sm">
                      {invoiceItem.id}
                    </Button>
                  </td>
                  <td>{invoiceItem.itemName}</td>
                  <td>{invoiceItem.description}</td>
                  <td>{invoiceItem.qty}</td>
                  <td>{invoiceItem.price}</td>
                  <td>{invoiceItem.discount}</td>
                  <td>{invoiceItem.total}</td>
                  <td>
                    {invoiceItem.createdDate ? <TextFormat type="date" value={invoiceItem.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{invoiceItem.createdBy}</td>
                  <td>
                    {invoiceItem.lastModifiedDate ? (
                      <TextFormat type="date" value={invoiceItem.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoiceItem.lastModifiedBy}</td>
                  <td>{invoiceItem.invoice ? <Link to={`invoice/${invoiceItem.invoice.id}`}>{invoiceItem.invoice.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceItem.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Invoice Items found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoiceItem }: IRootState) => ({
  invoiceItemList: invoiceItem.entities,
  loading: invoiceItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItem);
