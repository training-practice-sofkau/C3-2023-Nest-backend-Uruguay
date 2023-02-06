import { v4 as uuid } from 'uuid';
import { DepositModel } from '../models';
import { AccountEntity } from 'src/module/account/capaDeDato/entity';


export class DepositEntity implements DepositModel  {
    
    id = uuid();
    account: AccountEntity;
    amount: number ;
    date_time: Date | number;
    delete_at: Date | number;
}