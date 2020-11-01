import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, setBlob, reset } from './report.reducer';
import { IReport } from 'app/shared/model/report.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReportUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const ReportUpdate = (props: IReportUpdateProps) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { reportEntity, loading, updating } = props;

  const { attachment, attachmentContentType } = reportEntity;

  const handleClose = () => {
    props.history.push('/report');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  const onBlobChange = (isAnImage, name) => event => {
    setFileData(event, (contentType, data) => props.setBlob(name, data, contentType), isAnImage);
  };

  const clearBlob = name => () => {
    props.setBlob(name, undefined, undefined);
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...reportEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="tmsreactappApp.report.home.createOrEditLabel">Create or edit a Report</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : reportEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="report-id">ID</Label>
                  <AvInput id="report-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="reportTypeLabel" for="report-reportType">
                  Report Type
                </Label>
                <AvInput
                  id="report-reportType"
                  type="select"
                  className="form-control"
                  name="reportType"
                  value={(!isNew && reportEntity.reportType) || 'INV_STMT_OF_CUSTOMER'}
                >
                  <option value="INV_STMT_OF_CUSTOMER">INV_STMT_OF_CUSTOMER</option>
                  <option value="TRIP_STMT_OF_CUSTOMER">TRIP_STMT_OF_CUSTOMER</option>
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label id="descriptionLabel" for="report-description">
                  Description
                </Label>
                <AvField id="report-description" type="text" name="description" />
              </AvGroup>
              <AvGroup>
                <Label id="fromDateLabel" for="report-fromDate">
                  From Date
                </Label>
                <AvField id="report-fromDate" type="date" className="form-control" name="fromDate" />
              </AvGroup>
              <AvGroup>
                <Label id="toDateLabel" for="report-toDate">
                  To Date
                </Label>
                <AvField id="report-toDate" type="date" className="form-control" name="toDate" />
              </AvGroup>
              <AvGroup>
                <AvGroup>
                  <Label id="attachmentLabel" for="attachment">
                    Attachment
                  </Label>
                  <br />
                  {attachment ? (
                    <div>
                      {attachmentContentType ? <a onClick={openFile(attachmentContentType, attachment)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {attachmentContentType}, {byteSize(attachment)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('attachment')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_attachment" type="file" onChange={onBlobChange(false, 'attachment')} />
                  <AvInput type="hidden" name="attachment" value={attachment} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="emailToLabel" for="report-emailTo">
                  Email To
                </Label>
                <AvField id="report-emailTo" type="text" name="emailTo" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="report-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="report-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.reportEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="report-createdBy">
                  Created By
                </Label>
                <AvField id="report-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="report-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="report-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.reportEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="report-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="report-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/report" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  reportEntity: storeState.report.entity,
  loading: storeState.report.loading,
  updating: storeState.report.updating,
  updateSuccess: storeState.report.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ReportUpdate);
