import { transferModel } from '../../models/transfer.model';
import { v4 as uuid } from 'uuid';

export class Transfer implements transferModel{
    trf_id = uuid();
    trf_outcome: string;
    trf_income: string;
    trf_amount: number;
    trf_reason: string;
    trf_date_time: Date;
    trf_delete_at: Date;
}
