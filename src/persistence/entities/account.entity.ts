import { AccountModel } from '../../models';

import { v4 as uuid } from 'uuid';
import { AccountTypeEntity } from './account-type.entity';

export class AccountEntity implements AccountModel{
    id: string;
    customerId: string;
    accountTypeId: AccountTypeEntity;
    balance: number;
    state = true;
    deletedAt?: number | Date;
}