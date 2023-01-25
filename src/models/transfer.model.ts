import { AccountTypeModel } from "../models";
export interface AccountModel {
    id: string;
    outcome_id: AccountModel;
    income_id: AccountModel;
    amount:number;
    reason:string;
    date_time: Date | number;
    deleted_at: Date | number;

}