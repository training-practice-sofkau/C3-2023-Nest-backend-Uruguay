import { AccountModel } from './account.model';

export interface TransferModel {
    id: string;
    outcome:string;
    income: AccountModel;
    amount: AccountModel;
    reason: string;
    dateTime: Date | number;
    deletedAt?: Date | number;
}