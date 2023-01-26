import { accountType } from "src/models/account_type";
import { v4 as uuid } from 'uuid';

export class accountTypeModel implements accountType{
    
    acctp_id = uuid();
    acctp_name: string;
    acctp_state: boolean;

}
