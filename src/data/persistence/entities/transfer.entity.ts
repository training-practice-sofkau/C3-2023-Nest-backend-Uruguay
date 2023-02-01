import { v4 as uuid } from 'uuid';

import { TransferModel, AccountModel} from '../../models';

export class TransferEntity implements TransferModel {
    id = uuid();
    outcome: AccountModel;
    income: AccountModel;
    amount: number;
    reason: string;
    dateTime: Date;
    daletedAt: number | Date;
}