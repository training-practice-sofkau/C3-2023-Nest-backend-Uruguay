import { IAccountTypeModel } from "./i-account-type-model";
import { ICustomerModel } from "./i-customer-model";

export interface IAccountModel {
   
    id : string;
    customerId : ICustomerModel;
    accountTypeId : IAccountTypeModel ;
    balance: number;
    state: boolean
    daletedAt?: Date | number ;

}
