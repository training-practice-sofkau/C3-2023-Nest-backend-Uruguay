import { AccountModel, AccountType, CustomerModel } from 'src/models';
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{   
    id= uuid();
    outcome: CustomerModel;
    accountTypeId: AccountType;
    acc_Balance: number;
    state: boolean;
    daletedAt?: Date | number;
}