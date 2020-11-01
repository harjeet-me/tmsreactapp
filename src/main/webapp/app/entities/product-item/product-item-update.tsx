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
import { getEntity, updateEntity, createEntity, reset } from './product-item.reducer';
import { IProductItem } from 'app/shared/model/product-item.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IProductItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductItemUpdate = (props: IProductItemUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { productItemEntity, customers, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/product-item');
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
        ...productItemEntity,
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
          <h2 id="tmsreactappApp.productItem.home.createOrEditLabel">Create or edit a ProductItem</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : productItemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="product-item-id">ID</Label>
                  <AvInput id="product-item-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="itemNameLabel" for="product-item-itemName">
                  Item Name
                </Label>
                <AvField id="product-item-itemName" type="text" name="itemName" />
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="product-item-description">
                  Description
                </Label>
                <AvField id="product-item-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="defaultQtyLabel" for="product-item-defaultQty">
                  Default Qty
                </Label>
                <AvField id="product-item-defaultQty" type="string" className="form-control" name="defaultQty" />
              </AvGroup>
              <AvGroup>
                <Label id="priceLabel" for="product-item-price">
                  Price
                </Label>
                <AvField id="product-item-price" type="string" className="form-control" name="price" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="product-item-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="product-item-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.productItemEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="product-item-createdBy">
                  Created By
                </Label>
                <AvField id="product-item-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="product-item-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="product-item-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.productItemEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="product-item-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="product-item-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/product-item" replace color="info">
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
  productItemEntity: storeState.productItem.entity,
  loading: storeState.productItem.loading,
  updating: storeState.productItem.updating,
  updateSuccess: storeState.productItem.updateSuccess,
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductItemUpdate);
