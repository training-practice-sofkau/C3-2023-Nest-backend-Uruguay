import { CustomerModel, AccountTypeModel } from ".";

export interface AccountModel {
    
    id: string;
    customer_id: CustomerModel;
    account_type_id: AccountTypeModel;
    balance:number;
    state:boolean;
    deleted_at: Date | number;

}