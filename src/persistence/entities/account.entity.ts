import { AccountModel } from '../../models';
import { AccountTypeEntity, CustomerEntity } from './';

import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: number | Date ;
}