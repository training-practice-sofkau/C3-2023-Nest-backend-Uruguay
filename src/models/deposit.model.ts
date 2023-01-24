import { AccountModel } from './account.model';

export interface DepositModel {
    dep_id: string
    account_id: AccountModel
    dep_amount: number
    dep_date_time: Date | number
    dep_deleted_at?: Date | number
}