import { AccountType } from "../models";

export interface Tranfer {
    id: string;
    outcome: AccountType;
    accountTypeId: AccountType;
    transferAmount: number;
    transferReason: string;
    dateTime: Date;
    daletedAt?: Date | number;
}