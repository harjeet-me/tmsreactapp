import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './invoice-report.reducer';
import { IInvoiceReport } from 'app/shared/model/invoice-report.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceReportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const InvoiceReport = (props: IInvoiceReportProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { invoiceReportList, match, loading } = props;
  return (
    <div>
      <h2 id="invoice-report-heading">
        Invoice Reports
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Invoice Report
        </Link>
      </h2>
      <div className="table-responsive">
        {invoiceReportList && invoiceReportList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Remarks</th>
                <th>Invoice Report</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Invoice</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {invoiceReportList.map((invoiceReport, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${invoiceReport.id}`} color="link" size="sm">
                      {invoiceReport.id}
                    </Button>
                  </td>
                  <td>{invoiceReport.customer}</td>
                  <td>
                    {invoiceReport.fromDate ? (
                      <TextFormat type="date" value={invoiceReport.fromDate} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {invoiceReport.toDate ? <TextFormat type="date" value={invoiceReport.toDate} format={APP_LOCAL_DATE_FORMAT} /> : null}
                  </td>
                  <td>{invoiceReport.remarks}</td>
                  <td>
                    {invoiceReport.invoiceReport ? (
                      <div>
                        {invoiceReport.invoiceReportContentType ? (
                          <a onClick={openFile(invoiceReport.invoiceReportContentType, invoiceReport.invoiceReport)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {invoiceReport.invoiceReportContentType}, {byteSize(invoiceReport.invoiceReport)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {invoiceReport.createdDate ? (
                      <TextFormat type="date" value={invoiceReport.createdDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoiceReport.createdBy}</td>
                  <td>
                    {invoiceReport.lastModifiedDate ? (
                      <TextFormat type="date" value={invoiceReport.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{invoiceReport.lastModifiedBy}</td>
                  <td>
                    {invoiceReport.invoices
                      ? invoiceReport.invoices.map((val, j) => (
                          <span key={j}>
                            <Link to={`invoice/${val.id}`}>{val.id}</Link>
                            {j === invoiceReport.invoices.length - 1 ? '' : ', '}
                          </span>
                        ))
                      : null}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${invoiceReport.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceReport.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${invoiceReport.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Invoice Reports found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ invoiceReport }: IRootState) => ({
  invoiceReportList: invoiceReport.entities,
  loading: invoiceReport.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReport);
