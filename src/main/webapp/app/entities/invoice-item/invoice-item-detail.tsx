import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-item.reducer';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceItemDetail = (props: IInvoiceItemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceItemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          InvoiceItem [<b>{invoiceItemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="itemName">Item Name</span>
          </dt>
          <dd>{invoiceItemEntity.itemName}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{invoiceItemEntity.description}</dd>
          <dt>
            <span id="qty">Qty</span>
          </dt>
          <dd>{invoiceItemEntity.qty}</dd>
          <dt>
            <span id="price">Price</span>
          </dt>
          <dd>{invoiceItemEntity.price}</dd>
          <dt>
            <span id="discount">Discount</span>
          </dt>
          <dd>{invoiceItemEntity.discount}</dd>
          <dt>
            <span id="total">Total</span>
          </dt>
          <dd>{invoiceItemEntity.total}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {invoiceItemEntity.createdDate ? (
              <TextFormat value={invoiceItemEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{invoiceItemEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {invoiceItemEntity.lastModifiedDate ? (
              <TextFormat value={invoiceItemEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{invoiceItemEntity.lastModifiedBy}</dd>
          <dt>Invoice</dt>
          <dd>{invoiceItemEntity.invoice ? invoiceItemEntity.invoice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice-item" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice-item/${invoiceItemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoiceItem }: IRootState) => ({
  invoiceItemEntity: invoiceItem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceItemDetail);
