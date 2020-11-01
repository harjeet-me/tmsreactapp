import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TransactionsRecord from './transactions-record';
import TransactionsRecordDetail from './transactions-record-detail';
import TransactionsRecordUpdate from './transactions-record-update';
import TransactionsRecordDeleteDialog from './transactions-record-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TransactionsRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TransactionsRecordUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TransactionsRecordDetail} />
      <ErrorBoundaryRoute path={match.url} component={TransactionsRecord} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TransactionsRecordDeleteDialog} />
  </>
);

export default Routes;
