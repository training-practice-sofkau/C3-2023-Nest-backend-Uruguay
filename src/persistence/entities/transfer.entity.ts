import { TransferModel } from '../../models';
import { AccountEntity } from '.';
import { GeneralCRUD } from '../repositories';
import { v4 as uuid } from 'uuid';

export class TransferEntity extends GeneralCRUD<TransferModel> implements TransferModel {
    id = uuid();
    outcome: AccountEntity;
    income: AccountEntity;
    balance: number;
    reason: string;
    dateTime: Date | number;
    deletedAt: number | Date | null;  
}
