import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import FileSystem from './file-system';
import FileSystemDetail from './file-system-detail';
import FileSystemUpdate from './file-system-update';
import FileSystemDeleteDialog from './file-system-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={FileSystemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={FileSystemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={FileSystemDetail} />
      <ErrorBoundaryRoute path={match.url} component={FileSystem} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={FileSystemDeleteDialog} />
  </>
);

export default Routes;
