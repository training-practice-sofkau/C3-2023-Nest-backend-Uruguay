import { IAccountModel } from "src/models/i-account-model";
import { IAccountTypeModel } from "src/models/i-account-type-model";
import { ICustomerModel } from "src/models/i-customer-model";
import { v4 as uuid } from 'uuid';

export class AccountEntity implements IAccountModel {
    
    id = uuid();
    customerId : ICustomerModel;
    accountTypeId : IAccountTypeModel ;
    balance: number;
    state = true;
    daletedAt?: Date | number ;
    
    // Get and Set

}