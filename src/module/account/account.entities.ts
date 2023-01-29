
import { AccountModel } from 'src/module/account/accountModel.interface';
import { v4 as uuid } from 'uuid';
import { CustomerEntity } from '../cusotmer/customer.entity';
import { AccountTypeModel } from 'src/module/account/account-type-model.interface';

export class AccountEntity implements AccountModel{
    id = uuid();
    coustomer_id: CustomerEntity;
    account_type_id: AccountTypeModel;
    balance: number;
    state: boolean;
    delete_at: Date;
}
