import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './company-profile.reducer';
import { ICompanyProfile } from 'app/shared/model/company-profile.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICompanyProfileDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CompanyProfileDetail = (props: ICompanyProfileDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { companyProfileEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          CompanyProfile [<b>{companyProfileEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="active">Active</span>
          </dt>
          <dd>{companyProfileEntity.active ? 'true' : 'false'}</dd>
          <dt>
            <span id="company">Company</span>
          </dt>
          <dd>{companyProfileEntity.company}</dd>
          <dt>
            <span id="address">Address</span>
          </dt>
          <dd>{companyProfileEntity.address}</dd>
          <dt>
            <span id="streetAddress">Street Address</span>
          </dt>
          <dd>{companyProfileEntity.streetAddress}</dd>
          <dt>
            <span id="city">City</span>
          </dt>
          <dd>{companyProfileEntity.city}</dd>
          <dt>
            <span id="stateProvince">State Province</span>
          </dt>
          <dd>{companyProfileEntity.stateProvince}</dd>
          <dt>
            <span id="country">Country</span>
          </dt>
          <dd>{companyProfileEntity.country}</dd>
          <dt>
            <span id="postalCode">Postal Code</span>
          </dt>
          <dd>{companyProfileEntity.postalCode}</dd>
          <dt>
            <span id="email">Email</span>
          </dt>
          <dd>{companyProfileEntity.email}</dd>
          <dt>
            <span id="website">Website</span>
          </dt>
          <dd>{companyProfileEntity.website}</dd>
          <dt>
            <span id="phoneNumber">Phone Number</span>
          </dt>
          <dd>{companyProfileEntity.phoneNumber}</dd>
          <dt>
            <span id="dot">Dot</span>
          </dt>
          <dd>{companyProfileEntity.dot}</dd>
          <dt>
            <span id="mc">Mc</span>
          </dt>
          <dd>{companyProfileEntity.mc}</dd>
          <dt>
            <span id="companyLogo">Company Logo</span>
          </dt>
          <dd>
            {companyProfileEntity.companyLogo ? (
              <div>
                {companyProfileEntity.companyLogoContentType ? (
                  <a onClick={openFile(companyProfileEntity.companyLogoContentType, companyProfileEntity.companyLogo)}>
                    <img
                      src={`data:${companyProfileEntity.companyLogoContentType};base64,${companyProfileEntity.companyLogo}`}
                      style={{ maxHeight: '30px' }}
                    />
                  </a>
                ) : null}
                <span>
                  {companyProfileEntity.companyLogoContentType}, {byteSize(companyProfileEntity.companyLogo)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="profileStatus">Profile Status</span>
          </dt>
          <dd>{companyProfileEntity.profileStatus}</dd>
          <dt>
            <span id="preffredCurrency">Preffred Currency</span>
          </dt>
          <dd>{companyProfileEntity.preffredCurrency}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {companyProfileEntity.createdDate ? (
              <TextFormat value={companyProfileEntity.createdDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{companyProfileEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {companyProfileEntity.lastModifiedDate ? (
              <TextFormat value={companyProfileEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{companyProfileEntity.lastModifiedBy}</dd>
        </dl>
        <Button tag={Link} to="/company-profile" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/company-profile/${companyProfileEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ companyProfile }: IRootState) => ({
  companyProfileEntity: companyProfile.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfileDetail);
