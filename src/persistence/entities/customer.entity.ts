import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from './';
import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel {
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl: string | null ;
    state = true;
    deletedAt: number | Date | null;  
}