
import { AccountModel } from 'src/module/account/capaDeDato/models/accountModel.interface';
import { v4 as uuid } from 'uuid';
import { CustomerEntity } from '../../../customer/capaDeDato/entity/customer.entity';
import { AccountTypeEntity } from './account.Type.Entity';


export class AccountEntity implements AccountModel{
    id = uuid();
    coustomer_id: CustomerEntity;
    account_type_id: AccountTypeEntity;
    balance: number = 0;
    state: boolean;
    delete_at: Date;
}
