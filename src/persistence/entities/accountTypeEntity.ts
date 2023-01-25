import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from '../../models/account-type.model';
export class AccountTypeEntity implements AccountTypeModel{
    acctp_id = uuid();
    acctp_name: string;
    acctp_state: boolean;
}