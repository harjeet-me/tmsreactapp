import { Moment } from 'moment';
import { IEmail } from 'app/shared/model/email.model';

export interface IFileSystem {
  id?: number;
  fileDataContentType?: string;
  fileData?: any;
  fileName?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  email?: IEmail;
}

export const defaultValue: Readonly<IFileSystem> = {};
