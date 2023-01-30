import { DocumentTypeEntity } from '../entities';
import { CustomerModel } from '../../models';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string ;
    id = uuid();
    name: string ;
    state: boolean;
  
 
}

