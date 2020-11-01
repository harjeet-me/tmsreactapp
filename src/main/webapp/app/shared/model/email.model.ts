import { Moment } from 'moment';
import { IFileSystem } from 'app/shared/model/file-system.model';
import { ICustomer } from 'app/shared/model/customer.model';

export interface IEmail {
  id?: number;
  userto?: string;
  usercc?: string;
  userbcc?: string;
  subject?: string;
  message?: string;
  multipart?: boolean;
  htmlBody?: boolean;
  attachmentContentType?: string;
  attachment?: any;
  attachmentName?: string;
  status?: string;
  sentDateTime?: string;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  fileSystems?: IFileSystem[];
  customer?: ICustomer;
}

export const defaultValue: Readonly<IEmail> = {
  multipart: false,
  htmlBody: false,
};
