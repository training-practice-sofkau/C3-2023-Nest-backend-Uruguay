import { v4 as uuid } from 'uuid';
import { CustomerModel } from '../../models';
import { DocumentTypeEntity } from './document-type.entity';

export class CustomerEntity implements CustomerModel {
  id = uuid();
  documentType: DocumentTypeEntity;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl?: string;
  state = true;
  deletedAt?: Date | number;
}
