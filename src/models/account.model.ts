import { CustomerModel, AccountTypeModel } from "../models";

export interface AccountModel {
 id: string,
 customer : CustomerModel,
 account : AccountTypeModel,
 balance: number,
 state: boolean,
 daletedAt?: Date | number; 
}