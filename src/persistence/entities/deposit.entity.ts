import { DepositModel } from 'src/models';
import { AccountEntity } from '.';

export class DepositEntity implements DepositModel{
    accountid: AccountEntity;
    amount: number;
    date_time: Date;
    id: string;
    state: boolean;
    deletedAt?: number | Date ;
  
    
}
