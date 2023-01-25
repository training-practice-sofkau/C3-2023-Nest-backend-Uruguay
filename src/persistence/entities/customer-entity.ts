
import { ICustomerModel } from 'src/models/customer-model/i-customer-model';
import { v4 as uuid } from 'uuid';
import { DocumentTypeEntity } from './document-type-entity';

export class CustomerEntity implements ICustomerModel{   
    
    protected id = uuid();
    protected documentType: DocumentTypeEntity;
    protected document: string;
    protected fullName: string;
    protected email: string;
    protected phone: string;
    protected password: string;
    protected avatarUrl?: string ;
    protected state = true;
    protected daletedAt?: Date | number;
    

}