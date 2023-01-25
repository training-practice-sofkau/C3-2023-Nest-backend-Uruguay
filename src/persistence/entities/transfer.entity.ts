import { v4 as uuid } from 'uuid';
import { TransferModel } from '../../models/transfer.model';
import { AccountEntity } from './account.entity';

export class TransferEntity implements TransferModel{
    trf_id = uuid();
    trf_outcome: AccountEntity;
    trf_income: AccountEntity;
    trf_reason: string;
    trf_date_time: number | Date;
    trf_deleted_at?: number | Date | undefined;
}