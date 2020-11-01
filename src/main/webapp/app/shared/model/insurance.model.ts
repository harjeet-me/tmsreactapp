import { Moment } from 'moment';
import { ICarrier } from 'app/shared/model/carrier.model';

export interface IInsurance {
  id?: number;
  providerName?: string;
  issueDate?: string;
  expiryDate?: string;
  policyDocumentContentType?: string;
  policyDocument?: any;
  coverageStatement?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  carrier?: ICarrier;
}

export const defaultValue: Readonly<IInsurance> = {};
