import { v4 as uuid } from 'uuid';
import { CustomerModel } from '../../../business/models';
import { DocumentTypeEntity } from '.';


export class CustomerEntity implements CustomerModel{
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state = true;
    deletedAt?: number | Date;
}