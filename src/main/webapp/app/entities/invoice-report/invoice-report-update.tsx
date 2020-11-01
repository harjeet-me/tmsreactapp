import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './invoice-report.reducer';
import { IInvoiceReport } from 'app/shared/model/invoice-report.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceReportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceReportUpdate = (props: IInvoiceReportUpdateProps) => {
  const [idsinvoice, setIdsinvoice] = useState([]);
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceReportEntity, invoices, loading, updating } = props;

  const { invoiceReport, invoiceReportContentType } = invoiceReportEntity;

  const handleClose = () => {
    props.history.push('/invoice-report');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInvoices();
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
        ...invoiceReportEntity,
        ...values,
        invoices: mapIdList(values.invoices),
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
          <h2 id="tmsreactappApp.invoiceReport.home.createOrEditLabel">Create or edit a InvoiceReport</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceReportEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-report-id">ID</Label>
                  <AvInput id="invoice-report-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="customerLabel" for="invoice-report-customer">
                  Customer
                </Label>
                <AvField id="invoice-report-customer" type="string" className="form-control" name="customer" />
              </AvGroup>
              <AvGroup>
                <Label id="fromDateLabel" for="invoice-report-fromDate">
                  From Date
                </Label>
                <AvField id="invoice-report-fromDate" type="date" className="form-control" name="fromDate" />
              </AvGroup>
              <AvGroup>
                <Label id="toDateLabel" for="invoice-report-toDate">
                  To Date
                </Label>
                <AvField id="invoice-report-toDate" type="date" className="form-control" name="toDate" />
              </AvGroup>
              <AvGroup>
                <Label id="remarksLabel" for="invoice-report-remarks">
                  Remarks
                </Label>
                <AvField id="invoice-report-remarks" type="text" name="remarks" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="invoiceReportLabel" for="invoiceReport">
                    Invoice Report
                  </Label>
                  <br />
                  {invoiceReport ? (
                    <div>
                      {invoiceReportContentType ? <a onClick={openFile(invoiceReportContentType, invoiceReport)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {invoiceReportContentType}, {byteSize(invoiceReport)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('invoiceReport')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_invoiceReport" type="file" onChange={onBlobChange(false, 'invoiceReport')} />
                  <AvInput type="hidden" name="invoiceReport" value={invoiceReport} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-report-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="invoice-report-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceReportEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="invoice-report-createdBy">
                  Created By
                </Label>
                <AvField id="invoice-report-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="invoice-report-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="invoice-report-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceReportEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="invoice-report-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="invoice-report-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="invoice-report-invoice">Invoice</Label>
                <AvInput
                  id="invoice-report-invoice"
                  type="select"
                  multiple
                  className="form-control"
                  name="invoices"
                  value={invoiceReportEntity.invoices && invoiceReportEntity.invoices.map(e => e.id)}
                >
                  <option value="" key="0" />
                  {invoices
                    ? invoices.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/invoice-report" replace color="info">
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
  invoices: storeState.invoice.entities,
  invoiceReportEntity: storeState.invoiceReport.entity,
  loading: storeState.invoiceReport.loading,
  updating: storeState.invoiceReport.updating,
  updateSuccess: storeState.invoiceReport.updateSuccess,
});

const mapDispatchToProps = {
  getInvoices,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceReportUpdate);
