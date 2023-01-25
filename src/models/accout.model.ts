import { CustomerModel, AccountTypeModel } from "../models";

export interface AccountModel extends BaseModel {
    outcome: CustomerModel;
    accountTypeId: AccountTypeModel;
    acc_Balance: number;
}