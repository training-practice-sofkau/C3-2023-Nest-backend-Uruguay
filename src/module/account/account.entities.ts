
import { AccountModel } from 'src/module/account/accountModel.interface';
import { v4 as uuid } from 'uuid';
import { CustomerEntity } from '../customer/customer.entity';
import { AccountTypeEntity } from './account.Type.Entity';

export class AccountEntity implements AccountModel{
    id = uuid();
    coustomer_id: CustomerEntity;
    account_type_id: AccountTypeEntity;
    balance: number;
    state: boolean;
    delete_at: Date;
}
