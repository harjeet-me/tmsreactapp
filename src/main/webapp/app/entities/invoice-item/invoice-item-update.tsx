import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IInvoice } from 'app/shared/model/invoice.model';
import { getEntities as getInvoices } from 'app/entities/invoice/invoice.reducer';
import { getEntity, updateEntity, createEntity, reset } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IInvoiceItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceItemUpdate = (props: IInvoiceItemUpdateProps) => {
  const [invoiceId, setInvoiceId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { invoiceItemEntity, invoices, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/invoice-item');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

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
        ...invoiceItemEntity,
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
          <h2 id="tmsreactappApp.invoiceItem.home.createOrEditLabel">Create or edit a InvoiceItem</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : invoiceItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="invoice-item-id">ID</Label>
                  <AvInput id="invoice-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="itemNameLabel" for="invoice-item-itemName">
                  Item Name
                </Label>
                <AvField id="invoice-item-itemName" type="text" name="itemName" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="invoice-item-description">
                  Description
                </Label>
                <AvField id="invoice-item-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="qtyLabel" for="invoice-item-qty">
                  Qty
                </Label>
                <AvField id="invoice-item-qty" type="string" className="form-control" name="qty" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="invoice-item-price">
                  Price
                </Label>
                <AvField id="invoice-item-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="discountLabel" for="invoice-item-discount">
                  Discount
                </Label>
                <AvField id="invoice-item-discount" type="string" className="form-control" name="discount" />
              </AvGroup>
              <AvGroup>
                <Label id="totalLabel" for="invoice-item-total">
                  Total
                </Label>
                <AvField id="invoice-item-total" type="string" className="form-control" name="total" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="invoice-item-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="invoice-item-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceItemEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="invoice-item-createdBy">
                  Created By
                </Label>
                <AvField id="invoice-item-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="invoice-item-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="invoice-item-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.invoiceItemEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="invoice-item-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="invoice-item-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="invoice-item-invoice">Invoice</Label>
                <AvInput id="invoice-item-invoice" type="select" className="form-control" name="invoice.id">
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
              <Button tag={Link} id="cancel-save" to="/invoice-item" replace color="info">
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
  invoiceItemEntity: storeState.invoiceItem.entity,
  loading: storeState.invoiceItem.loading,
  updating: storeState.invoiceItem.updating,
  updateSuccess: storeState.invoiceItem.updateSuccess,
});

const mapDispatchToProps = {
  getInvoices,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItemUpdate);
