import { CustomerModel, DocumentTypeModel } from '../../models';
import { DocumentTypeEntity } from './';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string | undefined;
    state = true;
    deletedAt?: number | Date | undefined;   
    
}