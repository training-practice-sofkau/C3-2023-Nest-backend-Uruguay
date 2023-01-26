import { AccountTypeModel } from "../../models";
import { v4 as uuid } from 'uuid';

export class AccountTypeEntity implements AccountTypeModel{

    protected _id = uuid();
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    
    protected _name: string;
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    
    protected _state: boolean;
    public get state(): boolean {
        return this._state;
    }
    public set state(value: boolean) {
        this._state = value;
    }
}