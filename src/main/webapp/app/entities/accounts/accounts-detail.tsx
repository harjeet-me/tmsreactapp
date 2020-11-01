import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './accounts.reducer';
import { IAccounts } from 'app/shared/model/accounts.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountsDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountsDetail = (props: IAccountsDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { accountsEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Accounts [<b>{accountsEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="balance">Balance</span>
          </dt>
          <dd>{accountsEntity.balance}</dd>
          <dt>
            <span id="over30">Over 30</span>
          </dt>
          <dd>{accountsEntity.over30}</dd>
          <dt>
            <span id="over60">Over 60</span>
          </dt>
          <dd>{accountsEntity.over60}</dd>
          <dt>
            <span id="over90">Over 90</span>
          </dt>
          <dd>{accountsEntity.over90}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {accountsEntity.createdDate ? <TextFormat value={accountsEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{accountsEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {accountsEntity.lastModifiedDate ? (
              <TextFormat value={accountsEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{accountsEntity.lastModifiedBy}</dd>
          <dt>Customer</dt>
          <dd>{accountsEntity.customer ? accountsEntity.customer.company : ''}</dd>
        </dl>
        <Button tag={Link} to="/accounts" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/accounts/${accountsEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ accounts }: IRootState) => ({
  accountsEntity: accounts.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountsDetail);
