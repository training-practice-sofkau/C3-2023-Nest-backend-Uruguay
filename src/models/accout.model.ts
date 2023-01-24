import { CustomerModel, AccountType  } from "../models";

export interface AccountModel {
    id: string;
    outcome: CustomerModel;
    accountTypeId: AccountType;
    acc_Balance: number;
    state: boolean;
    daletedAt?: Date | number;
}