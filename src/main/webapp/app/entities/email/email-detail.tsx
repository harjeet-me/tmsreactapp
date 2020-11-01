import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction, openFile, byteSize, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './email.reducer';
import { IEmail } from 'app/shared/model/email.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmailDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmailDetail = (props: IEmailDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { emailEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Email [<b>{emailEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="userto">Userto</span>
          </dt>
          <dd>{emailEntity.userto}</dd>
          <dt>
            <span id="usercc">Usercc</span>
          </dt>
          <dd>{emailEntity.usercc}</dd>
          <dt>
            <span id="userbcc">Userbcc</span>
          </dt>
          <dd>{emailEntity.userbcc}</dd>
          <dt>
            <span id="subject">Subject</span>
          </dt>
          <dd>{emailEntity.subject}</dd>
          <dt>
            <span id="message">Message</span>
          </dt>
          <dd>{emailEntity.message}</dd>
          <dt>
            <span id="multipart">Multipart</span>
          </dt>
          <dd>{emailEntity.multipart ? 'true' : 'false'}</dd>
          <dt>
            <span id="htmlBody">Html Body</span>
          </dt>
          <dd>{emailEntity.htmlBody ? 'true' : 'false'}</dd>
          <dt>
            <span id="attachment">Attachment</span>
          </dt>
          <dd>
            {emailEntity.attachment ? (
              <div>
                {emailEntity.attachmentContentType ? (
                  <a onClick={openFile(emailEntity.attachmentContentType, emailEntity.attachment)}>Open&nbsp;</a>
                ) : null}
                <span>
                  {emailEntity.attachmentContentType}, {byteSize(emailEntity.attachment)}
                </span>
              </div>
            ) : null}
          </dd>
          <dt>
            <span id="attachmentName">Attachment Name</span>
          </dt>
          <dd>{emailEntity.attachmentName}</dd>
          <dt>
            <span id="status">Status</span>
          </dt>
          <dd>{emailEntity.status}</dd>
          <dt>
            <span id="sentDateTime">Sent Date Time</span>
          </dt>
          <dd>{emailEntity.sentDateTime ? <TextFormat value={emailEntity.sentDateTime} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdDate">Created Date</span>
          </dt>
          <dd>{emailEntity.createdDate ? <TextFormat value={emailEntity.createdDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="createdBy">Created By</span>
          </dt>
          <dd>{emailEntity.createdBy}</dd>
          <dt>
            <span id="lastModifiedDate">Last Modified Date</span>
          </dt>
          <dd>
            {emailEntity.lastModifiedDate ? <TextFormat value={emailEntity.lastModifiedDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="lastModifiedBy">Last Modified By</span>
          </dt>
          <dd>{emailEntity.lastModifiedBy}</dd>
          <dt>Customer</dt>
          <dd>{emailEntity.customer ? emailEntity.customer.company : ''}</dd>
        </dl>
        <Button tag={Link} to="/email" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/email/${emailEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ email }: IRootState) => ({
  emailEntity: email.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmailDetail);
