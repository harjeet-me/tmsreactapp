import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IInvoiceItem {
  id?: number;
  itemName?: string;
  description?: string;
  qty?: number;
  price?: number;
  discount?: number;
  total?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  invoice?: IInvoice;
}

export const defaultValue: Readonly<IInvoiceItem> = {};
