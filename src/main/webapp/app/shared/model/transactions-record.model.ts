import { Moment } from 'moment';
import { ICustomer } from 'app/shared/model/customer.model';
import { TransactionType } from 'app/shared/model/enumerations/transaction-type.model';

export interface ITransactionsRecord {
  id?: number;
  txType?: TransactionType;
  txRef?: string;
  description?: string;
  txAmmount?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  customer?: ICustomer;
}

export const defaultValue: Readonly<ITransactionsRecord> = {};
