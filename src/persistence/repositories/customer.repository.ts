import { Injectable } from '@nestjs/common';
import { CustomerEntity, DocumentTypeEntity } from '../entities';
import { GeneralCRUD } from './base/GeneralCRUD.base';

@Injectable()
export class CustomerRepository extends GeneralCRUD implements CustomerEntity {
  private readonly database: Array<CustomerEntity>;
  documentType: DocumentTypeEntity;
  document: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  avatarUrl: string | null;
  state: boolean;

  constructor() {
    super();
    this.database = new Array<CustomerEntity>();
  }
}