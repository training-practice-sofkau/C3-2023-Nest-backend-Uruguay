import { AccountModel } from 'src/models';
import { depositModel } from '../../models/deposit.model';
import { AccountEntity } from './account.entity';
export class DepositEntity implements depositModel{
    dep_id: string;
    account_id: AccountEntity;
    dep_amount: number;
    dep_date_time: number | Date;
    daletedAt?: number | Date | undefined;
}