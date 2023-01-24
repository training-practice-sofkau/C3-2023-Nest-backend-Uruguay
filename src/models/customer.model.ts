import { DocumentTypeModel } from "./";

export interface CustomerModel{
    id: string;
    documentType: DocumentTypeModel;
    document:string;
    fullname:string;
    email:string;
    phone:string;
    password:string;
    avatarUrl?:string;
    state: boolean;
    deletedAt?: Date | number;
}