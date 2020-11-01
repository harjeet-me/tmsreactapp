import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './file-system.reducer';
import { IFileSystem } from 'app/shared/model/file-system.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IFileSystemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FileSystemDetail = (props: IFileSystemDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { fileSystemEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          FileSystem [<b>{fileSystemEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="data">Data</span>
          </dt>
          <dd>
            {fileSystemEntity.data ? (
              <div>
                {fileSystemEntity.dataContentType ? (
                  <a onClick={openFile(fileSystemEntity.dataContentType, fileSystemEntity.data)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {fileSystemEntity.dataContentType}, {byteSize(fileSystemEntity.data)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="fileName">File Name</span>
          </dt>
          <dd>{fileSystemEntity.fileName}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>
            {fileSystemEntity.createdDate ? <TextFormat value={fileSystemEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{fileSystemEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {fileSystemEntity.lastModifiedDate ? (
              <TextFormat value={fileSystemEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} />
            ) : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{fileSystemEntity.lastModifiedBy}</dd>
          <dt>Email</dt>
          <dd>{fileSystemEntity.email ? fileSystemEntity.email.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/file-system" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/file-system/${fileSystemEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ fileSystem }: IRootState) => ({
  fileSystemEntity: fileSystem.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FileSystemDetail);
