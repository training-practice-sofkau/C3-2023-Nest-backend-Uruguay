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
      (item) => item.id === id && typeof item.deletedAt === 'undefined');
    if (indexCurrentEntity >=0 ) 
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as CustomerEntity; //Si lo que viene del if puede entrar a CustomerEntity? 2do check
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
    const customer = this.findOneById(id);
    if (soft || soft === undefined) {
      customer.deletedAt = Date.now();
      this.update(id, customer);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.deletedAt ?? true) === true,
      );
      this.database.splice(index, 1);
    }
  }

  findAll(): CustomerEntity[] {
    return this.database.filter((item) => item.deletedAt === undefined);
  }
    
    
  findOneById(id: string): CustomerEntity {
    const customer = this.database.find(
      (item) => item.id === id && (item.deletedAt ?? true) === true);
    if (customer) return customer;
    else throw new NotFoundException("El id no existe en base de datos");
  }

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const index = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.deletedAt === 'undefined',
    );
    return index >= 0 ? true : false;
  }

  findOneByDocumentTypeAndDocument(documentType: string, document: string): boolean {
    const index = this.database.findIndex(
      (item) =>
        item.documentType.id === documentType &&
        item.document === document &&
        typeof item.deletedAt === 'undefined',
    );
    return index >= 0 ? true : false;
  }

  findOneByEmail(email: string): CustomerEntity {
    const emailf = this.database.findIndex(
      (item) => item.email == email && typeof item.deletedAt === "undefined"
    )
    return this.database[emailf]
  }

  findOneByPhone(phone: string): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  findByState(state: boolean): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }

  findByFullName(fullName: string): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }
}