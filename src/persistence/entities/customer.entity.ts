import { CustomerModel, DocumentTypeModel } from '../../models';

import { v4 as uuid } from 'uuid';

export class CustomerEntity implements CustomerModel{
    id = uuid();
    documentType: DocumentTypeModel;
    document: string;
    fullname: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string | undefined;
    state = true;
    deletedAt?: number | Date | undefined;
}