import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceDetail = (props: IInvoiceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Invoice [<b>{invoiceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="orderNo">Order No</span>
          </dt>
          <dd>{invoiceEntity.orderNo}</dd>
          <dt>
            <span id="invoiceNo">Invoice No</span>
          </dt>
          <dd>{invoiceEntity.invoiceNo}</dd>
          <dt>
            <span id="taxRate">Tax Rate</span>
          </dt>
          <dd>{invoiceEntity.taxRate}</dd>
          <dt>
            <span id="taxType">Tax Type</span>
          </dt>
          <dd>{invoiceEntity.taxType}</dd>
          <dt>
            <span id="currency">Currency</span>
          </dt>
          <dd>{invoiceEntity.currency}</dd>
          <dt>
            <span id="invoiceTaxTotal">Invoice Tax Total</span>
          </dt>
          <dd>{invoiceEntity.invoiceTaxTotal}</dd>
          <dt>
            <span id="invoiceSubTotal">Invoice Sub Total</span>
          </dt>
          <dd>{invoiceEntity.invoiceSubTotal}</dd>
          <dt>
            <span id="invoiceTotal">Invoice Total</span>
          </dt>
          <dd>{invoiceEntity.invoiceTotal}</dd>
          <dt>
            <span id="invoiceDate">Invoice Date</span>
          </dt>
          <dd>
            {invoiceEntity.invoiceDate ? <TextFormat value={invoiceEntity.invoiceDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="invoicePaidDate">Invoice Paid Date</span>
          </dt>
          <dd>
            {invoiceEntity.invoicePaidDate ? (
              <TextFormat value={invoiceEntity.invoicePaidDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="refOption1">Ref Option 1</span>
          </dt>
          <dd>{invoiceEntity.refOption1}</dd>
          <dt>
            <span id="refValue1">Ref Value 1</span>
          </dt>
          <dd>{invoiceEntity.refValue1}</dd>
          <dt>
            <span id="refOption2">Ref Option 2</span>
          </dt>
          <dd>{invoiceEntity.refOption2}</dd>
          <dt>
            <span id="refValue2">Ref Value 2</span>
          </dt>
          <dd>{invoiceEntity.refValue2}</dd>
          <dt>
            <span id="refOption3">Ref Option 3</span>
          </dt>
          <dd>{invoiceEntity.refOption3}</dd>
          <dt>
            <span id="refValue3">Ref Value 3</span>
          </dt>
          <dd>{invoiceEntity.refValue3}</dd>
          <dt>
            <span id="payRefNo">Pay Ref No</span>
          </dt>
          <dd>{invoiceEntity.payRefNo}</dd>
          <dt>
            <span id="invoiceDueDate">Invoice Due Date</span>
          </dt>
          <dd>
            {invoiceEntity.invoiceDueDate ? (
              <TextFormat value={invoiceEntity.invoiceDueDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{invoiceEntity.status}</dd>
          <dt>
            <span id="invoicePdf">Invoice Pdf</span>
          </dt>
          <dd>
            {invoiceEntity.invoicePdf ? (
              <div>
                {invoiceEntity.invoicePdfContentType ? (
                  <a onClick={openFile(invoiceEntity.invoicePdfContentType, invoiceEntity.invoicePdf)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {invoiceEntity.invoicePdfContentType}, {byteSize(invoiceEntity.invoicePdf)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{invoiceEntity.remarks}</dd>
          <dt>
            <span id="customerInfo">Customer Info</span>
          </dt>
          <dd>{invoiceEntity.customerInfo}</dd>
          <dt>
            <span id="payterm">Payterm</span>
          </dt>
          <dd>{invoiceEntity.payterm}</dd>
          <dt>
            <span id="balance">Balance</span>
          </dt>
          <dd>{invoiceEntity.balance}</dd>
          <dt>
            <span id="advance">Advance</span>
          </dt>
          <dd>{invoiceEntity.advance}</dd>
          <dt>
            <span id="discount">Discount</span>
          </dt>
          <dd>{invoiceEntity.discount}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {invoiceEntity.createdDate ? <TextFormat value={invoiceEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{invoiceEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {invoiceEntity.lastModifiedDate ? (
              <TextFormat value={invoiceEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{invoiceEntity.lastModifiedBy}</dd>
          <dt>Notification</dt>
          <dd>{invoiceEntity.notification ? invoiceEntity.notification.id : ''}</dd>
          <dt>Trip</dt>
          <dd>{invoiceEntity.trip ? invoiceEntity.trip.id : ''}</dd>
          <dt>Customer</dt>
          <dd>{invoiceEntity.customer ? invoiceEntity.customer.company : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice/${invoiceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoice }: IRootState) => ({
  invoiceEntity: invoice.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail);
