import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, setFileData, openFile, byteSize, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, setBlob, reset } from './email.reducer';
import { IEmail } from 'app/shared/model/email.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmailUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmailUpdate = (props: IEmailUpdateProps) => {
  const [customerId, setCustomerId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { emailEntity, customers, loading, updating } = props;

  const { attachment, attachmentContentType } = emailEntity;

  const handleClose = () => {
    props.history.push('/email' + props.location.search);
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getCustomers();
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
    values.sentDateTime = convertDateTimeToServer(values.sentDateTime);
    values.createdDate = convertDateTimeToServer(values.createdDate);
    values.lastModifiedDate = convertDateTimeToServer(values.lastModifiedDate);

    if (errors.length === 0) {
      const entity = {
        ...emailEntity,
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
          <h2 id="tmsreactappApp.email.home.createOrEditLabel">Create or edit a Email</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : emailEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="email-id">ID</Label>
                  <AvInput id="email-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="usertoLabel" for="email-userto">
                  Userto
                </Label>
                <AvField id="email-userto" type="text" name="userto" />
              </AvGroup>
              <AvGroup>
                <Label id="userccLabel" for="email-usercc">
                  Usercc
                </Label>
                <AvField id="email-usercc" type="text" name="usercc" />
              </AvGroup>
              <AvGroup>
                <Label id="userbccLabel" for="email-userbcc">
                  Userbcc
                </Label>
                <AvField id="email-userbcc" type="text" name="userbcc" />
              </AvGroup>
              <AvGroup>
                <Label id="subjectLabel" for="email-subject">
                  Subject
                </Label>
                <AvField id="email-subject" type="text" name="subject" />
              </AvGroup>
              <AvGroup>
                <Label id="messageLabel" for="email-message">
                  Message
                </Label>
                <AvField id="email-message" type="text" name="message" />
              </AvGroup>
              <AvGroup check>
                <Label id="multipartLabel">
                  <AvInput id="email-multipart" type="checkbox" className="form-check-input" name="multipart" />
                  Multipart
                </Label>
              </AvGroup>
              <AvGroup check>
                <Label id="htmlBodyLabel">
                  <AvInput id="email-htmlBody" type="checkbox" className="form-check-input" name="htmlBody" />
                  Html Body
                </Label>
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
                <Label id="attachmentNameLabel" for="email-attachmentName">
                  Attachment Name
                </Label>
                <AvField id="email-attachmentName" type="text" name="attachmentName" />
              </AvGroup>
              <AvGroup>
                <Label id="statusLabel" for="email-status">
                  Status
                </Label>
                <AvField id="email-status" type="text" name="status" />
              </AvGroup>
              <AvGroup>
                <Label id="sentDateTimeLabel" for="email-sentDateTime">
                  Sent Date Time
                </Label>
                <AvInput
                  id="email-sentDateTime"
                  type="datetime-local"
                  className="form-control"
                  name="sentDateTime"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.emailEntity.sentDateTime)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdDateLabel" for="email-createdDate">
                  Created Date
                </Label>
                <AvInput
                  id="email-createdDate"
                  type="datetime-local"
                  className="form-control"
                  name="createdDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.emailEntity.createdDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="createdByLabel" for="email-createdBy">
                  Created By
                </Label>
                <AvField id="email-createdBy" type="text" name="createdBy" />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedDateLabel" for="email-lastModifiedDate">
                  Last Modified Date
                </Label>
                <AvInput
                  id="email-lastModifiedDate"
                  type="datetime-local"
                  className="form-control"
                  name="lastModifiedDate"
                  placeholder={'YYYY-MM-DD HH:mm'}
                  value={isNew ? displayDefaultDateTime() : convertDateTimeFromServer(props.emailEntity.lastModifiedDate)}
                />
              </AvGroup>
              <AvGroup>
                <Label id="lastModifiedByLabel" for="email-lastModifiedBy">
                  Last Modified By
                </Label>
                <AvField id="email-lastModifiedBy" type="text" name="lastModifiedBy" />
              </AvGroup>
              <AvGroup>
                <Label for="email-customer">Customer</Label>
                <AvInput id="email-customer" type="select" className="form-control" name="customer.id">
                  <option value="" key="0" />
                  {customers
                    ? customers.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.company}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/email" replace color="info">
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
  customers: storeState.customer.entities,
  emailEntity: storeState.email.entity,
  loading: storeState.email.loading,
  updating: storeState.email.updating,
  updateSuccess: storeState.email.updateSuccess,
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  setBlob,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailUpdate);
