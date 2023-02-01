import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity } from '../entities/';
import { CustomerRepositoryInterface } from './interfaces/';
import { BASE } from './base/';
import { PaginationModel } from '../../models/pagination-model.model';

@Injectable()
export class CustomerRepository
  extends BASE<CustomerEntity>
  implements CustomerRepositoryInterface
{
  register(entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.findIndex(entity.id);
    if (indexCurrentEntity != -1)
      throw new Error('The Customer already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as CustomerEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.findIndex(id);

    if (indexCurrentEntity == -1) throw new NotFoundException();

    soft
      ? this.softDelete(indexCurrentEntity)
      : this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  private softDelete(index: number): void {
    this.database[index].deletedAt = Date.now();
  }

  findAll(pagination: PaginationModel): CustomerEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (paginations.limit || 0));
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
    return indexCurrentEntity != -1 ? true : false;
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

  findByState(pagination: PaginationModel ,state: boolean): CustomerEntity[] {
    const paginations = this.paginationMethod(pagination);

    return this.database.filter(
      (item) => item.state === state && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (pagination.limit || 0));
  }

  findByFullName(pagination: PaginationModel ,fullName: string): CustomerEntity[] {
    const paginations = this.paginationMethod(pagination);
    
    return this.database.filter(
      (item) =>
        item.fullName === fullName && typeof item.deletedAt === 'undefined',
    ).slice(paginations.offset, paginations.offset + (pagination.limit || 0));
  }

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined',
    );
  }

  private paginationMethod(pagination: PaginationModel): PaginationModel {
    return pagination = {
      ... {offset: 0, limit: 10},
      ... pagination
    }
  }
}
