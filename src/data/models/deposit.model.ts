import { AccountModel } from ".";

export interface DepositModel {
    
    id: string;
    account_id: AccountModel;
    amount: number;
    date_time: Date | number;
    deleted_at: Date | number;
}