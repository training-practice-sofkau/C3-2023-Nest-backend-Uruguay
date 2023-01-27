import { AccountModel } from '../../models';
import { AccountTypeEntity, CustomerEntity } from './';

import { v4 as uuid } from 'uuid';

export class AccountEntity implements AccountModel{
    private _id = uuid();
    private _customer: CustomerEntity;
    private _accountType: AccountTypeEntity;
    private _balance: number;
    private _state = true;
    private _deletedAt?: number | Date | undefined;
    
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    public get customer(): CustomerEntity {
        return this._customer;
    }
    public set customer(value: CustomerEntity) {
        this._customer = value;
    }
    public get accountType(): AccountTypeEntity {
        return this._accountType;
    }
    public set accountType(value: AccountTypeEntity) {
        this._accountType = value;
    }
    public get balance(): number {
        return this._balance;
    }
    public set balance(value: number) {
        this._balance = value;
    }
    public get state() {
        return this._state;
    }
    public set state(value) {
        this._state = value;
    }
    public get deletedAt(): number | Date | undefined {
        return this._deletedAt;
    }
    public set deletedAt(value: number | Date | undefined) {
        this._deletedAt = value;
    }
}