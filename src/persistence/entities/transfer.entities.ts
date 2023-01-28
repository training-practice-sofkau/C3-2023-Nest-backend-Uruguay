import { accountType } from 'src/models';
import { transferModel } from '../../models/transfer.model';
import { v4 as uuid } from 'uuid';
import { AccountTypeModel } from './account.type.entities';

export class Transfer implements transferModel{
    trf_id = uuid();
    trf_outcome: AccountTypeModel;
    trf_income: AccountTypeModel;
    trf_amount: number;
    trf_reason: string;
    trf_date_time: Date;
    trf_delete_at: Date;
}
