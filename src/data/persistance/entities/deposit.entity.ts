import { DepositModel } from 'src/data/models';
import { AccountEntity } from './account.entity';

import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel {
    id = uuid()
    account: AccountEntity
    amount: number
    dateTime: number | Date
    deletedAt?: number | Date
}