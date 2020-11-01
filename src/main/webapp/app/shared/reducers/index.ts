import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import companyProfile, {
  CompanyProfileState
} from 'app/entities/company-profile/company-profile.reducer';
// prettier-ignore
import customer, {
  CustomerState
} from 'app/entities/customer/customer.reducer';
// prettier-ignore
import trip, {
  TripState
} from 'app/entities/trip/trip.reducer';
// prettier-ignore
import invoice, {
  InvoiceState
} from 'app/entities/invoice/invoice.reducer';
// prettier-ignore
import payment, {
  PaymentState
} from 'app/entities/payment/payment.reducer';
// prettier-ignore
import invoiceReport, {
  InvoiceReportState
} from 'app/entities/invoice-report/invoice-report.reducer';
// prettier-ignore
import invoiceItem, {
  InvoiceItemState
} from 'app/entities/invoice-item/invoice-item.reducer';
// prettier-ignore
import productItem, {
  ProductItemState
} from 'app/entities/product-item/product-item.reducer';
// prettier-ignore
import accounts, {
  AccountsState
} from 'app/entities/accounts/accounts.reducer';
// prettier-ignore
import transactionsRecord, {
  TransactionsRecordState
} from 'app/entities/transactions-record/transactions-record.reducer';
// prettier-ignore
import container, {
  ContainerState
} from 'app/entities/container/container.reducer';
// prettier-ignore
import equipment, {
  EquipmentState
} from 'app/entities/equipment/equipment.reducer';
// prettier-ignore
import insurance, {
  InsuranceState
} from 'app/entities/insurance/insurance.reducer';
// prettier-ignore
import contact, {
  ContactState
} from 'app/entities/contact/contact.reducer';
// prettier-ignore
import driver, {
  DriverState
} from 'app/entities/driver/driver.reducer';
// prettier-ignore
import carrier, {
  CarrierState
} from 'app/entities/carrier/carrier.reducer';
// prettier-ignore
import location, {
  LocationState
} from 'app/entities/location/location.reducer';
// prettier-ignore
import email, {
  EmailState
} from 'app/entities/email/email.reducer';
// prettier-ignore
import invoiceHistory, {
  InvoiceHistoryState
} from 'app/entities/invoice-history/invoice-history.reducer';
// prettier-ignore
import accountHistory, {
  AccountHistoryState
} from 'app/entities/account-history/account-history.reducer';
// prettier-ignore
import report, {
  ReportState
} from 'app/entities/report/report.reducer';
// prettier-ignore
import fileSystem, {
  FileSystemState
} from 'app/entities/file-system/file-system.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly companyProfile: CompanyProfileState;
  readonly customer: CustomerState;
  readonly trip: TripState;
  readonly invoice: InvoiceState;
  readonly payment: PaymentState;
  readonly invoiceReport: InvoiceReportState;
  readonly invoiceItem: InvoiceItemState;
  readonly productItem: ProductItemState;
  readonly accounts: AccountsState;
  readonly transactionsRecord: TransactionsRecordState;
  readonly container: ContainerState;
  readonly equipment: EquipmentState;
  readonly insurance: InsuranceState;
  readonly contact: ContactState;
  readonly driver: DriverState;
  readonly carrier: CarrierState;
  readonly location: LocationState;
  readonly email: EmailState;
  readonly invoiceHistory: InvoiceHistoryState;
  readonly accountHistory: AccountHistoryState;
  readonly report: ReportState;
  readonly fileSystem: FileSystemState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  companyProfile,
  customer,
  trip,
  invoice,
  payment,
  invoiceReport,
  invoiceItem,
  productItem,
  accounts,
  transactionsRecord,
  container,
  equipment,
  insurance,
  contact,
  driver,
  carrier,
  location,
  email,
  invoiceHistory,
  accountHistory,
  report,
  fileSystem,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar,
});

export default rootReducer;
