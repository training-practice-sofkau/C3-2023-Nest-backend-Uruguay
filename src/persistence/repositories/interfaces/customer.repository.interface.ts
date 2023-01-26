import { ICRUD } from './base/CRUD.interface';
import { CustomerEntity } from '../../entities/customer.entity';
import { FindStateInterface } from './base/find-state.interface';

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
