import { v4 as uuid } from 'uuid';
import { DepositModel } from '../../models/deposit.model';



export class Deposit implements DepositModel  {
    
    dep_id = uuid();
    account_id: string;
    dep_amount: number;
    dep_date_time: Date;
    dep_delete_at: Date;
}