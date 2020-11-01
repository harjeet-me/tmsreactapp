export interface IAccountHistory {
  id?: number;
  enityName?: string;
  entityLink?: string;
  action?: string;
}

export const defaultValue: Readonly<IAccountHistory> = {};
