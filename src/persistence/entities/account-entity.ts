import { IAccountModel } from "src/models/i-account-model";
import { v4 as uuid } from 'uuid';

export class AccountEntity implements IAccountModel {
    
    id = uuid();
    customerId : string;
    accountTypeId : number;
    balance: number;
    state = true;
    daletedAt?: Date | number ;
    
    // Get and Set

}