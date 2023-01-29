import { transferModel } from './transfer.model';
import { v4 as uuid } from 'uuid';
import { AccountEntity } from '../account/account.entities';


export class TransferEntity implements transferModel{
    id = uuid();
    outcome: AccountEntity;
    income: AccountEntity;
    amount: number;
    reason: string;
    date_time: Date | number;
    delete_at: Date | number;
}
