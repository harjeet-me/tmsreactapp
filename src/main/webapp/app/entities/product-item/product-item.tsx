import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './product-item.reducer';
import { IProductItem } from 'app/shared/model/product-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IProductItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const ProductItem = (props: IProductItemProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { productItemList, match, loading } = props;
  return (
    <div>
      <h2 id="product-item-heading">
        Product Items
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Product Item
        </Link>
      </h2>
      <div className="table-responsive">
        {productItemList && productItemList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Description</th>
                <th>Default Qty</th>
                <th>Price</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {productItemList.map((productItem, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${productItem.id}`} color="link" size="sm">
                      {productItem.id}
                    </Button>
                  </td>
                  <td>{productItem.itemName}</td>
                  <td>{productItem.description}</td>
                  <td>{productItem.defaultQty}</td>
                  <td>{productItem.price}</td>
                  <td>
                    {productItem.createdDate ? <TextFormat type="date" value={productItem.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{productItem.createdBy}</td>
                  <td>
                    {productItem.lastModifiedDate ? (
                      <TextFormat type="date" value={productItem.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{productItem.lastModifiedBy}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${productItem.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productItem.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${productItem.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Product Items found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ productItem }: IRootState) => ({
  productItemList: productItem.entities,
  loading: productItem.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
