import { Moment } from 'moment';
import { IEmail } from 'app/shared/model/email.model';
import { IInvoiceItem } from 'app/shared/model/invoice-item.model';
import { IInvoiceHistory } from 'app/shared/model/invoice-history.model';
import { ITrip } from 'app/shared/model/trip.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IInvoiceReport } from 'app/shared/model/invoice-report.model';
import { TaxType } from 'app/shared/model/enumerations/tax-type.model';
import { CURRENCY } from 'app/shared/model/enumerations/currency.model';
import { InvoiveRef } from 'app/shared/model/enumerations/invoive-ref.model';
import { InvoiceStatus } from 'app/shared/model/enumerations/invoice-status.model';

export interface IInvoice {
  id?: number;
  orderNo?: string;
  invoiceNo?: string;
  taxRate?: number;
  taxType?: TaxType;
  currency?: CURRENCY;
  invoiceTaxTotal?: number;
  invoiceSubTotal?: number;
  invoiceTotal?: number;
  invoiceDate?: string;
  invoicePaidDate?: string;
  refOption1?: InvoiveRef;
  refValue1?: string;
  refOption2?: InvoiveRef;
  refValue2?: string;
  refOption3?: InvoiveRef;
  refValue3?: string;
  payRefNo?: string;
  invoiceDueDate?: string;
  status?: InvoiceStatus;
  invoicePdfContentType?: string;
  invoicePdf?: any;
  remarks?: string;
  customerInfo?: string;
  payterm?: string;
  balance?: number;
  advance?: number;
  discount?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  notification?: IEmail;
  invoiceItems?: IInvoiceItem[];
  invoiceHistories?: IInvoiceHistory[];
  trip?: ITrip;
  customer?: ICustomer;
  invoiceReports?: IInvoiceReport[];
}

export const defaultValue: Readonly<IInvoice> = {};