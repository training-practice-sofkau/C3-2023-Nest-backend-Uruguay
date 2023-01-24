import { AccountTypeModel } from '../../models/account-type.model';
export class AccountTypeEntity implements AccountTypeModel{
    acctp_id: string;
    acctp_name: string;
    acctp_state: boolean;
}