import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { Designation } from 'app/shared/model/enumerations/designation.model';

export interface IContact {
  id?: number;
  firstName?: string;
  lastName?: string;
  contactDesignation?: Designation;
  email?: string;
  phoneNumber?: number;
  remarks?: string;
  preferredTime?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IContact> = {};
