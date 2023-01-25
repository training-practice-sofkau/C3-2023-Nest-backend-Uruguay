import { DocumentTypeModel } from "./documentType.model";
export interface CustomerModel {
    id: string;
    documentType: DocumentTypeModel;
    document: string;
    fullName: string;
    phone: string;
    avatarURL?: string;
    state: boolean;
    deletedAt?: Date | number;
}