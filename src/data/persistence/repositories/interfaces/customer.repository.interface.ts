import { ICRUD, FindStateInterface } from './base/';
import { CustomerEntity } from '../../entities/';
import { PaginationModel } from '../../../models/pagination-model.model';

export interface CustomerRepositoryInterface
  extends ICRUD<CustomerEntity>,
    FindStateInterface<CustomerEntity> {
  findOneByEmailAndPassword(email: string, password: string): boolean;

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity;

  findOneByEmail(email: string): CustomerEntity;

  findOneByPhone(phone: string): CustomerEntity;

  findByFullName(pagination: PaginationModel ,fullName: string): CustomerEntity[];
}
