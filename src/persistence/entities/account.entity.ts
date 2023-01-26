import { AccountModel, AccountTypeModel, CustomerModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    
    private _id = uuid();
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    private _customer_id: CustomerModel;
    public get customer_id(): CustomerModel {
        return this._customer_id;
    }
    public set customer_id(value: CustomerModel) {
        this._customer_id = value;
    }

    private _acount_type_id: AccountTypeModel;
    public get acount_type_id(): AccountTypeModel {
        return this._acount_type_id;
    }
    public set acount_type_id(value: AccountTypeModel) {
        this._acount_type_id = value;
    }

    private _balance: number;
    public get balance(): number {
        return this._balance;
    }
    public set balance(value: number) {
        this._balance = value;
    }

    private _state: boolean;
    public get state(): boolean {
        return this._state;
    }
    public set state(value: boolean) {
        this._state = value;
    }

    private _deleted_at: number | Date;
    public get deleted_at(): number | Date {
        return this._deleted_at;
    }
    public set deleted_at(value: number | Date) {
        this._deleted_at = value;
    }

}