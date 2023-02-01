import { TransferModel } from '../../../business/models';

import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel{
    id = uuid();
    outcome: string;
    income: string;
    amount: number;
    reason: string;
    dateTime = new Date(); //dateTime can be set automatic or must receive data from service??
    deletedAt?: number | Date;
}