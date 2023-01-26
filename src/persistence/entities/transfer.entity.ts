import { TransferModel } from "src/models/transfer.model";
import { v4 as uuid } from 'uuid';
import { AccountEntity } from "./account.entity";

export class TransferEntity implements TransferModel {
    id = uuid()
    outcome: AccountEntity
    income: AccountEntity
    amount: number
    reason: string
    dateTime: number | Date
    deletedAt?: number | Date
}