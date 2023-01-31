
import { ICustomerModel } from 'src/data-access/models/i-customer-model';
import { DocumentTypeEntity } from './document-type-entity';
import { v4 as uuid } from 'uuid';

export class CustomerEntity implements ICustomerModel {

    id = uuid();
    documentType: DocumentTypeEntity;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state = true;
    daletedAt?: Date | number; //Si esta indefino no fue borrado

}