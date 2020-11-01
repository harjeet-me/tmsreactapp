import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReportDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReportDetail = (props: IReportDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { reportEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Report [<b>{reportEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="reportType">Report Type</span>
          </dt>
          <dd>{reportEntity.reportType}</dd>
          <dt>
            <span id="description">Description</span>
          </dt>
          <dd>{reportEntity.description}</dd>
          <dt>
            <span id="fromDate">From Date</span>
          </dt>
          <dd>{reportEntity.fromDate ? <TextFormat value={reportEntity.fromDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="toDate">To Date</span>
          </dt>
          <dd>{reportEntity.toDate ? <TextFormat value={reportEntity.toDate} type="date" format={APP_LOCAL_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="attachment">Attachment</span>
          </dt>
          <dd>
            {reportEntity.attachment ? (
              <div>
                {reportEntity.attachmentContentType ? (
                  <a onClick={openFile(reportEntity.attachmentContentType, reportEntity.attachment)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {reportEntity.attachmentContentType}, {byteSize(reportEntity.attachment)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="emailTo">Email To</span>
          </dt>
          <dd>{reportEntity.emailTo}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>{reportEntity.createdDate ? <TextFormat value={reportEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{reportEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {reportEntity.lastModifiedDate ? (
              <TextFormat value={reportEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{reportEntity.lastModifiedBy}</dd>
        </dl>
        <Button tag={Link} to="/report" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/report/${reportEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ report }: IRootState) => ({
  reportEntity: report.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportDetail);
