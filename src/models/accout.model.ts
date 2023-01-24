import { CustomerModel, AccountTypeModel } from "../models";

export interface AccountModel {
    id: string;
    outcome: CustomerModel;
    accountTypeId: AccountTypeModel;
    acc_Balance: number;
    state: boolean;
    daletedAt?: Date | number;
}