import { Moment } from 'moment';
import { ITrip } from 'app/shared/model/trip.model';
import { IContainer } from 'app/shared/model/container.model';
import { CountryEnum } from 'app/shared/model/enumerations/country-enum.model';

export interface ILocation {
  id?: number;
  address?: string;
  streetAddress?: string;
  city?: string;
  stateProvince?: string;
  country?: CountryEnum;
  postalCode?: string;
  latitude?: number;
  longitude?: number;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  trippicks?: ITrip[];
  tripdrops?: ITrip[];
  contpicks?: IContainer[];
  contdrops?: IContainer[];
}

export const defaultValue: Readonly<ILocation> = {};
