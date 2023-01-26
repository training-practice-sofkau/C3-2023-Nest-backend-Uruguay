import { accountType } from "src/models/account_type";
import { v4 as uuid } from 'uuid';

export class AccountTypeModel implements accountType{
    
    acctp_id = uuid();
    customer_id: string;
    acctp_name: string;
    acctp_state: boolean;
    acctp_balance: number;
    acctp_deletd_at: Date;
    


}
