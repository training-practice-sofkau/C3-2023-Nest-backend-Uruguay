import { DocumentTypeModel } from "./document-type.model";
import { IGeneral } from '../persistence/repositories/interfaces';

export interface CustomerModel extends IGeneral {
    documentType: DocumentTypeModel;
    document: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    avatarUrl: string | null;
    state: boolean;
}