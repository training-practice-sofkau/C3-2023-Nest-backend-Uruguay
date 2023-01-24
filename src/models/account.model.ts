
import { CustomerModel, AccountTypeModel } from '../models';

export interface AccountModel {
    id: string;
    customerId: CustomerModel;
    accountTypeId: AccountTypeModel;
    balance: number;
    state: boolean;
    daletedAt?: Date | number;
}