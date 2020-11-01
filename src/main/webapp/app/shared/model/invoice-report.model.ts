import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice.model';

export interface IInvoiceReport {
  id?: number;
  customer?: number;
  fromDate?: string;
  toDate?: string;
  remarks?: string;
  invoiceReportContentType?: string;
  invoiceReport?: any;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  invoices?: IInvoice[];
}

export const defaultValue: Readonly<IInvoiceReport> = {};
