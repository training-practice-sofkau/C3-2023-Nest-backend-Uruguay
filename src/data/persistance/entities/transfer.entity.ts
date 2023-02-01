import { TransferModel } from 'src/data/models';
import { AccountEntity } from './account.entity';

import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel {
    id = uuid()
    outcome: AccountEntity
    income: AccountEntity
    amount: number
    reason: string
    dateTime: number | Date
    deletedAt?: number | Date
}