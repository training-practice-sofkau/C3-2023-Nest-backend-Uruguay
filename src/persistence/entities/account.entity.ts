import { CustomerModel } from 'src/models';
import { AccountTypeModel } from 'src/models/account-type.model';
import { AccountModel } from 'src/models/account.model';
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    acc_id = uuid();
    customer_id: CustomerModel;
    account_type_id: AccountTypeModel;
    acc_balance: number;
    acc_state: true;
    acc_deleted_at?: number | Date;
}