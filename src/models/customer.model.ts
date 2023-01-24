import { DocumentTypeModel } from "./document-type.model";
//Se crea la inteface para los clientes 
export interface CustomerModel {
    id: string;
    documentType: DocumentTypeModel;//DocumentTypeModel , es un tipo de dato que nosotros creamos
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state: boolean;
    daletedAt?: Date | number;
}