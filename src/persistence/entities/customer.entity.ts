import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from '.';
import { GeneralCRUD } from '../repositories';
import { v4 as uuid } from 'uuid';

export class CustomerEntity extends GeneralCRUD<CustomerModel> implements CustomerModel {
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