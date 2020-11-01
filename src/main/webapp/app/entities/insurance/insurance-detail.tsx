import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './insurance.reducer';
import { IInsurance } from 'app/shared/model/insurance.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IInsuranceDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const InsuranceDetail = (props: IInsuranceDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { insuranceEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Insurance [<b>{insuranceEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="providerName">Provider Name</span>
          </dt>
          <dd>{insuranceEntity.providerName}</dd>
          <dt>
            <span id="issueDate">Issue Date</span>
          </dt>
          <dd>
            {insuranceEntity.issueDate ? <TextFormat value={insuranceEntity.issueDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="expiryDate">Expiry Date</span>
          </dt>
          <dd>
            {insuranceEntity.expiryDate ? (
              <TextFormat value={insuranceEntity.expiryDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="policyDocument">Policy Document</span>
          </dt>
          <dd>
            {insuranceEntity.policyDocument ? (
              <div>
                {insuranceEntity.policyDocumentContentType ? (
                  <a onClick={openFile(insuranceEntity.policyDocumentContentType, insuranceEntity.policyDocument)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {insuranceEntity.policyDocumentContentType}, {byteSize(insuranceEntity.policyDocument)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="coverageStatement">Coverage Statement</span>
          </dt>
          <dd>{insuranceEntity.coverageStatement}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {insuranceEntity.createdDate ? <TextFormat value={insuranceEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{insuranceEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {insuranceEntity.lastModifiedDate ? (
              <TextFormat value={insuranceEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{insuranceEntity.lastModifiedBy}</dd>
        </dl>
        <Button tag={Link} to="/insurance" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/insurance/${insuranceEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ insurance }: IRootState) => ({
  insuranceEntity: insurance.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(InsuranceDetail);
