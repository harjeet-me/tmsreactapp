import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import {
  openFile,
  byteSize,
  ICrudGetAllAction,
  TextFormat,
  getSortState,
  IPaginationBaseState,
  JhiPagination,
  JhiItemCount,
} from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './customer.reducer';
import { ICustomer } from 'app/shared/model/customer.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { ITEMS_PER_PAGE } from 'app/shared/util/pagination.constants';
import { overridePaginationStateWithQueryParams } from 'app/shared/util/entity-utils';

export interface ICustomerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Customer = (props: ICustomerProps) => {
  const [paginationState, setPaginationState] = useState(
    overridePaginationStateWithQueryParams(getSortState(props.location, ITEMS_PER_PAGE), props.location.search)
  );

  const getAllEntities = () => {
    props.getEntities(paginationState.activePage - 1, paginationState.itemsPerPage, `${paginationState.sort},${paginationState.order}`);
  };

  const sortEntities = () => {
    getAllEntities();
    const endURL = `?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`;
    if (props.location.search !== endURL) {
      props.history.push(`${props.location.pathname}${endURL}`);
    }
  };

  useEffect(() => {
    sortEntities();
  }, [paginationState.activePage, paginationState.order, paginationState.sort]);

  useEffect(() => {
    const params = new URLSearchParams(props.location.search);
    const page = params.get('page');
    const sort = params.get('sort');
    if (page && sort) {
      const sortSplit = sort.split(',');
      setPaginationState({
        ...paginationState,
        activePage: +page,
        sort: sortSplit[0],
        order: sortSplit[1],
      });
    }
  }, [props.location.search]);

  const sort = p => () => {
    setPaginationState({
      ...paginationState,
      order: paginationState.order === 'asc' ? 'desc' : 'asc',
      sort: p,
    });
  };

  const handlePagination = currentPage =>
    setPaginationState({
      ...paginationState,
      activePage: currentPage,
    });

  const { customerList, match, loading, totalItems } = props;
  return (
    <div>
      <h2 id="customer-heading">
        Customers
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Customer
        </Link>
      </h2>
      <div className="table-responsive">
        {customerList && customerList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th className="hand" onClick={sort('id')}>
                  ID <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('company')}>
                  Company <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('firstName')}>
                  First Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastName')}>
                  Last Name <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('contactDesignation')}>
                  Contact Designation <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('email')}>
                  Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneNumber')}>
                  Phone Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('phoneNumberExtention')}>
                  Phone Number Extention <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preffredContactType')}>
                  Preffred Contact Type <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('website')}>
                  Website <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('alternateContactPerson')}>
                  Alternate Contact Person <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('alternateContactNumber')}>
                  Alternate Contact Number <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('alternatePhoneNumberExtention')}>
                  Alternate Phone Number Extention <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('alternateContactEmail')}>
                  Alternate Contact Email <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preferredContactTime')}>
                  Preferred Contact Time <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('fax')}>
                  Fax <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('address')}>
                  Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('streetAddress')}>
                  Street Address <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('city')}>
                  City <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('stateProvince')}>
                  State Province <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('country')}>
                  Country <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('postalCode')}>
                  Postal Code <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('dot')}>
                  Dot <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('mc')}>
                  Mc <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('taxId')}>
                  Tax Id <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('companyLogo')}>
                  Company Logo <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('customerSince')}>
                  Customer Since <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('notes')}>
                  Notes <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('contract')}>
                  Contract <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('status')}>
                  Status <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('preffredCurrency')}>
                  Preffred Currency <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('payterms')}>
                  Payterms <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('timeZone')}>
                  Time Zone <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdDate')}>
                  Created Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('createdBy')}>
                  Created By <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifiedDate')}>
                  Last Modified Date <FontAwesomeIcon icon="sort" />
                </th>
                <th className="hand" onClick={sort('lastModifiedBy')}>
                  Last Modified By <FontAwesomeIcon icon="sort" />
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customerList.map((customer, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${customer.id}`} color="link" size="sm">
                      {customer.id}
                    </Button>
                  </td>
                  <td>{customer.company}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.contactDesignation}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phoneNumber}</td>
                  <td>{customer.phoneNumberExtention}</td>
                  <td>{customer.preffredContactType}</td>
                  <td>{customer.website}</td>
                  <td>{customer.alternateContactPerson}</td>
                  <td>{customer.alternateContactNumber}</td>
                  <td>{customer.alternatePhoneNumberExtention}</td>
                  <td>{customer.alternateContactEmail}</td>
                  <td>
                    {customer.preferredContactTime ? (
                      <TextFormat type="date" value={customer.preferredContactTime} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{customer.fax}</td>
                  <td>{customer.address}</td>
                  <td>{customer.streetAddress}</td>
                  <td>{customer.city}</td>
                  <td>{customer.stateProvince}</td>
                  <td>{customer.country}</td>
                  <td>{customer.postalCode}</td>
                  <td>{customer.dot}</td>
                  <td>{customer.mc}</td>
                  <td>{customer.taxId}</td>
                  <td>
                    {customer.companyLogo ? (
                      <div>
                        {customer.companyLogoContentType ? (
                          <a onClick={openFile(customer.companyLogoContentType, customer.companyLogo)}>
                            <img
                              src={`data:${customer.companyLogoContentType};base64,${customer.companyLogo}`}
                              style={{ maxHeight: '30px' }}
                            />
                            &nbsp;
                          </a>
                        ) : null}
                        <span>
                          {customer.companyLogoContentType}, {byteSize(customer.companyLogo)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>
                    {customer.customerSince ? (
                      <TextFormat type="date" value={customer.customerSince} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{customer.notes}</td>
                  <td>
                    {customer.contract ? (
                      <div>
                        {customer.contractContentType ? (
                          <a onClick={openFile(customer.contractContentType, customer.contract)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {customer.contractContentType}, {byteSize(customer.contract)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{customer.status}</td>
                  <td>{customer.preffredCurrency}</td>
                  <td>{customer.payterms}</td>
                  <td>{customer.timeZone ? <TextFormat type="date" value={customer.timeZone} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{customer.createdDate ? <TextFormat type="date" value={customer.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{customer.createdBy}</td>
                  <td>
                    {customer.lastModifiedDate ? (
                      <TextFormat type="date" value={customer.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{customer.lastModifiedBy}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${customer.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${customer.id}/edit?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="primary"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button
                        tag={Link}
                        to={`${match.url}/${customer.id}/delete?page=${paginationState.activePage}&sort=${paginationState.sort},${paginationState.order}`}
                        color="danger"
                        size="sm"
                      >
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Customers found</div>
        )}
      </div>
      {props.totalItems ? (
        <div className={customerList && customerList.length > 0 ? '' : 'd-none'}>
          <Row className="justify-content-center">
            <JhiItemCount page={paginationState.activePage} total={totalItems} itemsPerPage={paginationState.itemsPerPage} />
          </Row>
          <Row className="justify-content-center">
            <JhiPagination
              activePage={paginationState.activePage}
              onSelect={handlePagination}
              maxButtons={5}
              itemsPerPage={paginationState.itemsPerPage}
              totalItems={props.totalItems}
            />
          </Row>
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

const mapStateToProps = ({ customer }: IRootState) => ({
  customerList: customer.entities,
  loading: customer.loading,
  totalItems: customer.totalItems,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Customer);
