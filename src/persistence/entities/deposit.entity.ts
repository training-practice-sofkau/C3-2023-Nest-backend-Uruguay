import { DepositModel } from "src/models/deposit.model";
import { v4 as uuid } from 'uuid';
import { AccountEntity } from "./account.entity";

export class DepositEntity implements DepositModel {
    id = uuid()
    account: AccountEntity
    amount: number
    dateTime: number | Date
    deletedAt?: number | Date
}