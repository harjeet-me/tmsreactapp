import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './carrier.reducer';
import { ICarrier } from 'app/shared/model/carrier.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICarrierDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CarrierDetail = (props: ICarrierDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { carrierEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Carrier [<b>{carrierEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="company">Company</span>
          </dt>
          <dd>{carrierEntity.company}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{carrierEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{carrierEntity.lastName}</dd>
          <dt>
            <span id="contactDesignation">Contact Designation</span>
          </dt>
          <dd>{carrierEntity.contactDesignation}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{carrierEntity.email}</dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{carrierEntity.phoneNumber}</dd>
          <dt>
            <span id="phoneNumberExtention">Phone Number Extention</span>
          </dt>
          <dd>{carrierEntity.phoneNumberExtention}</dd>
          <dt>
            <span id="preffredContactType">Preffred Contact Type</span>
          </dt>
          <dd>{carrierEntity.preffredContactType}</dd>
          <dt>
            <span id="website">Website</span>
          </dt>
          <dd>{carrierEntity.website}</dd>
          <dt>
            <span id="alternateContactPerson">Alternate Contact Person</span>
          </dt>
          <dd>{carrierEntity.alternateContactPerson}</dd>
          <dt>
            <span id="alternateContactNumber">Alternate Contact Number</span>
          </dt>
          <dd>{carrierEntity.alternateContactNumber}</dd>
          <dt>
            <span id="alternatePhoneNumberExtention">Alternate Phone Number Extention</span>
          </dt>
          <dd>{carrierEntity.alternatePhoneNumberExtention}</dd>
          <dt>
            <span id="alternateContactEmail">Alternate Contact Email</span>
          </dt>
          <dd>{carrierEntity.alternateContactEmail}</dd>
          <dt>
            <span id="preferredContactTime">Preferred Contact Time</span>
          </dt>
          <dd>{carrierEntity.preferredContactTime}</dd>
          <dt>
            <span id="fax">Fax</span>
          </dt>
          <dd>{carrierEntity.fax}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{carrierEntity.address}</dd>
          <dt>
            <span id="streetAddress">Street Address</span>
          </dt>
          <dd>{carrierEntity.streetAddress}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{carrierEntity.city}</dd>
          <dt>
            <span id="stateProvince">State Province</span>
          </dt>
          <dd>{carrierEntity.stateProvince}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{carrierEntity.country}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{carrierEntity.postalCode}</dd>
          <dt>
            <span id="dot">Dot</span>
          </dt>
          <dd>{carrierEntity.dot}</dd>
          <dt>
            <span id="mc">Mc</span>
          </dt>
          <dd>{carrierEntity.mc}</dd>
          <dt>
            <span id="taxId">Tax Id</span>
          </dt>
          <dd>{carrierEntity.taxId}</dd>
          <dt>
            <span id="companyLogo">Company Logo</span>
          </dt>
          <dd>
            {carrierEntity.companyLogo ? (
              <div>
                {carrierEntity.companyLogoContentType ? (
                  <a onClick={openFile(carrierEntity.companyLogoContentType, carrierEntity.companyLogo)}>
                    <img
                      src={`data:${carrierEntity.companyLogoContentType};base64,${carrierEntity.companyLogo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {carrierEntity.companyLogoContentType}, {byteSize(carrierEntity.companyLogo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="customerSince">Customer Since</span>
          </dt>
          <dd>
            {carrierEntity.customerSince ? (
              <TextFormat value={carrierEntity.customerSince} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{carrierEntity.notes}</dd>
          <dt>
            <span id="contract">Contract</span>
          </dt>
          <dd>
            {carrierEntity.contract ? (
              <div>
                {carrierEntity.contractContentType ? (
                  <a onClick={openFile(carrierEntity.contractContentType, carrierEntity.contract)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {carrierEntity.contractContentType}, {byteSize(carrierEntity.contract)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{carrierEntity.status}</dd>
          <dt>
            <span id="preffredCurrency">Preffred Currency</span>
          </dt>
          <dd>{carrierEntity.preffredCurrency}</dd>
          <dt>
            <span id="payterms">Payterms</span>
          </dt>
          <dd>{carrierEntity.payterms}</dd>
          <dt>
            <span id="timeZone">Time Zone</span>
          </dt>
          <dd>{carrierEntity.timeZone ? <TextFormat value={carrierEntity.timeZone} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {carrierEntity.createdDate ? <TextFormat value={carrierEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{carrierEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {carrierEntity.lastModifiedDate ? (
              <TextFormat value={carrierEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{carrierEntity.lastModifiedBy}</dd>
          <dt>Oper Insurance</dt>
          <dd>{carrierEntity.operInsurance ? carrierEntity.operInsurance.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/carrier" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/carrier/${carrierEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ carrier }: IRootState) => ({
  carrierEntity: carrier.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CarrierDetail);
