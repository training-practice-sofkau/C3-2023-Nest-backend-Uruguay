import { CustomerModel } from '../../models/';
import { DocumentTypeEntity } from './';
import { v4 as uuid} from 'uuid';

export class CustomerEntity implements CustomerModel {
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    email: string;
    fullName: string;
    password: string;
    phone: string;
    avatarURL?: string;
    state = true;
    deletedAt?: Date | number;
    
}

