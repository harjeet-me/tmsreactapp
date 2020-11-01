import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './driver.reducer';
import { IDriver } from 'app/shared/model/driver.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDriverDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DriverDetail = (props: IDriverDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { driverEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Driver [<b>{driverEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="company">Company</span>
          </dt>
          <dd>{driverEntity.company}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{driverEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{driverEntity.lastName}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{driverEntity.email}</dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{driverEntity.phoneNumber}</dd>
          <dt>
            <span id="licenceNumber">Licence Number</span>
          </dt>
          <dd>{driverEntity.licenceNumber}</dd>
          <dt>
            <span id="dob">Dob</span>
          </dt>
          <dd>{driverEntity.dob ? <TextFormat value={driverEntity.dob} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="companyJoinedOn">Company Joined On</span>
          </dt>
          <dd>
            {driverEntity.companyJoinedOn ? (
              <TextFormat value={driverEntity.companyJoinedOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="companyLeftOn">Company Left On</span>
          </dt>
          <dd>
            {driverEntity.companyLeftOn ? (
              <TextFormat value={driverEntity.companyLeftOn} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="image">Image</span>
          </dt>
          <dd>
            {driverEntity.image ? (
              <div>
                {driverEntity.imageContentType ? (
                  <a onClick={openFile(driverEntity.imageContentType, driverEntity.image)}>
                    <img src={`data:${driverEntity.imageContentType};base64,${driverEntity.image}`} style={{ maxHeight: '30px' }} />
                  </a>
                ) : null}
                <span>
                  {driverEntity.imageContentType}, {byteSize(driverEntity.image)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="licenceImage">Licence Image</span>
          </dt>
          <dd>
            {driverEntity.licenceImage ? (
              <div>
                {driverEntity.licenceImageContentType ? (
                  <a onClick={openFile(driverEntity.licenceImageContentType, driverEntity.licenceImage)}>
                    <img
                      src={`data:${driverEntity.licenceImageContentType};base64,${driverEntity.licenceImage}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {driverEntity.licenceImageContentType}, {byteSize(driverEntity.licenceImage)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="remarks">Remarks</span>
          </dt>
          <dd>{driverEntity.remarks}</dd>
          <dt>
            <span id="contractDoc">Contract Doc</span>
          </dt>
          <dd>
            {driverEntity.contractDoc ? (
              <div>
                {driverEntity.contractDocContentType ? (
                  <a onClick={openFile(driverEntity.contractDocContentType, driverEntity.contractDoc)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {driverEntity.contractDocContentType}, {byteSize(driverEntity.contractDoc)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{driverEntity.status}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>{driverEntity.createdDate ? <TextFormat value={driverEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{driverEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {driverEntity.lastModifiedDate ? (
              <TextFormat value={driverEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{driverEntity.lastModifiedBy}</dd>
        </dl>
        <Button tag={Link} to="/driver" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/driver/${driverEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ driver }: IRootState) => ({
  driverEntity: driver.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DriverDetail);
