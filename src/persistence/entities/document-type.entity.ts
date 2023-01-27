import { v4 as uuid } from 'uuid';

import { DocumentTypeModel } from '../../models';

export class DocumentTypeEntity implements DocumentTypeModel{
    private _id = uuid();
    private _name: string;
    private _state = true;

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get state() {
        return this._state;
    }
    public set state(value) {
        this._state = value;
    }
}