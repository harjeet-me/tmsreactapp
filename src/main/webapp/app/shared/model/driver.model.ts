import { Moment } from 'moment';
import { ITrip } from 'app/shared/model/trip.model';
import { ToggleStatus } from 'app/shared/model/enumerations/toggle-status.model';

export interface IDriver {
  id?: number;
  company?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: number;
  licenceNumber?: string;
  dob?: string;
  companyJoinedOn?: string;
  companyLeftOn?: string;
  imageContentType?: string;
  image?: any;
  licenceImageContentType?: string;
  licenceImage?: any;
  remarks?: string;
  contractDocContentType?: string;
  contractDoc?: any;
  status?: ToggleStatus;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  trips?: ITrip[];
}

export const defaultValue: Readonly<IDriver> = {};
