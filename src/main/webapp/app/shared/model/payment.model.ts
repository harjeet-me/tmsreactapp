import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { PayMode } from 'app/shared/model/enumerations/pay-mode.model';

export interface IPayment {
  id?: number;
  invoiceNo?: string;
  payDate?: string;
  payRefNo?: string;
  mode?: PayMode;
  ammount?: number;
  unusedAmmount?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  customer?: ICustomer;
}

export const defaultValue: Readonly<IPayment> = {};
