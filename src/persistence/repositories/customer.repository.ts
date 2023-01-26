import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface {

  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
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

  delete(id: string, soft?: boolean): void {

    const index = this.database.findIndex(item => item.id === id);

    if(!index ) throw new NotFoundException;

    if (soft) {
        this.softDelete(index);
    } else {
        this.hardDelete(index);
    }
}

private hardDelete(index: number): void {
    this.database.splice(index, 1);
}

private softDelete(index: number): void {
    this.database[index].daletedAt = Date.now();
}

  findAll(): CustomerEntity[] {
    return this.database.filter(
      (item) => typeof item.daletedAt === 'undefined',
    );
  }

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.daletedAt === 'undefined',
    );
    return indexCurrentEntity >= -1 ? true : false;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.documentType.id === documentTypeId && item.document === document && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }

  findOneByEmail(email: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.email === email && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }

  findOneByPhone(phone: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.phone === phone && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }

  findByState(state: boolean): CustomerEntity[] {
    return this.database.filter(
      (item) => item.state === state && typeof item.daletedAt === 'undefined',
  );
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const currentEntity = this.database.filter(
      (item) => item.fullName === fullName && typeof item.daletedAt === 'undefined',
  );
  if (currentEntity) return currentEntity;
  else throw new NotFoundException();
  }
}