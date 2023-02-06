import { TransferModel } from "../../models";
import { AccountEntity } from './';

import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel{
    id = uuid();
    outcome: AccountEntity;
    income: AccountEntity;
    amount: number;
    reason: string;
    dateTime = Date.now();
    deletedAt?: number | Date | undefined;
}