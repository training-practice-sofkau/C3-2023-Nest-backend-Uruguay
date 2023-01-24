import { CustomerModel } from "./customer.model";
import { AccountTypeModel } from "./account-type.model";
import { IGeneral } from '../persistence/repositories/interfaces';

export interface AccountModel extends IGeneral {
    customer: CustomerModel;
    accountType: AccountTypeModel;
    balance: number;
    state: boolean;
}