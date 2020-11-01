import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntities as getInvoiceHistories } from 'app/entities/invoice-history/invoice-history.reducer';
import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice.reducer';
import { getEntity, updateEntity, createEntity, reset } from './invoice-history.reducer';
import { IInvoiceHistory } from 'app/shared/model/invoice-history.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceHistoryUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceHistoryUpdate = (props: IInvoiceHistoryUpdateProps) => {
  const [previousId, setPreviousId] = useState('0');
  const [nextId, setNextId] = useState('0');
  const [invoiceId, setInvoiceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceHistoryEntity, invoiceHistories, invoices, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/invoice-history');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getInvoiceHistories();
    props.getInvoices();
  }, []);

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
        ...invoiceHistoryEntity,
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
          <h2 id="tmsreactappApp.invoiceHistory.home.createOrEditLabel">Create or edit a InvoiceHistory</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceHistoryEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-history-id">ID</Label>
                  <AvInput id="invoice-history-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="statusLabel" for="invoice-history-status">
                  Status
                </Label>
                <AvInput
                  id="invoice-history-status"
                  type="select"
                  className="form-control"
                  name="status"
                  value={(!isNew && invoiceHistoryEntity.status) || 'DRAFT'}
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
                <Label id="commentLabel" for="invoice-history-comment">
                  Comment
                </Label>
                <AvField id="invoice-history-comment" type="text" name="comment" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-history-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="invoice-history-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceHistoryEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="invoice-history-createdBy">
                  Created By
                </Label>
                <AvField id="invoice-history-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="invoice-history-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="invoice-history-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceHistoryEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="invoice-history-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="invoice-history-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="invoice-history-previous">Previous</Label>
                <AvInput id="invoice-history-previous" type="select" className="form-control" name="previous.id">
                  <option value="" key="0" />
                  {invoiceHistories
                    ? invoiceHistories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.status}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-history-next">Next</Label>
                <AvInput id="invoice-history-next" type="select" className="form-control" name="next.id">
                  <option value="" key="0" />
                  {invoiceHistories
                    ? invoiceHistories.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.status}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="invoice-history-invoice">Invoice</Label>
                <AvInput id="invoice-history-invoice" type="select" className="form-control" name="invoice.id">
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
              <Button tag={Link} id="cancel-save" to="/invoice-history" replace color="info">
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
  invoiceHistories: storeState.invoiceHistory.entities,
  invoices: storeState.invoice.entities,
  invoiceHistoryEntity: storeState.invoiceHistory.entity,
  loading: storeState.invoiceHistory.loading,
  updating: storeState.invoiceHistory.updating,
  updateSuccess: storeState.invoiceHistory.updateSuccess,
});

const mapDispatchToProps = {
  getInvoiceHistories,
  getInvoices,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceHistoryUpdate);
