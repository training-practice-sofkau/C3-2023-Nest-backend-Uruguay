import { CustomerModel } from '../../models/customer.model';
import { DocumentTypeEntity } from './document_type.entity';
import { v4 as uuid} from 'uuid';

export class CustomerEntity implements CustomerModel {
    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    phone: string;
    avatarURL?: string;
    state = true;
    deletedAt?: Date | number;
    
}

