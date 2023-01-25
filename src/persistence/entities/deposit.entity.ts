import { DepositModel } from "src/models/deposit.model";
import { v4 as uuid } from 'uuid';
import { AccountEntity } from "./account.entity";

export class DepositEntity implements DepositModel{
    dep_id = uuid()
    account_id: AccountEntity
    dep_amount: number
    dep_date_time: number | Date
    dep_deleted_at?: number | Date
    
}