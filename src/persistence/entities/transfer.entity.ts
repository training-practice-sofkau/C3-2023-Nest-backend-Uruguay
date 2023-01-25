import { TransferModel } from '../../models';
import { AccountEntity } from './account.entity';
import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel {
    id = uuid();
    outcome: AccountEntity;
    income: AccountEntity;
    balance: number;
    reason: string;
    dateTime: Date | number;
    deletedAt: number | Date | null;  
}
