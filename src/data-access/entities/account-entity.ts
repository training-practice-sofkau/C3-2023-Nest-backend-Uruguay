import { IAccountModel } from "src/data-access/models/i-account-model";
import { IAccountTypeModel } from "src/data-access/models/i-account-type-model";
import { ICustomerModel } from "src/data-access/models/i-customer-model";
import { v4 as uuid } from 'uuid';
import { CustomerEntity } from "./customer-entity";
import { AccountTypeEntity } from "./account-type-entity";

export class AccountEntity implements IAccountModel {
    
    id = uuid();
    customerId : CustomerEntity;
    accountTypeId : AccountTypeEntity ;
    balance: number;
    state = true;
    daletedAt?: Date | number ;
    
    // Get and Set

}