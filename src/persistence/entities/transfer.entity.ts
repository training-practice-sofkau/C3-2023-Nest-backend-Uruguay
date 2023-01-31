import { AccountModel, TransferModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel{
    id: string;
    outcome_id: AccountModel;
    income_id: AccountModel;
    amount: number;
    reason: string;
    date_time: number | Date;
    deleted_at: number | Date;

}