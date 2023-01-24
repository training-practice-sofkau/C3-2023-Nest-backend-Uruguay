import { v4 as uuid } from 'uuid';
import { AccountModel } from '../../models/account.model';
import { AccountTypeEntity } from './accountTypeEntity';
import { CustomerEntity } from './customer.entity';
export class AccountEntity implements AccountModel{
    acc_id = uuid();
    customer_id: CustomerEntity;
    account_type_Id: AccountTypeEntity;
    acc_balance: number;
    acc_state: boolean;
    daletedAt?: number | Date | undefined;
}