import { ICRUD, FindStateInterface } from './base/';
import { CustomerEntity } from '../../entities/';

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

  findByFullName(fullName: string): CustomerEntity[];
}
