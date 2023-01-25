import { DocumentTypeModel } from ".";

export interface CustomerModel {
    id: string;
    documentType: DocumentTypeModel;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl: string | null;
    state: boolean;
    deletedAt: Date | number | null;
}