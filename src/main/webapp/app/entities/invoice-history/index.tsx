import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import InvoiceHistory from './invoice-history';
import InvoiceHistoryDetail from './invoice-history-detail';
import InvoiceHistoryUpdate from './invoice-history-update';
import InvoiceHistoryDeleteDialog from './invoice-history-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={InvoiceHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={InvoiceHistoryUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={InvoiceHistoryDetail} />
      <ErrorBoundaryRoute path={match.url} component={InvoiceHistory} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={InvoiceHistoryDeleteDialog} />
  </>
);

export default Routes;
