
import { CustomerModel } from 'src/module/customer/models/customer.model';

import { v4 as uuid } from 'uuid';
import { DocumentTypeEntity } from './document-type-Entity';

export class CustomerEntity implements CustomerModel{
    id= uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string | undefined;
    state = true;
    daletedAt?: number | Date | undefined;  
}