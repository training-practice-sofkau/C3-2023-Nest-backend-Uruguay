import { AccountModel } from './accout.model';

export interface DepositModel  extends BaseModel {
    accountid: AccountModel;
    amount: number;
    date_time: Date;
    
}