import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IEmail } from 'app/shared/model/email.model';
import { getEntities as getEmails } from 'app/entities/email/email.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './file-system.reducer';
import { IFileSystem } from 'app/shared/model/file-system.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IFileSystemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileSystemUpdate = (props: IFileSystemUpdateProps) => {
  const [emailId, setEmailId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { fileSystemEntity, emails, loading, updating } = props;

  const { data, dataContentType } = fileSystemEntity;

  const handleClose = () => {
    props.history.push('/file-system' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getEmails();
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
        ...fileSystemEntity,
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
          <h2 id="tmsreactappApp.fileSystem.home.createOrEditLabel">Create or edit a FileSystem</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : fileSystemEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="file-system-id">ID</Label>
                  <AvInput id="file-system-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <AvGroup>
                  <Label id="dataLabel" for="data">
                    Data
                  </Label>
                  <br />
                  {data ? (
                    <div>
                      {dataContentType ? <a onClick={openFile(dataContentType, data)}>Open</a> : null}
                      <br />
                      <Row>
                        <Col md="11">
                          <span>
                            {dataContentType}, {byteSize(data)}
                          </span>
                        </Col>
                        <Col md="1">
                          <Button color="danger" onClick={clearBlob('data')}>
                            <FontAwesomeIcon icon="times-circle" />
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                  <input id="file_data" type="file" onChange={onBlobChange(false, 'data')} />
                  <AvInput type="hidden" name="data" value={data} />
                </AvGroup>
              </AvGroup>
              <AvGroup>
                <Label id="fileNameLabel" for="file-system-fileName">
                  File Name
                </Label>
                <AvField id="file-system-fileName" type="text" name="fileName" />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="file-system-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="file-system-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fileSystemEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="file-system-createdBy">
                  Created By
                </Label>
                <AvField id="file-system-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="file-system-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="file-system-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.fileSystemEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="file-system-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="file-system-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="file-system-email">Email</Label>
                <AvInput id="file-system-email" type="select" className="form-control" name="email.id">
                  <option value="" key="0" />
                  {emails
                    ? emails.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.id}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/file-system" replace color="info">
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
  emails: storeState.email.entities,
  fileSystemEntity: storeState.fileSystem.entity,
  loading: storeState.fileSystem.loading,
  updating: storeState.fileSystem.updating,
  updateSuccess: storeState.fileSystem.updateSuccess,
});

const mapDispatchToProps = {
  getEmails,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileSystemUpdate);
