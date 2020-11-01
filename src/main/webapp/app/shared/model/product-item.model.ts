import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IProductItem {
  id?: number;
  itemName?: string;
  description?: string;
  defaultQty?: number;
  price?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  customers?: ICustomer[];
}

export const defaultValue: Readonly<IProductItem> = {};
