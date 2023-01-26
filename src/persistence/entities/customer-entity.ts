
import { ICustomerModel } from 'src/models/i-customer-model';
import { DocumentTypeEntity } from './document-type-entity';
import { v4 as uuid } from 'uuid';

export class CustomerEntity implements ICustomerModel {

    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state : boolean;
    daletedAt?: Date | number;

}