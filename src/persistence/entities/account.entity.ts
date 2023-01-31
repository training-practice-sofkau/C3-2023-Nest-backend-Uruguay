import { AccountModel } from 'src/models/account.model';

import { v4 as uuid } from 'uuid';
import { CustomerEntity } from './customer.entity';
import { AccountTypeEntity } from './account-type.entity';

export class AccountEntity implements AccountModel {
    id = uuid();
    customer: CustomerEntity;
    accountType: AccountTypeEntity;
    balance: number;
    state: boolean;
    deletedAt?: number | Date;
}