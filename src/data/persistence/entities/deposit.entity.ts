import { v4 as uuid } from 'uuid';

import { DepositModel, AccountModel } from '../../models';

export class DepositEntity implements DepositModel {
    id = uuid();
    accountId: AccountModel;
    amount: number;
    dateTime: Date;
    daletedAt: number | Date ;
}