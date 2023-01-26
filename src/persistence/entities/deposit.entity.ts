import { DepositModel } from '../../models';
import { AccountEntity } from './';

import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    private _id = uuid();
    private _account: AccountEntity;
    private _amount: number;
    private _dateTime: number | Date;
    private _deletedAt?: number | Date | undefined;

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    public get account(): AccountEntity {
        return this._account;
    }
    public set account(value: AccountEntity) {
        this._account = value;
    }
    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
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