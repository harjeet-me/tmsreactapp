import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface IInvoiceProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Invoice = (props: IInvoiceProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { invoiceList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="invoice-heading">
        Invoices
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Invoice
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceList && invoiceList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('orderNo')}>
                  Order No <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoiceNo')}>
                  Invoice No <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('taxRate')}>
                  Tax Rate <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('taxType')}>
                  Tax Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('currency')}>
                  Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoiceTaxTotal')}>
                  Invoice Tax Total <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoiceSubTotal')}>
                  Invoice Sub Total <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoiceTotal')}>
                  Invoice Total <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoiceDate')}>
                  Invoice Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoicePaidDate')}>
                  Invoice Paid Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refOption1')}>
                  Ref Option 1 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refValue1')}>
                  Ref Value 1 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refOption2')}>
                  Ref Option 2 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refValue2')}>
                  Ref Value 2 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refOption3')}>
                  Ref Option 3 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('refValue3')}>
                  Ref Value 3 <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('payRefNo')}>
                  Pay Ref No <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoiceDueDate')}>
                  Invoice Due Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('status')}>
                  Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('invoicePdf')}>
                  Invoice Pdf <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('remarks')}>
                  Remarks <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('customerInfo')}>
                  Customer Info <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('payterm')}>
                  Payterm <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('balance')}>
                  Balance <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('advance')}>
                  Advance <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('discount')}>
                  Discount <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  Created Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  Created By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifiedDate')}>
                  Last Modified Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifiedBy')}>
                  Last Modified By <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Notification <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Trip <FontAwesomeIcon icon="sort" />
                </th>
                <th>
                  Customer <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceList.map((invoice, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoice.id}`} color="link" size="sm">
                      {invoice.id}
                    </Button>
                  </td>
                  <td>{invoice.orderNo}</td>
                  <td>{invoice.invoiceNo}</td>
                  <td>{invoice.taxRate}</td>
                  <td>{invoice.taxType}</td>
                  <td>{invoice.currency}</td>
                  <td>{invoice.invoiceTaxTotal}</td>
                  <td>{invoice.invoiceSubTotal}</td>
                  <td>{invoice.invoiceTotal}</td>
                  <td>
                    {invoice.invoiceDate ? <TextFormat type="date" value={invoice.invoiceDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>
                    {invoice.invoicePaidDate ? (
                      <TextFormat type="date" value={invoice.invoicePaidDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoice.refOption1}</td>
                  <td>{invoice.refValue1}</td>
                  <td>{invoice.refOption2}</td>
                  <td>{invoice.refValue2}</td>
                  <td>{invoice.refOption3}</td>
                  <td>{invoice.refValue3}</td>
                  <td>{invoice.payRefNo}</td>
                  <td>
                    {invoice.invoiceDueDate ? (
                      <TextFormat type="date" value={invoice.invoiceDueDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoice.status}</td>
                  <td>
                    {invoice.invoicePdf ? (
                      <div>
                        {invoice.invoicePdfContentType ? (
                          <a onClick={openFile(invoice.invoicePdfContentType, invoice.invoicePdf)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {invoice.invoicePdfContentType}, {byteSize(invoice.invoicePdf)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{invoice.remarks}</td>
                  <td>{invoice.customerInfo}</td>
                  <td>{invoice.payterm}</td>
                  <td>{invoice.balance}</td>
                  <td>{invoice.advance}</td>
                  <td>{invoice.discount}</td>
                  <td>{invoice.createdDate ? <TextFormat type="date" value={invoice.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{invoice.createdBy}</td>
                  <td>
                    {invoice.lastModifiedDate ? <TextFormat type="date" value={invoice.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{invoice.lastModifiedBy}</td>
                  <td>{invoice.notification ? <Link to={`email/${invoice.notification.id}`}>{invoice.notification.id}</Link> : ''}</td>
                  <td>{invoice.trip ? <Link to={`trip/${invoice.trip.id}`}>{invoice.trip.id}</Link> : ''}</td>
                  <td>{invoice.customer ? <Link to={`customer/${invoice.customer.id}`}>{invoice.customer.company}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoice.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${invoice.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${invoice.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Invoices found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={invoiceList && invoiceList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceList: invoice.entities,
  loading: invoice.loading,
  totalItems: invoice.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Invoice);
