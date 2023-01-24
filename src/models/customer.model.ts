import { DocumentTypeModel } from "./document-type.model";

export interface CustomerModel {
    cust_id: string;
    document_type_id: DocumentTypeModel;
    cust_document: string;
    cust_full_name: string;
    cust_email: string;
    cust_phone: string;
    cust_password: string;
    cust_avatarUrl?: string;
    cust_state: boolean;
    cust_daleted_at?: Date | number;
}