import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface
{
  searchByAttributesforOne(
    attributes: keyof CustomerEntity,
    dataToSearch: string,
  ): CustomerEntity {
    const currentEntity = this.database.find(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }
  searchByAttributes(
    attributes: keyof CustomerEntity,
    dataToSearch: string,
  ): CustomerEntity[] {
    const currentEntity = this.database.filter(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id ,
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    this.database.splice(
      this.database.findIndex((item) => item.id === id),
      1,
    );
  }

  findAll(): CustomerEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.deletedAt === 'undefined',
    );
    return indexCurrentEntity >= -1 ? true : false;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.documentType.id === documentTypeId &&
        item.document === document,
    );
    return this.database[indexCurrentEntity];
  }

  findByState(state: boolean): CustomerEntity[] {
    return this.database.filter((item) =>
      state === true
        ? item.state === true
        : item.state === false,
    );
  }
}
