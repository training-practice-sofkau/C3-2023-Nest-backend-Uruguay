import { AccountModel } from '../../models';

import { v4 as uuid } from 'uuid';

import { CustomerEntity,AccountTypeEntity } from '.';

export class AccountEntity implements AccountModel{
    id = uuid();
    customerId: CustomerEntity;
    accountTypeId: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: number | Date;
}