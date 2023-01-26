
import { IDocumentTypeModel } from "./i-document-type-model";


export interface ICustomerModel{

    id: string;
    documentType: IDocumentTypeModel ;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state: boolean;
    daletedAt?: Date | number;
    
}


