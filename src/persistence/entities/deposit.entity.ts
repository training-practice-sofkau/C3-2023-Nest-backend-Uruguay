import { DepositModel } from '../../models';

import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    id = uuid();
    accountId: string;
    amount: number;
    dateTime: Date; //dateTime can be set automatic or must receive data from service??
    deletedAt: number | Date;
}

