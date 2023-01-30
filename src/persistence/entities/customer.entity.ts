import { CustomerModel, DocumentTypeModel } from '../../models';
import { DocumentTypeEntity } from './';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{
    id = uuid();
    documentType: DocumentTypeModel;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string | undefined;
    state = true;
    daletedAt?: number | Date | undefined;   
    
}