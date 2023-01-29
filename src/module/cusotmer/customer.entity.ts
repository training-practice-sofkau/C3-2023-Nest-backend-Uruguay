
import { CustomerModel } from 'src/module/cusotmer/customer.model';
import { DocumentTypeEntity } from './document-type.entity';

import { v4 as uuid } from 'uuid';

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