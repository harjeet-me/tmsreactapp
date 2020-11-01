import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IAccounts {
  id?: number;
  balance?: number;
  over30?: number;
  over60?: number;
  over90?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IAccounts> = {};
