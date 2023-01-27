import { AccountModel } from '../models';

export interface DepositModel extends BaseModel {
  accountid: AccountModel;
  amount: number;
  date_time: Date;
}
