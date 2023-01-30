import { v4 as uuid } from 'uuid';
import { DepositModel } from './deposit.model';
import { AccountEntity } from '../account/account.entities';

export class DepositEntity implements DepositModel  {
    
    id = uuid();
    account: AccountEntity;
    amount: number;
    date_time: Date;
    delete_at: Date | number;
}