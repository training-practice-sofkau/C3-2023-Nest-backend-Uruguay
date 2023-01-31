import { TransferModel } from "../../models";
import { AccountEntity } from './';

import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel{
    private _id = uuid();
    private _outcome: AccountEntity;
    private _income: AccountEntity;
    private _amount: number;
    private _reason: string;
    private _dateTime: number | Date;
    private _deletedAt?: number | Date | undefined;

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    public get outcome(): AccountEntity {
        return this._outcome;
    }
    public set outcome(value: AccountEntity) {
        this._outcome = value;
    }
    public get income(): AccountEntity {
        return this._income;
    }
    public set income(value: AccountEntity) {
        this._income = value;
    }
    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }
    public get reason(): string {
        return this._reason;
    }
    public set reason(value: string) {
        this._reason = value;
    }
    public get dateTime(): number | Date {
        return this._dateTime;
    }
    public set dateTime(value: number | Date) {
        this._dateTime = value;
    }
    public get deletedAt(): number | Date | undefined {
        return this._deletedAt;
    }
    public set deletedAt(value: number | Date | undefined) {
        this._deletedAt = value;
    }
}