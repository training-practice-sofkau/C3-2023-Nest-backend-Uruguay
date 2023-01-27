import { AccountModel, DepositModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class DepositEntity implements DepositModel{
    protected _id = uuid();
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    protected _account_id: AccountModel;
    public get account_id(): AccountModel {
        return this._account_id;
    }
    public set account_id(value: AccountModel) {
        this._account_id = value;
    }

    protected _amount: number;
    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }

    protected _date_time: number | Date;
    public get date_time(): number | Date {
        return this._date_time;
    }
    public set date_time(value: number | Date) {
        this._date_time = value;
    }

    protected _deleted_at: number | Date;
    public get deleted_at(): number | Date {
        return this._deleted_at;
    }
    public set deleted_at(value: number | Date) {
        this._deleted_at = value;
    }
}