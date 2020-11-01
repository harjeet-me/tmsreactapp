import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { openFile, byteSize, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReportProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Report = (props: IReportProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { reportList, match, loading } = props;
  return (
    <div>
      <h2 id="report-heading">
        Reports
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Report
        </Link>
      </h2>
      <div className="table-responsive">
        {reportList && reportList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Report Type</th>
                <th>Description</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>Attachment</th>
                <th>Email To</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {reportList.map((report, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${report.id}`} color="link" size="sm">
                      {report.id}
                    </Button>
                  </td>
                  <td>{report.reportType}</td>
                  <td>{report.description}</td>
                  <td>{report.fromDate ? <TextFormat type="date" value={report.fromDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{report.toDate ? <TextFormat type="date" value={report.toDate} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>
                    {report.attachment ? (
                      <div>
                        {report.attachmentContentType ? (
                          <a onClick={openFile(report.attachmentContentType, report.attachment)}>Open &nbsp;</a>
                        ) : null}
                        <span>
                          {report.attachmentContentType}, {byteSize(report.attachment)}
                        </span>
                      </div>
                    ) : null}
                  </td>
                  <td>{report.emailTo}</td>
                  <td>{report.createdDate ? <TextFormat type="date" value={report.createdDate} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{report.createdBy}</td>
                  <td>
                    {report.lastModifiedDate ? <TextFormat type="date" value={report.lastModifiedDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{report.lastModifiedBy}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${report.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${report.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${report.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Reports found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ report }: IRootState) => ({
  reportList: report.entities,
  loading: report.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Report);
