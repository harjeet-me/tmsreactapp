import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './transactions-record.reducer';
import { ITransactionsRecord } from 'app/shared/model/transactions-record.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITransactionsRecordDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TransactionsRecordDetail = (props: ITransactionsRecordDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { transactionsRecordEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          TransactionsRecord [<b>{transactionsRecordEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="txType">Tx Type</span>
          </dt>
          <dd>{transactionsRecordEntity.txType}</dd>
          <dt>
            <span id="txRef">Tx Ref</span>
          </dt>
          <dd>{transactionsRecordEntity.txRef}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{transactionsRecordEntity.description}</dd>
          <dt>
            <span id="txAmmount">Tx Ammount</span>
          </dt>
          <dd>{transactionsRecordEntity.txAmmount}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {transactionsRecordEntity.createdDate ? (
              <TextFormat value={transactionsRecordEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{transactionsRecordEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {transactionsRecordEntity.lastModifiedDate ? (
              <TextFormat value={transactionsRecordEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{transactionsRecordEntity.lastModifiedBy}</dd>
          <dt>Customer</dt>
          <dd>{transactionsRecordEntity.customer ? transactionsRecordEntity.customer.company : ''}</dd>
        </dl>
        <Button tag={Link} to="/transactions-record" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/transactions-record/${transactionsRecordEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ transactionsRecord }: IRootState) => ({
  transactionsRecordEntity: transactionsRecord.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsRecordDetail);
