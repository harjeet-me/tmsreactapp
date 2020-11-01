import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './account-history.reducer';
import { IAccountHistory } from 'app/shared/model/account-history.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAccountHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const AccountHistoryDetail = (props: IAccountHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { accountHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          AccountHistory [<b>{accountHistoryEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="enityName">Enity Name</span>
          </dt>
          <dd>{accountHistoryEntity.enityName}</dd>
          <dt>
            <span id="entityLink">Entity Link</span>
          </dt>
          <dd>{accountHistoryEntity.entityLink}</dd>
          <dt>
            <span id="action">Action</span>
          </dt>
          <dd>{accountHistoryEntity.action}</dd>
        </dl>
        <Button tag={Link} to="/account-history" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/account-history/${accountHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ accountHistory }: IRootState) => ({
  accountHistoryEntity: accountHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(AccountHistoryDetail);
