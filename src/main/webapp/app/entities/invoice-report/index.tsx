import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvoiceReport from './invoice-report';
import InvoiceReportDetail from './invoice-report-detail';
import InvoiceReportUpdate from './invoice-report-update';
import InvoiceReportDeleteDialog from './invoice-report-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvoiceReportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvoiceReportUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvoiceReportDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvoiceReport} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InvoiceReportDeleteDialog} />
  </>
);

export default Routes;
