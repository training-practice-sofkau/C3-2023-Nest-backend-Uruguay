import { AccountModel } from '../../models';

import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    id: string;
    customerId: string;
    accountTypeId: string;
    balance: number;
    state = true;
    deletedAt?: number | Date;
}