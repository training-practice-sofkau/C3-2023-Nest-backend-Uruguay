import { DocumentTypeModel } from '../models';

export interface CustomerModel extends BaseModel {
  documentType: DocumentTypeModel;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  name: string;
  id: string;  
  state: boolean;
}
