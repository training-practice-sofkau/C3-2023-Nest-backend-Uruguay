import { IAccountModel } from "src/models/i-account-model";

export class AccountEntity implements IAccountModel {
    state: boolean;

    acc_id : number;
    customer_id : number;
    type_Account_id : number;
    balance: number;
    daletedAt?: Date | number ;
    

    // Get and Set

}