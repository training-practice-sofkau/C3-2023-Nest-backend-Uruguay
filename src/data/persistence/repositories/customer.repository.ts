import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities';
import { BaseRepository } from './base';
import { CustomerRepositoryInterface } from './interfaces';
import { ObservableHandler } from '../../../business/observable/observable-handler';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface {
    constructor(private readonly observableHandler: ObservableHandler) {
      super();
    }

  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id && typeof item.deletedAt === 'undefined'
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id
      } as CustomerEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): string {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id === id && typeof item.deletedAt === 'undefined'
    );
    if(indexCurrentEntity === -1) throw new NotFoundException();
    
    if(soft) {
        return this.softDelete(indexCurrentEntity);
    }
    return this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): string {
      try {
          this.database.splice(index, 1);
      } catch (error) {
          return 'The customer could not be deleted';
      }
      return 'The customer was successfully deleted';
  }

  private softDelete(index: number): string {
      this.database[index].deletedAt = new Date();
      
      this.observableHandler.handle(this.database[index]).subscribe(customer => console.log(customer));

      if(this.database[index].deletedAt) return 'The deposit was successfully soft deleted'
      return 'The customer could not be soft deleted';
  }

  findAll(): CustomerEntity[] {
    return this.database.filter(
      (item) => typeof item.deletedAt === 'undefined'
    );
  }

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.deletedAt === 'undefined'
    );
    if (currentEntity) return currentEntity;
    throw new NotFoundException('The customer with this id does not exist');
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.deletedAt === 'undefined'
    );
    return indexCurrentEntity === -1 ? false : true;
  }

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {
    const currentEntity = this.database.find(
      (item) =>
      item.documentType.id === documentTypeId
      && item.document === document
      && typeof item.deletedAt === 'undefined');
    if (currentEntity) return currentEntity;
    throw new NotFoundException();
  }

  findOneByEmail(email: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.email === email && typeof item.deletedAt === 'undefined');
    if (currentEntity) return currentEntity;
    throw new NotFoundException();
  }

  findOneByPhone(phone: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.phone === phone && typeof item.deletedAt === 'undefined');
    if (currentEntity) return currentEntity;
    throw new NotFoundException();
  }

  findByState(state: boolean): CustomerEntity[] {
    const currentEntities = this.database.filter(
      (item) => item.state === state && typeof item.deletedAt === 'undefined');
   if (currentEntities) return currentEntities;
   throw new NotFoundException();
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const currentEntities = this.database.filter(
      (item) => item.fullName === fullName && typeof item.deletedAt === 'undefined');
    if (currentEntities) return currentEntities;
    throw new NotFoundException();
  }
}