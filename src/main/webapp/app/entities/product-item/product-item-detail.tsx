import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './product-item.reducer';
import { IProductItem } from 'app/shared/model/product-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ProductItemDetail = (props: IProductItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { productItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          ProductItem [<b>{productItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="itemName">Item Name</span>
          </dt>
          <dd>{productItemEntity.itemName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{productItemEntity.description}</dd>
          <dt>
            <span id="defaultQty">Default Qty</span>
          </dt>
          <dd>{productItemEntity.defaultQty}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{productItemEntity.price}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {productItemEntity.createdDate ? (
              <TextFormat value={productItemEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{productItemEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {productItemEntity.lastModifiedDate ? (
              <TextFormat value={productItemEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{productItemEntity.lastModifiedBy}</dd>
        </dl>
        <Button tag={Link} to="/product-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/product-item/${productItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ productItem }: IRootState) => ({
  productItemEntity: productItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductItemDetail);
