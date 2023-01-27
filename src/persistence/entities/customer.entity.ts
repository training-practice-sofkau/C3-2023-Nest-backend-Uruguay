import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from './';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{   
    private _id = uuid();
    private _documentType: DocumentTypeEntity;
    private _document: string;
    private _fullName: string;
    private _email: string;
    private _phone: string;
    private _password: string;
    private _avatarUrl?: string | undefined;
    private _state = true;
    private _deletedAt?: Date | number | undefined;

    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }
    public get documentType(): DocumentTypeEntity {
        return this._documentType;
    }
    public set documentType(value: DocumentTypeEntity) {
        this._documentType = value;
    }
    public get document(): string {
        return this._document;
    }
    public set document(value: string) {
        this._document = value;
    }
    public get fullName(): string {
        return this._fullName;
    }
    public set fullName(value: string) {
        this._fullName = value;
    }    
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }
    public get avatarUrl(): string | undefined {
        return this._avatarUrl;
    }
    public set avatarUrl(value: string | undefined) {
        this._avatarUrl = value;
    }
    public get state() {
        return this._state;
    }
    public set state(value) {
        this._state = value;
    }
    public get deletedAt(): Date | number | undefined {
        return this._deletedAt;
    }
    public set deletedAt(value: Date | number | undefined) {
        this._deletedAt = value;
    }
}