import { AccountModel } from './accout.model';

export interface DepositModel {
    id: string;
    accountid: AccountModel;
    amount: number;
    date_time: Date;
    daletedAt?: Date | number;
    
}