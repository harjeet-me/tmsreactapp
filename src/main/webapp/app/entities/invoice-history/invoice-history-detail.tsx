import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './invoice-history.reducer';
import { IInvoiceHistory } from 'app/shared/model/invoice-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInvoiceHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InvoiceHistoryDetail = (props: IInvoiceHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { invoiceHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          InvoiceHistory [<b>{invoiceHistoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{invoiceHistoryEntity.status}</dd>
          <dt>
            <span id="comment">Comment</span>
          </dt>
          <dd>{invoiceHistoryEntity.comment}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {invoiceHistoryEntity.createdDate ? (
              <TextFormat value={invoiceHistoryEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{invoiceHistoryEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {invoiceHistoryEntity.lastModifiedDate ? (
              <TextFormat value={invoiceHistoryEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{invoiceHistoryEntity.lastModifiedBy}</dd>
          <dt>Previous</dt>
          <dd>{invoiceHistoryEntity.previous ? invoiceHistoryEntity.previous.status : ''}</dd>
          <dt>Next</dt>
          <dd>{invoiceHistoryEntity.next ? invoiceHistoryEntity.next.status : ''}</dd>
          <dt>Invoice</dt>
          <dd>{invoiceHistoryEntity.invoice ? invoiceHistoryEntity.invoice.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/invoice-history" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/invoice-history/${invoiceHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ invoiceHistory }: IRootState) => ({
  invoiceHistoryEntity: invoiceHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceHistoryDetail);
