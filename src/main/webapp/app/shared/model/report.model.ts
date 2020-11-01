import { Moment } from 'moment';
import { ReportType } from 'app/shared/model/enumerations/report-type.model';

export interface IReport {
  id?: number;
  reportType?: ReportType;
  description?: string;
  fromDate?: string;
  toDate?: string;
  attachmentContentType?: string;
  attachment?: any;
  emailTo?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
}

export const defaultValue: Readonly<IReport> = {};
