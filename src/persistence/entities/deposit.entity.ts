import { AccountModel, DepositModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    id= uuid();
    account_id: AccountModel;
    amount: number;
    date_time: number | Date;
    deleted_at: number | Date;
    
}