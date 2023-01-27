import { AccountModel } from '../models';
export interface TranfersModel {
  id: string;
  outCome: AccountModel;
  inCome: AccountModel;
  amount: number;
  reason: string;
  dateTime: Date | number;
  deletedAt?: Date | number;
}
