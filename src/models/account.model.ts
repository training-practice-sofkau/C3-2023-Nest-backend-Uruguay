import { CustomerModel } from './customer.model';
import { AccountTypeModel } from './account-type.model';
export interface AccountModel {
    acc_id: string
    customer_id: CustomerModel
    account_type_id: AccountTypeModel
    acc_balance: number
    acc_state: boolean
    acc_deleted_at?: Date | number
}