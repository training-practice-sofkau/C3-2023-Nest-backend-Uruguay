import { AccountModel, TransferModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class TransferEntity implements TransferModel{
    private _id = uuid();
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    private _outcome_id: AccountModel;
    public get outcome_id(): AccountModel {
        return this._outcome_id;
    }
    public set outcome_id(value: AccountModel) {
        this._outcome_id = value;
    }

    private _income_id: AccountModel;
    public get income_id(): AccountModel {
        return this._income_id;
    }
    public set income_id(value: AccountModel) {
        this._income_id = value;
    }

    private _amount: number;
    public get amount(): number {
        return this._amount;
    }
    public set amount(value: number) {
        this._amount = value;
    }

    private _reason: string;
    public get reason(): string {
        return this._reason;
    }
    public set reason(value: string) {
        this._reason = value;
    }

    private _date_time: number | Date;
    public get date_time(): number | Date {
        return this._date_time;
    }
    public set date_time(value: number | Date) {
        this._date_time = value;
    }

    private _deleted_at: number | Date;
    public get deleted_at(): number | Date {
        return this._deleted_at;
    }
    public set deleted_at(value: number | Date) {
        this._deleted_at = value;
    }

}