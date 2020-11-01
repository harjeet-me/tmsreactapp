import { Moment } from 'moment';
import { IInvoice } from 'app/shared/model/invoice.model';
import { IContainer } from 'app/shared/model/container.model';
import { ILocation } from 'app/shared/model/location.model';
import { ICustomer } from 'app/shared/model/customer.model';
import { IDriver } from 'app/shared/model/driver.model';
import { IEquipment } from 'app/shared/model/equipment.model';
import { ICarrier } from 'app/shared/model/carrier.model';
import { TripType } from 'app/shared/model/enumerations/trip-type.model';
import { StatusEnum } from 'app/shared/model/enumerations/status-enum.model';
import { COVEREDBY } from 'app/shared/model/enumerations/coveredby.model';
import { LoadType } from 'app/shared/model/enumerations/load-type.model';
import { SizeEnum } from 'app/shared/model/enumerations/size-enum.model';

export interface ITrip {
  id?: number;
  customTripNumber?: string;
  description?: string;
  tripType?: TripType;
  shipmentNumber?: string;
  orderNumber?: string;
  bol?: string;
  pickup?: string;
  drop?: string;
  currentLocation?: string;
  status?: StatusEnum;
  detention?: number;
  chasisInTime?: string;
  orderDocumentContentType?: string;
  orderDocument?: any;
  podContentType?: string;
  pod?: any;
  hazmat?: boolean;
  refrigerated?: boolean;
  liftgate?: boolean;
  recievedBy?: string;
  coveredBy?: COVEREDBY;
  loadType?: LoadType;
  containerSize?: SizeEnum;
  numbersOfContainer?: number;
  comments?: string;
  autoGenerateInvoice?: boolean;
  createdDate?: string;
  createdBy?: string;
  lastModifiedDate?: string;
  lastModifiedBy?: string;
  invoices?: IInvoice[];
  containers?: IContainer[];
  pickupLocation?: ILocation;
  dropLocation?: ILocation;
  customer?: ICustomer;
  driver?: IDriver;
  equipment?: IEquipment;
  carrier?: ICarrier;
}

export const defaultValue: Readonly<ITrip> = {
  hazmat: false,
  refrigerated: false,
  liftgate: false,
  autoGenerateInvoice: false,
};
