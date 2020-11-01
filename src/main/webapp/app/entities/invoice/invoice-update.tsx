import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmail } from 'app/shared/model/email.model';
import { getEntities as getEmails } from 'app/entities/email/email.reducer';
import { ITrip } from 'app/shared/model/trip.model';
import { getEntities as getTrips } from 'app/entities/trip/trip.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { IInvoiceReport } from 'app/shared/model/invoice-report.model';
import { getEntities as getInvoiceReports } from 'app/entities/invoice-report/invoice-report.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './invoice.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceUpdate = (props: IInvoiceUpdateProps) => {
  const [notificationId, setNotificationId] = useState('0');
  const [tripId, setTripId] = useState('0');
  const [customerId, setCustomerId] = useState('0');
  const [invoiceReportId, setInvoiceReportId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceEntity, emails, trips, customers, invoiceReports, loading, updating } = props;

  const { invoicePdf, invoicePdfContentType } = invoiceEntity;

  const handleClose = () => {
    props.history.push('/invoice' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmails();
    props.getTrips();
    props.getCustomers();
    props.getInvoiceReports();
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...invoiceEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tmsreactappApp.invoice.home.createOrEditLabel">Create or edit a Invoice</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-id">ID</Label>
                  <AvInput id="invoice-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="orderNoLabel" for="invoice-orderNo">
                  Order No
                </Label>
                <AvField id="invoice-orderNo" type="text" name="orderNo" />
              </AvGroup>
              <AvGroup>
                <Label id="invoiceNoLabel" for="invoice-invoiceNo">
                  Invoice No
                </Label>
                <AvField id="invoice-invoiceNo" type="text" name="invoiceNo" />
              </AvGroup>
              <AvGroup>
                <Label id="taxRateLabel" for="invoice-taxRate">
                  Tax Rate
                </Label>
                <AvField id="invoice-taxRate" type="string" className="form-control" name="taxRate" />
              </AvGroup>
              <AvGroup>
                <Label id="taxTypeLabel" for="invoice-taxType">
                  Tax Type
                </Label>
                <AvInput
                  id="invoice-taxType"
                  type="select"
                  className="form-control"
                  name="taxType"
                  value={(!isNew && invoiceEntity.taxType) || 'GST'}
                >
                  <option value="GST">GST</option>
                  <option value="FEDRAL">FEDRAL</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="currencyLabel" for="invoice-currency">
                  Currency
                </Label>
                <AvInput
                  id="invoice-currency"
                  type="select"
                  className="form-control"
                  name="currency"
                  value={(!isNew && invoiceEntity.currency) || 'USD'}
                >
                  <option value="USD">USD</option>
                  <option value="CAD">CAD</option>
                  <option value="INR">INR</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="invoiceTaxTotalLabel" for="invoice-invoiceTaxTotal">
                  Invoice Tax Total
                </Label>
                <AvField id="invoice-invoiceTaxTotal" type="string" className="form-control" name="invoiceTaxTotal" />
              </AvGroup>
              <AvGroup>
                <Label id="invoiceSubTotalLabel" for="invoice-invoiceSubTotal">
                  Invoice Sub Total
                </Label>
                <AvField id="invoice-invoiceSubTotal" type="string" className="form-control" name="invoiceSubTotal" />
              </AvGroup>
              <AvGroup>
                <Label id="invoiceTotalLabel" for="invoice-invoiceTotal">
                  Invoice Total
                </Label>
                <AvField id="invoice-invoiceTotal" type="string" className="form-control" name="invoiceTotal" />
              </AvGroup>
              <AvGroup>
                <Label id="invoiceDateLabel" for="invoice-invoiceDate">
                  Invoice Date
                </Label>
                <AvField id="invoice-invoiceDate" type="date" className="form-control" name="invoiceDate" />
              </AvGroup>
              <AvGroup>
                <Label id="invoicePaidDateLabel" for="invoice-invoicePaidDate">
                  Invoice Paid Date
                </Label>
                <AvField id="invoice-invoicePaidDate" type="date" className="form-control" name="invoicePaidDate" />
              </AvGroup>
              <AvGroup>
                <Label id="refOption1Label" for="invoice-refOption1">
                  Ref Option 1
                </Label>
                <AvInput
                  id="invoice-refOption1"
                  type="select"
                  className="form-control"
                  name="refOption1"
                  value={(!isNew && invoiceEntity.refOption1) || 'ORDER_NO'}
                >
                  <option value="ORDER_NO">ORDER_NO</option>
                  <option value="SHIPMENT_NO">SHIPMENT_NO</option>
                  <option value="PO_NUMBER">PO_NUMBER</option>
                  <option value="BOOKING_NO">BOOKING_NO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="refValue1Label" for="invoice-refValue1">
                  Ref Value 1
                </Label>
                <AvField id="invoice-refValue1" type="text" name="refValue1" />
              </AvGroup>
              <AvGroup>
                <Label id="refOption2Label" for="invoice-refOption2">
                  Ref Option 2
                </Label>
                <AvInput
                  id="invoice-refOption2"
                  type="select"
                  className="form-control"
                  name="refOption2"
                  value={(!isNew && invoiceEntity.refOption2) || 'ORDER_NO'}
                >
                  <option value="ORDER_NO">ORDER_NO</option>
                  <option value="SHIPMENT_NO">SHIPMENT_NO</option>
                  <option value="PO_NUMBER">PO_NUMBER</option>
                  <option value="BOOKING_NO">BOOKING_NO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="refValue2Label" for="invoice-refValue2">
                  Ref Value 2
                </Label>
                <AvField id="invoice-refValue2" type="text" name="refValue2" />
              </AvGroup>
              <AvGroup>
                <Label id="refOption3Label" for="invoice-refOption3">
                  Ref Option 3
                </Label>
                <AvInput
                  id="invoice-refOption3"
                  type="select"
                  className="form-control"
                  name="refOption3"
                  value={(!isNew && invoiceEntity.refOption3) || 'ORDER_NO'}
                >
                  <option value="ORDER_NO">ORDER_NO</option>
                  <option value="SHIPMENT_NO">SHIPMENT_NO</option>
                  <option value="PO_NUMBER">PO_NUMBER</option>
                  <option value="BOOKING_NO">BOOKING_NO</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="refValue3Label" for="invoice-refValue3">
                  Ref Value 3
                </Label>
                <AvField id="invoice-refValue3" type="text" name="refValue3" />
              </AvGroup>
              <AvGroup>
                <Label id="payRefNoLabel" for="invoice-payRefNo">
                  Pay Ref No
                </Label>
                <AvField id="invoice-payRefNo" type="text" name="payRefNo" />
              </AvGroup>
              <AvGroup>
                <Label id="invoiceDueDateLabel" for="invoice-invoiceDueDate">
                  Invoice Due Date
                </Label>
                <AvField id="invoice-invoiceDueDate" type="date" className="form-control" name="invoiceDueDate" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="invoice-status">
                  Status
                </Label>
                <AvInput
                  id="invoice-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && invoiceEntity.status) || 'DRAFT'}
                >
                  <option value="DRAFT">DRAFT</option>
                  <option value="GENERATED">GENERATED</option>
                  <option value="SENT">SENT</option>
                  <option value="PAID">PAID</option>
                  <option value="OVERDRAFT">OVERDRAFT</option>
                  <option value="VOIDED">VOIDED</option>
                  <option value="PARTIALLY_PAID">PARTIALLY_PAID</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="invoicePdfLabel" for="invoicePdf">
                    Invoice Pdf
                  </Label>
                  <br />
                  {invoicePdf ? (
                    <div>
                      {invoicePdfContentType ? <a onClick={openFile(invoicePdfContentType, invoicePdf)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {invoicePdfContentType}, {byteSize(invoicePdf)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('invoicePdf')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_invoicePdf" type="file" onChange={onBlobChange(false, 'invoicePdf')} />
                  <AvInput type="hidden" name="invoicePdf" value={invoicePdf} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="invoice-remarks">
                  Remarks
                </Label>
                <AvField id="invoice-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <Label id="customerInfoLabel" for="invoice-customerInfo">
                  Customer Info
                </Label>
                <AvField id="invoice-customerInfo" type="text" name="customerInfo" />
              </AvGroup>
              <AvGroup>
                <Label id="paytermLabel" for="invoice-payterm">
                  Payterm
                </Label>
                <AvField id="invoice-payterm" type="text" name="payterm" />
              </AvGroup>
              <AvGroup>
                <Label id="balanceLabel" for="invoice-balance">
                  Balance
                </Label>
                <AvField id="invoice-balance" type="string" className="form-control" name="balance" />
              </AvGroup>
              <AvGroup>
                <Label id="advanceLabel" for="invoice-advance">
                  Advance
                </Label>
                <AvField id="invoice-advance" type="string" className="form-control" name="advance" />
              </AvGroup>
              <AvGroup>
                <Label id="discountLabel" for="invoice-discount">
                  Discount
                </Label>
                <AvField id="invoice-discount" type="string" className="form-control" name="discount" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="invoice-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="invoice-createdBy">
                  Created By
                </Label>
                <AvField id="invoice-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="invoice-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="invoice-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="invoice-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="invoice-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="invoice-notification">Notification</Label>
                <AvInput id="invoice-notification" type="select" className="form-control" name="notification.id">
                  <option value="" key="0" />
                  {emails
                    ? emails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-trip">Trip</Label>
                <AvInput id="invoice-trip" type="select" className="form-control" name="trip.id">
                  <option value="" key="0" />
                  {trips
                    ? trips.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-customer">Customer</Label>
                <AvInput id="invoice-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.company}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invoice" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  emails: storeState.email.entities,
  trips: storeState.trip.entities,
  customers: storeState.customer.entities,
  invoiceReports: storeState.invoiceReport.entities,
  invoiceEntity: storeState.invoice.entity,
  loading: storeState.invoice.loading,
  updating: storeState.invoice.updating,
  updateSuccess: storeState.invoice.updateSuccess,
});

const mapDispatchToProps = {
  getEmails,
  getTrips,
  getCustomers,
  getInvoiceReports,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceUpdate);
