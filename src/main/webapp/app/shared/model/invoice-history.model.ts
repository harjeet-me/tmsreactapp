import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice.model';
import { InvoiceStatus } from 'app/shared/model/enumerations/invoice-status.model';

export interface IInvoiceHistory {
  id?: number;
  status?: InvoiceStatus;
  comment?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  previous?: IInvoiceHistory;
  next?: IInvoiceHistory;
  invoice?: IInvoice;
}

export const defaultValue: Readonly<IInvoiceHistory> = {};
