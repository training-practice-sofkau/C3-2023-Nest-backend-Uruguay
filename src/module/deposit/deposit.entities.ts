import { v4 as uuid } from 'uuid';
import { DepositModel } from './deposit.model';
import { AccountEntity } from '../account/entity/account.entities';

export class DepositEntity implements DepositModel  {
    
    id = uuid();
    account: AccountEntity;
    amount: number;
    date_time: Date | number;
    delete_at: Date | number;
}