import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './payment.reducer';
import { IPayment } from 'app/shared/model/payment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPaymentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const PaymentDetail = (props: IPaymentDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { paymentEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Payment [<b>{paymentEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="invoiceNo">Invoice No</span>
          </dt>
          <dd>{paymentEntity.invoiceNo}</dd>
          <dt>
            <span id="payDate">Pay Date</span>
          </dt>
          <dd>{paymentEntity.payDate ? <TextFormat value={paymentEntity.payDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="payRefNo">Pay Ref No</span>
          </dt>
          <dd>{paymentEntity.payRefNo}</dd>
          <dt>
            <span id="mode">Mode</span>
          </dt>
          <dd>{paymentEntity.mode}</dd>
          <dt>
            <span id="ammount">Ammount</span>
          </dt>
          <dd>{paymentEntity.ammount}</dd>
          <dt>
            <span id="unusedAmmount">Unused Ammount</span>
          </dt>
          <dd>{paymentEntity.unusedAmmount}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {paymentEntity.createdDate ? <TextFormat value={paymentEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{paymentEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {paymentEntity.lastModifiedDate ? (
              <TextFormat value={paymentEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{paymentEntity.lastModifiedBy}</dd>
          <dt>Customer</dt>
          <dd>{paymentEntity.customer ? paymentEntity.customer.company : ''}</dd>
        </dl>
        <Button tag={Link} to="/payment" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/payment/${paymentEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ payment }: IRootState) => ({
  paymentEntity: payment.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PaymentDetail);
