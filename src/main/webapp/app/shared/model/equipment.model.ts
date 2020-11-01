import { Moment } from 'moment';
import { IInsurance } from 'app/shared/model/insurance.model';
import { ITrip } from 'app/shared/model/trip.model';
import { EquipmentEnum } from 'app/shared/model/enumerations/equipment-enum.model';
import { ToggleStatus } from 'app/shared/model/enumerations/toggle-status.model';

export interface IEquipment {
  id?: number;
  enumber?: string;
  type?: EquipmentEnum;
  ownershiptype?: string;
  status?: ToggleStatus;
  vin?: string;
  make?: string;
  model?: string;
  description?: string;
  year?: string;
  yearPurchased?: string;
  licensePlateNumber?: string;
  licensePlateExpiration?: string;
  inspectionStickerExpiration?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  insurance?: IInsurance;
  trips?: ITrip[];
}

export const defaultValue: Readonly<IEquipment> = {};
