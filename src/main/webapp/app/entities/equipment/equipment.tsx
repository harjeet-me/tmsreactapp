import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './equipment.reducer';
import { IEquipment } from 'app/shared/model/equipment.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEquipmentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Equipment = (props: IEquipmentProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { equipmentList, match, loading } = props;
  return (
    <div>
      <h2 id="equipment-heading">
        Equipment
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Equipment
        </Link>
      </h2>
      <div className="table-responsive">
        {equipmentList && equipmentList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Enumber</th>
                <th>Type</th>
                <th>Ownershiptype</th>
                <th>Status</th>
                <th>Vin</th>
                <th>Make</th>
                <th>Model</th>
                <th>Description</th>
                <th>Year</th>
                <th>Year Purchased</th>
                <th>License Plate Number</th>
                <th>License Plate Expiration</th>
                <th>Inspection Sticker Expiration</th>
                <th>Created Date</th>
                <th>Created By</th>
                <th>Last Modified Date</th>
                <th>Last Modified By</th>
                <th>Insurance</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {equipmentList.map((equipment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${equipment.id}`} color="link" size="sm">
                      {equipment.id}
                    </Button>
                  </td>
                  <td>{equipment.enumber}</td>
                  <td>{equipment.type}</td>
                  <td>{equipment.ownershiptype}</td>
                  <td>{equipment.status}</td>
                  <td>{equipment.vin}</td>
                  <td>{equipment.make}</td>
                  <td>{equipment.model}</td>
                  <td>{equipment.description}</td>
                  <td>{equipment.year}</td>
                  <td>{equipment.yearPurchased}</td>
                  <td>{equipment.licensePlateNumber}</td>
                  <td>
                    {equipment.licensePlateExpiration ? (
                      <TextFormat type="date" value={equipment.licensePlateExpiration} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {equipment.inspectionStickerExpiration ? (
                      <TextFormat type="date" value={equipment.inspectionStickerExpiration} format={APP_LOCAL_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>
                    {equipment.createdDate ? <TextFormat type="date" value={equipment.createdDate} format={APP_DATE_FORMAT} /> : null}
                  </td>
                  <td>{equipment.createdBy}</td>
                  <td>
                    {equipment.lastModifiedDate ? (
                      <TextFormat type="date" value={equipment.lastModifiedDate} format={APP_DATE_FORMAT} />
                    ) : null}
                  </td>
                  <td>{equipment.lastModifiedBy}</td>
                  <td>{equipment.insurance ? <Link to={`insurance/${equipment.insurance.id}`}>{equipment.insurance.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${equipment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${equipment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${equipment.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Equipment found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ equipment }: IRootState) => ({
  equipmentList: equipment.entities,
  loading: equipment.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Equipment);
