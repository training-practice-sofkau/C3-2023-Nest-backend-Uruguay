import { CustomerModel } from './customer.model';
import { AccountTypeModel } from './account-type.model';
export interface AccountModel {
    id: string
    customer: CustomerModel
    accountType: AccountTypeModel
    balance: number
    state: boolean
    deletedAt?: Date | number
}