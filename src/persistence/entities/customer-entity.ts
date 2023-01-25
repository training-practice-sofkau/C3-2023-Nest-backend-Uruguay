
import { ICustomerModel } from 'src/models/i-customer-model';
import { DocumentTypeEntity } from './document-type-entity';
import { v4 as uuid } from 'uuid';

export class CustomerEntity implements ICustomerModel {

    protected id = uuid();
    protected documentType: DocumentTypeEntity;
    protected document: string;
    protected fullName: string;
    protected email: string;
    protected phone: string;
    protected password: string;
    protected avatarUrl?: string;
    protected state : boolean;
    protected daletedAt?: Date | number;


    //Duda Get and Set

}