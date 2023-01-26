import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from '../entities/';
import { CRUD } from './base/';
import { CustomerRepositoryInterface } from './interfaces/';

@Injectable()
export class CustomerRepository
  extends CRUD<CustomerEntity>
  implements CustomerRepositoryInterface
{
  register(entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === entity.id,
    );
    if (indexCurrentEntity != -1) throw new NotFoundException();

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as CustomerEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );

    if (indexCurrentEntity == -1) throw new NotFoundException();

    soft ? this.softDelete(indexCurrentEntity) : this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(): CustomerEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    );
  }

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
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
    const currentEntity = this.database.find(
      (item) =>
        item.documentType.id === documentTypeId &&
        item.document === document &&
        typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findOneByEmail(email: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.email === email && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findOneByPhone(phone: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.phone === phone && typeof item.deletedAt === 'undefined',
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByState(state: boolean): CustomerEntity[] {
    return this.database.filter(
      (item) => item.state === state && typeof item.deletedAt === 'undefined',
    );
  }

  findByFullName(fullName: string): CustomerEntity[] {
    return this.database.filter(
      (item) =>
        item.fullName === fullName && typeof item.deletedAt === 'undefined',
    );
  }
}
