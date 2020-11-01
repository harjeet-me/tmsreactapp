import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-report.reducer';
import { IInvoiceReport } from 'app/shared/model/invoice-report.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceReportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceReportDetail = (props: IInvoiceReportDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceReportEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          InvoiceReport [<b>{invoiceReportEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="customer">Customer</span>
          </dt>
          <dd>{invoiceReportEntity.customer}</dd>
          <dt>
            <span id="fromDate">From Date</span>
          </dt>
          <dd>
            {invoiceReportEntity.fromDate ? (
              <TextFormat value={invoiceReportEntity.fromDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="toDate">To Date</span>
          </dt>
          <dd>
            {invoiceReportEntity.toDate ? (
              <TextFormat value={invoiceReportEntity.toDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{invoiceReportEntity.remarks}</dd>
          <dt>
            <span id="invoiceReport">Invoice Report</span>
          </dt>
          <dd>
            {invoiceReportEntity.invoiceReport ? (
              <div>
                {invoiceReportEntity.invoiceReportContentType ? (
                  <a onClick={openFile(invoiceReportEntity.invoiceReportContentType, invoiceReportEntity.invoiceReport)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {invoiceReportEntity.invoiceReportContentType}, {byteSize(invoiceReportEntity.invoiceReport)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {invoiceReportEntity.createdDate ? (
              <TextFormat value={invoiceReportEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{invoiceReportEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {invoiceReportEntity.lastModifiedDate ? (
              <TextFormat value={invoiceReportEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{invoiceReportEntity.lastModifiedBy}</dd>
          <dt>Invoice</dt>
          <dd>
            {invoiceReportEntity.invoices
              ? invoiceReportEntity.invoices.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.id}</a>
                    {invoiceReportEntity.invoices && i === invoiceReportEntity.invoices.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/invoice-report" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice-report/${invoiceReportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoiceReport }: IRootState) => ({
  invoiceReportEntity: invoiceReport.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReportDetail);
