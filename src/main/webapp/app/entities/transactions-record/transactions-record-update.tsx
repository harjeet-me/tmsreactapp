import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './transactions-record.reducer';
import { ITransactionsRecord } from 'app/shared/model/transactions-record.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITransactionsRecordUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionsRecordUpdate = (props: ITransactionsRecordUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { transactionsRecordEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/transactions-record' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
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
        ...transactionsRecordEntity,
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
          <h2 id="tmsreactappApp.transactionsRecord.home.createOrEditLabel">Create or edit a TransactionsRecord</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : transactionsRecordEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="transactions-record-id">ID</Label>
                  <AvInput id="transactions-record-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="txTypeLabel" for="transactions-record-txType">
                  Tx Type
                </Label>
                <AvInput
                  id="transactions-record-txType"
                  type="select"
                  className="form-control"
                  name="txType"
                  value={(!isNew && transactionsRecordEntity.txType) || 'CREDIT'}
                >
                  <option value="CREDIT">CREDIT</option>
                  <option value="INVOICE">INVOICE</option>
                  <option value="PAYMENT">PAYMENT</option>
                  <option value="REFUND">REFUND</option>
                  <option value="ADJUSTMENT">ADJUSTMENT</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="txRefLabel" for="transactions-record-txRef">
                  Tx Ref
                </Label>
                <AvField id="transactions-record-txRef" type="text" name="txRef" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="transactions-record-description">
                  Description
                </Label>
                <AvField id="transactions-record-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="txAmmountLabel" for="transactions-record-txAmmount">
                  Tx Ammount
                </Label>
                <AvField id="transactions-record-txAmmount" type="string" className="form-control" name="txAmmount" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="transactions-record-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="transactions-record-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.transactionsRecordEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="transactions-record-createdBy">
                  Created By
                </Label>
                <AvField id="transactions-record-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="transactions-record-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="transactions-record-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.transactionsRecordEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="transactions-record-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="transactions-record-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="transactions-record-customer">Customer</Label>
                <AvInput id="transactions-record-customer" type="select" className="form-control" name="customer.id">
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
              <Button tag={Link} id="cancel-save" to="/transactions-record" replace color="info">
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
  customers: storeState.customer.entities,
  transactionsRecordEntity: storeState.transactionsRecord.entity,
  loading: storeState.transactionsRecord.loading,
  updating: storeState.transactionsRecord.updating,
  updateSuccess: storeState.transactionsRecord.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsRecordUpdate);
