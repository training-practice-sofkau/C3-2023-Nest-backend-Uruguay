
import { CustomerModel, AccountTypeModel } from '.';

export interface AccountModel {
    id: string;
    customerId: CustomerModel;
    accountTypeId: AccountTypeModel;
    balance: number;
    state: boolean;
    daletedAt?: Date | number;
}