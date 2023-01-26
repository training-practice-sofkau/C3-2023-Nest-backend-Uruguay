import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { CustomerEntity } from '../entities';

@Injectable()
export class CustomerRepository extends GeneralCRUD<CustomerEntity> {

  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity;
    else throw new NotFoundException;
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
    // This will be work but the main Repository instance its not exist
    // MainCustomerTypeRepository().delete(this.database[index].accountType.id, false);
    // And optional accounts remove sentence
    // MainAccountTypeRepository().findByCustomer(this.database[index].id).forEach(function (value) {
    //     MainAccountTypeRepository().delete(value.id, false);
    // });
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
    // This will be work but the main Repository instance its not exist
    // MainCustomerTypeRepository().delete(this.database[index].accountType.id, true);
    // And optional accounts remove sentence
    // MainAccountTypeRepository().findByCustomer(this.database[index].id).forEach(function (value) {
    //     MainAccountTypeRepository().delete(value.id, true);
    // });
  }

  findAll(): CustomerEntity[] {
    let finded = this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
    if (finded === undefined) throw new NotFoundException()
    return finded
  }

  findOneById(id: string): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.id === id &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException()
    return finded
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.deletedAt === 'undefined'
    );
    return indexCurrentEntity >= -1 ? true : false;
  }

  findOneByDocumentTypeAndDocument( documentTypeId: string, document: string ): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.documentType.id === documentTypeId &&
        item.document === document &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findOneByEmail(email: string): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.email === email &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findOneByPhone(phone: string): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.phone === phone &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findByState(state: boolean): CustomerEntity[] {
    let finded = this.database.filter(
      (item) => 
        item.state === state &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findByFullName(fullName: string): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.fullName === fullName &&
        typeof item.deletedAt === 'undefined'
    );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }
}