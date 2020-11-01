import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomerDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CustomerDetail = (props: ICustomerDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { customerEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Customer [<b>{customerEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="company">Company</span>
          </dt>
          <dd>{customerEntity.company}</dd>
          <dt>
            <span id="firstName">First Name</span>
          </dt>
          <dd>{customerEntity.firstName}</dd>
          <dt>
            <span id="lastName">Last Name</span>
          </dt>
          <dd>{customerEntity.lastName}</dd>
          <dt>
            <span id="contactDesignation">Contact Designation</span>
          </dt>
          <dd>{customerEntity.contactDesignation}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{customerEntity.email}</dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{customerEntity.phoneNumber}</dd>
          <dt>
            <span id="phoneNumberExtention">Phone Number Extention</span>
          </dt>
          <dd>{customerEntity.phoneNumberExtention}</dd>
          <dt>
            <span id="preffredContactType">Preffred Contact Type</span>
          </dt>
          <dd>{customerEntity.preffredContactType}</dd>
          <dt>
            <span id="website">Website</span>
          </dt>
          <dd>{customerEntity.website}</dd>
          <dt>
            <span id="alternateContactPerson">Alternate Contact Person</span>
          </dt>
          <dd>{customerEntity.alternateContactPerson}</dd>
          <dt>
            <span id="alternateContactNumber">Alternate Contact Number</span>
          </dt>
          <dd>{customerEntity.alternateContactNumber}</dd>
          <dt>
            <span id="alternatePhoneNumberExtention">Alternate Phone Number Extention</span>
          </dt>
          <dd>{customerEntity.alternatePhoneNumberExtention}</dd>
          <dt>
            <span id="alternateContactEmail">Alternate Contact Email</span>
          </dt>
          <dd>{customerEntity.alternateContactEmail}</dd>
          <dt>
            <span id="preferredContactTime">Preferred Contact Time</span>
          </dt>
          <dd>
            {customerEntity.preferredContactTime ? (
              <TextFormat value={customerEntity.preferredContactTime} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="fax">Fax</span>
          </dt>
          <dd>{customerEntity.fax}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{customerEntity.address}</dd>
          <dt>
            <span id="streetAddress">Street Address</span>
          </dt>
          <dd>{customerEntity.streetAddress}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{customerEntity.city}</dd>
          <dt>
            <span id="stateProvince">State Province</span>
          </dt>
          <dd>{customerEntity.stateProvince}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{customerEntity.country}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{customerEntity.postalCode}</dd>
          <dt>
            <span id="dot">Dot</span>
          </dt>
          <dd>{customerEntity.dot}</dd>
          <dt>
            <span id="mc">Mc</span>
          </dt>
          <dd>{customerEntity.mc}</dd>
          <dt>
            <span id="taxId">Tax Id</span>
          </dt>
          <dd>{customerEntity.taxId}</dd>
          <dt>
            <span id="companyLogo">Company Logo</span>
          </dt>
          <dd>
            {customerEntity.companyLogo ? (
              <div>
                {customerEntity.companyLogoContentType ? (
                  <a onClick={openFile(customerEntity.companyLogoContentType, customerEntity.companyLogo)}>
                    <img
                      src={`data:${customerEntity.companyLogoContentType};base64,${customerEntity.companyLogo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {customerEntity.companyLogoContentType}, {byteSize(customerEntity.companyLogo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="customerSince">Customer Since</span>
          </dt>
          <dd>
            {customerEntity.customerSince ? (
              <TextFormat value={customerEntity.customerSince} type="date" format={APP_LOCAL_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="notes">Notes</span>
          </dt>
          <dd>{customerEntity.notes}</dd>
          <dt>
            <span id="contract">Contract</span>
          </dt>
          <dd>
            {customerEntity.contract ? (
              <div>
                {customerEntity.contractContentType ? (
                  <a onClick={openFile(customerEntity.contractContentType, customerEntity.contract)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {customerEntity.contractContentType}, {byteSize(customerEntity.contract)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{customerEntity.status}</dd>
          <dt>
            <span id="preffredCurrency">Preffred Currency</span>
          </dt>
          <dd>{customerEntity.preffredCurrency}</dd>
          <dt>
            <span id="payterms">Payterms</span>
          </dt>
          <dd>{customerEntity.payterms}</dd>
          <dt>
            <span id="timeZone">Time Zone</span>
          </dt>
          <dd>{customerEntity.timeZone ? <TextFormat value={customerEntity.timeZone} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {customerEntity.createdDate ? <TextFormat value={customerEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{customerEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {customerEntity.lastModifiedDate ? (
              <TextFormat value={customerEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{customerEntity.lastModifiedBy}</dd>
          <dt>Charge</dt>
          <dd>
            {customerEntity.charges
              ? customerEntity.charges.map((val, i) => (
                  <span key={val.id}>
                    <a>{val.itemName}</a>
                    {customerEntity.charges && i === customerEntity.charges.length - 1 ? '' : ', '}
                  </span>
                ))
              : null}
          </dd>
        </dl>
        <Button tag={Link} to="/customer" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/customer/${customerEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerEntity: customer.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CustomerDetail);
