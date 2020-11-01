import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CompanyProfile from './company-profile';
import Customer from './customer';
import Trip from './trip';
import Invoice from './invoice';
import Payment from './payment';
import InvoiceReport from './invoice-report';
import InvoiceItem from './invoice-item';
import ProductItem from './product-item';
import Accounts from './accounts';
import TransactionsRecord from './transactions-record';
import Container from './container';
import Equipment from './equipment';
import Insurance from './insurance';
import Contact from './contact';
import Driver from './driver';
import Carrier from './carrier';
import Location from './location';
import Email from './email';
import InvoiceHistory from './invoice-history';
import AccountHistory from './account-history';
import Report from './report';
import FileSystem from './file-system';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}company-profile`} component={CompanyProfile} />
      <ErrorBoundaryRoute path={`${match.url}customer`} component={Customer} />
      <ErrorBoundaryRoute path={`${match.url}trip`} component={Trip} />
      <ErrorBoundaryRoute path={`${match.url}invoice`} component={Invoice} />
      <ErrorBoundaryRoute path={`${match.url}payment`} component={Payment} />
      <ErrorBoundaryRoute path={`${match.url}invoice-report`} component={InvoiceReport} />
      <ErrorBoundaryRoute path={`${match.url}invoice-item`} component={InvoiceItem} />
      <ErrorBoundaryRoute path={`${match.url}product-item`} component={ProductItem} />
      <ErrorBoundaryRoute path={`${match.url}accounts`} component={Accounts} />
      <ErrorBoundaryRoute path={`${match.url}transactions-record`} component={TransactionsRecord} />
      <ErrorBoundaryRoute path={`${match.url}container`} component={Container} />
      <ErrorBoundaryRoute path={`${match.url}equipment`} component={Equipment} />
      <ErrorBoundaryRoute path={`${match.url}insurance`} component={Insurance} />
      <ErrorBoundaryRoute path={`${match.url}contact`} component={Contact} />
      <ErrorBoundaryRoute path={`${match.url}driver`} component={Driver} />
      <ErrorBoundaryRoute path={`${match.url}carrier`} component={Carrier} />
      <ErrorBoundaryRoute path={`${match.url}location`} component={Location} />
      <ErrorBoundaryRoute path={`${match.url}email`} component={Email} />
      <ErrorBoundaryRoute path={`${match.url}invoice-history`} component={InvoiceHistory} />
      <ErrorBoundaryRoute path={`${match.url}account-history`} component={AccountHistory} />
      <ErrorBoundaryRoute path={`${match.url}report`} component={Report} />
      <ErrorBoundaryRoute path={`${match.url}file-system`} component={FileSystem} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
