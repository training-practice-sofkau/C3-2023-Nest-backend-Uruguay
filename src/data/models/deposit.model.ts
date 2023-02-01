import { AccountModel } from './';

export interface DepositModel {
    id: string;
    account: AccountModel;
    amount: number;
    dateTime: Date | number;
    deletedAt?: Date | number;
}