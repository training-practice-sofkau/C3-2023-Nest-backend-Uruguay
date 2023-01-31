import { AccountModel } from '.';

export interface TransferModel {
    id: string;
    outcome: AccountModel;
    income: AccountModel;
    balance: number;
    reason: string;
    dateTime: Date | number;
    deletedAt?: Date | number;
}