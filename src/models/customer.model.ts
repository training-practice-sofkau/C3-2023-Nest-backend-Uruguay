import { DocumentTypeModel } from "../models";

export interface CustomerModel {
    id: string;
    documentType: DocumentTypeModel;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl?: string;
    state: boolean;
    daletedAt?: Date | number;
}