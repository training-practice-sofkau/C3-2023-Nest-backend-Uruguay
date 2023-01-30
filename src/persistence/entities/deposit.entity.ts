import { DepositModel } from '../../models';
import { AccountEntity } from '.';

import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel {
    id = uuid();
    account: AccountEntity;
    amount: number;
    dateTime: Date | number;
    deletedAt?: number | Date;  
}
