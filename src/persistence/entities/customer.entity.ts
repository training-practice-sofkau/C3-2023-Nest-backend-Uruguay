import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from './';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{   
    protected _id = uuid();
    documentTypeRepository: import("c:/Users/Cafe/Desktop/Sofka/Prueba 1 Proyectos Nest js/Proyecto Presentacion entregado/C3-2023-Nest-backend-Uruguay/src/models/document-type.model").DocumentTypeModel;
    public get id() {
        return this._id;
    }
    public set id(value) {
        this._id = value;
    }

    protected _documentType: DocumentTypeEntity;
    public get documentType(): DocumentTypeEntity {
        return this._documentType;
    }
    public set documentType(value: DocumentTypeEntity) {
        this._documentType = value;
    }

    protected _document: string;
    public get document(): string {
        return this._document;
    }
    public set document(value: string) {
        this._document = value;
    }

    protected _fullName: string;
    public get fullName(): string {
        return this._fullName;
    }
    public set fullName(value: string) {
        this._fullName = value;
    }

    protected _email: string;
    public get email(): string {
        return this._email;
    }
    public set email(value: string) {
        this._email = value;
    }

    protected _phone: string;
    public get phone(): string {
        return this._phone;
    }
    public set phone(value: string) {
        this._phone = value;
    }

    protected _password: string;
    public get password(): string {
        return this._password;
    }
    public set password(value: string) {
        this._password = value;
    }

    protected _avatarUrl?: string | undefined;
    public get avatarUrl(): string | undefined {
        return this._avatarUrl;
    }
    public set avatarUrl(value: string | undefined) {
        this._avatarUrl = value;
    }

    protected _state = true;
    public get state() {
        return this._state;
    }
    public set state(value) {
        this._state = value;
    }

    protected _daletedAt?: Date | number | undefined;
    public get daletedAt(): Date | number | undefined {
        return this._daletedAt;
    }
    public set daletedAt(value: Date | number | undefined) {
        this._daletedAt = value;
    }
}