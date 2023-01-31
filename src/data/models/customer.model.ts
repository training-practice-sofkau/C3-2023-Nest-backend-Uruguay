import { DocumentTypeModel } from "./";
export interface CustomerModel {
    id: string;
    documentType: DocumentTypeModel;
    document: string;
    email: string;
    fullName: string;
    password: string;
    phone: string;
    avatarURL?: string;
    state: boolean;
    deletedAt?: Date | number;
}