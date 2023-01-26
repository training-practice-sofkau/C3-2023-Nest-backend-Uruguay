import { AccountModel, TransferModel } from 'src/models';
import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel{
    id = uuid();
    outCome: AccountModel;
    inCome: AccountModel;
    reason: string;
    dateTime: number | Date;
    deleted_at?: number | Date;

}