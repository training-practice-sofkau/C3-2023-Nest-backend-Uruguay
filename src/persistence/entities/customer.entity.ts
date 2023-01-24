
import { DocumentTypeEntity } from './';

import { v4 as uuid } from 'uuid';
import { CustomerModel } from '../../models/customer.model';
import { DocumentTypeModel } from 'src/models';

export class CustomerEntity implements CustomerModel{
    cust_id = uuid();
    document_type_id: DocumentTypeEntity;
    cust_document: string;
    cust_full_name: string;
    cust_email: string;
    cust_phone: string;
    cust_password: string;
    cust_avatarUrl?: string | undefined;
    cust_state: boolean;
    cust_daleted_at?: number | Date | undefined;   

}

