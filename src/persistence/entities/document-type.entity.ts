import { v4 as uuid } from 'uuid';

import { DocumentTypeModel } from '../../models';

export class DocumentTypeEntity implements DocumentTypeModel{
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

    protected _state = true;
    public get state() {
        return this._state;
    }
    public set state(value) {
        this._state = value;
    }
}