import { Injectable, NotFoundException } from '@nestjs/common';
import { CustomerEntity, DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';
import { CRUD } from './interfaces/crud.interface';

@Injectable()
export class CustomerRepository extends Base<CustomerEntity> implements CRUD<CustomerEntity> {


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

  delete(id: string, soft?: boolean | undefined): void {
    const customer = this.findOneById(id);
    if (soft || soft === undefined) {
      customer.daletedAt = Date.now();
      this.update(id, customer);
    } else {
      const index = this.database.findIndex(
        (item) => item.id === id && (item.daletedAt ?? true) === true,
      );
      this.database.splice(index, 1);
    }
  }

  findAll(): CustomerEntity[] {

    if (this.database.length == 0) {
      throw new Error('No se encontraron elementos');
    }
    return this.database.filter(
      (item) => typeof item.daletedAt === 'undefined',
    );
  }

  findOneById(id: string): CustomerEntity {

    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException("Elemento no encontrado");

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
    document: string,): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === documentTypeId && item.document == document
    );
    if (currentEntity) return currentEntity;
    else throw new Error('No se encontro el documento');
  }

  findOneByEmail(email: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.email === email && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('No se encontro el email');
  }

  findOneByPhone(phone: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.phone === phone && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('No se encontro el telefono');
  }

  findByState(state: boolean): CustomerEntity[] {
    const currentEntity: CustomerEntity[] = this.database.filter(
      (item) => item.state === state && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos de no encontrados');
  }

  findByFullName(fullName: string): CustomerEntity[] {
    const currentEntity: CustomerEntity[] = this.database.filter(
      (item) => item.fullName === fullName && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos de no encontrados');
  }


}