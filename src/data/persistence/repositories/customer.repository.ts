import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { CustomerEntity } from '../entities';
import { IDisableable, INameable, ICustomerRepository } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class CustomerRepository extends GeneralCRUD<CustomerEntity> implements ICustomerRepository, IDisableable<CustomerEntity>, INameable<CustomerEntity> {

  public static instance: CustomerRepository;

  public static getInstance(): CustomerRepository {
    if (!CustomerRepository.instance) {
      CustomerRepository.instance = new CustomerRepository();
    }
    return CustomerRepository.instance;
  }

  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id == id && item.deletedAt == undefined
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
    let finded = this.database.findIndex(
      (item) => 
        item.id == id
    );
    if (finded == undefined) throw new NotFoundException();
    soft?.valueOf() ? this.softDelete(finded) : this.hardDelete(finded);
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

  findAll(paginator?: PaginationModel): CustomerEntity[] {
    let finded = this.database.filter(
      (item) => item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException()
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findOneById(id: string): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.id == id &&
        item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException()
    return finded
  }

  findOneByEmailAndPassword(email: string, password: string): CustomerEntity {
    const finded = this.database.find(
      (item) =>
        item.email == email &&
        item.password == password &&
        item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findOneByDocumentTypeAndDocument( documentTypeId: string, document: string ): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.documentType.id == documentTypeId &&
        item.document == document &&
        item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findOneByEmail(email: string): CustomerEntity | undefined {
    let finded = this.database.find(
      (item) => 
        item.email == email &&
        item.deletedAt == undefined
    );
    return finded;
  }

  findOneByPhone(phone: string): CustomerEntity {
    let finded = this.database.find(
      (item) => 
        item.phone == phone &&
        item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByState(state: boolean): CustomerEntity[] {
    let finded = this.database.filter(
      (item) => item.state == state &&
      item.deletedAt == undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findSoftDeletedCustomers(): CustomerEntity[] {
    let finded = this.database.filter(
      (item) => item.deletedAt !== undefined
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByName(name: string): CustomerEntity[] {
    let finded: CustomerEntity[] | undefined
    this.database.forEach((item) => {
        if (item.fullName == name && item.deletedAt == undefined){
          finded = finded?.concat([item]);
        }
      }
    );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }
}