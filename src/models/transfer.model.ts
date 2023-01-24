import { AccountTypeModel } from "../models";

export interface TransferModel {
    id: string;
    outcome: AccountTypeModel;
    accountTypeId: AccountTypeModel;
    transferAmount: number;
    transferReason: string;
    dateTime: Date;
    daletedAt?: Date | number;
}