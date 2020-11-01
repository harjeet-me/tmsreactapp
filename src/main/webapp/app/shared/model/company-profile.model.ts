import { Moment } from 'moment';
import { CountryEnum } from 'app/shared/model/enumerations/country-enum.model';
import { ToggleStatus } from 'app/shared/model/enumerations/toggle-status.model';
import { CURRENCY } from 'app/shared/model/enumerations/currency.model';

export interface ICompanyProfile {
  id?: number;
  active?: boolean;
  company?: string;
  address?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: CountryEnum;
  postalCode?: string;
  email?: string;
  website?: string;
  phoneNumber?: number;
  dot?: string;
  mc?: number;
  companyLogoContentType?: string;
  companyLogo?: any;
  profileStatus?: ToggleStatus;
  preffredCurrency?: CURRENCY;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
}

export const defaultValue: Readonly<ICompanyProfile> = {
  active: false,
};
