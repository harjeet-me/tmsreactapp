import { Moment } from 'moment';
import { ILocation } from 'app/shared/model/location.model';
import { ITrip } from 'app/shared/model/trip.model';
import { TripType } from 'app/shared/model/enumerations/trip-type.model';
import { SizeEnum } from 'app/shared/model/enumerations/size-enum.model';

export interface IContainer {
  id?: number;
  number?: string;
  tripType?: TripType;
  pickup?: string;
  drop?: string;
  containerSize?: SizeEnum;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  pickupLocation?: ILocation;
  dropLocation?: ILocation;
  trip?: ITrip;
}

export const defaultValue: Readonly<IContainer> = {};
