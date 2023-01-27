import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from './';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{   
    private _id = uuid();
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    private _documentType: DocumentTypeEntity;
    public get documentType(): DocumentTypeEntity {
        return this._documentType;
    }
    public set documentType(value: DocumentTypeEntity) {
        this._documentType = value;
    }

    private _document: string;
    public get document(): string {
        return this._document;
    }
    public set document(value: string) {
        this._document = value;
    }

    private _fullName: string;
    public get fullName(): string {
        return this._fullName;
    }
    public set fullName(value: string) {
        this._fullName = value;
    }

    private _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    private _phone: string;
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }

    private _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    private _avatarUrl?: string | undefined;
    public get avatarUrl(): string | undefined {
        return this._avatarUrl;
    }
    public set avatarUrl(value: string | undefined) {
        this._avatarUrl = value;
    }

    private _state = true;
    public get state() {
        return this._state;
    }
    public set state(value) {
        this._state = value;
    }

    private _daletedAt?: Date | number | undefined;
    public get daletedAt(): Date | number | undefined {
        return this._daletedAt;
    }
    public set daletedAt(value: Date | number | undefined) {
        this._daletedAt = value;
    }
}