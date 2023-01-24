import { AccountTypeModel } from "./account-type.model";
import { CustomerModel } from "./customer.model";

//import { CustomerModel, AccountTypeModel } from "../models";

export interface AccountModel {
 acc_id: string,
 customer_id : CustomerModel,
 account_type_Id : AccountTypeModel,
 acc_balance: number,
 acc_state: boolean,
 daletedAt?: Date | number; 
}