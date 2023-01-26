import { AccountTypeModel, AccountModel } from 'src/models';
import { v4 as uuid } from 'uuid';
import { CustomerEntity } from './customer.entity';

export class AccountEntity implements AccountModel{
    id = uuid();
    customer: CustomerEntity;
    account: AccountTypeModel;
    balance: number;
    state = true;
    daletedAt?: number | Date;
}