import { AccountModel, DepositModel } from '../../models';
import { AccountEntity } from './';

import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    id = uuid();
    account: AccountModel;
    amount: number;
    dateTime: number | Date;
    deletedAt?: number | Date | undefined;
}