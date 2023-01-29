import { Injectable, NotFoundException } from '@nestjs/common';

import { BaseRepository } from '../base';
import { CustomerRepositoryInterface } from './customer-repository.interface';
import { CustomerEntity } from './customer.entity';
import { CustomerModel } from './customer.model';
;



@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface {
 //-----------------------------------------------------------------------------------------------------
//HECHA
  register(entity: CustomerModel): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
//-----------------------------------------------------------------------------------------------------
  update(id: string, entity: CustomerModel): CustomerEntity {
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
  
//-----------------------------------------------------------------------------------------------------
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }

//-----------------------------------------------------------------------------------------------------

  findAll(): CustomerEntity[] {
    return this.database.filter(
      (item) => typeof item.daletedAt === 'undefined',
    );
  }

//-----------------------------------------------------------------------------------------------------

  findOneById(id: string): CustomerEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id && typeof item.daletedAt === 'undefined',
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

 //-----------------------------------------------------------------------------------------------------

  findOneByEmailAndPassword(email: string, password: string): boolean {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        item.password === password &&
        typeof item.daletedAt === 'undefined',
    );
    return indexCurrentEntity > -1 ? true : false;
  }

//-----------------------------------------------------------------------------------------------------

  findOneByDocumentTypeAndDocument(
    documentTypeId: string,
    document: string,
  ): CustomerEntity {

    // Traer un solo objeto con tales caracteristicas
    const indexCurrentEntity = this.database.findIndex(
      (indexCurrentEntity) =>
      indexCurrentEntity.documentType.id === documentTypeId &&
      indexCurrentEntity.document === document &&
      typeof indexCurrentEntity.daletedAt === 'undefined',
    );
    if(!indexCurrentEntity){
      throw new NotFoundException(`No se encontraron los datos`);
    }
    
    return this.database[indexCurrentEntity];
  }

//-----------------------------------------------------------------------------------------------------

  findOneByEmail(email: string): CustomerEntity {

    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.email === email &&
        typeof item.daletedAt === 'undefined',
    );

    if(!indexCurrentEntity){
        throw new NotFoundException(`email : ${email} not found`);
    }

    return this.database[indexCurrentEntity];
  }

 //-----------------------------------------------------------------------------------------------------

  findOneByPhone(phone: string): CustomerEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) =>
        item.phone === phone &&
        typeof item.daletedAt === 'undefined',
    );

    if(!indexCurrentEntity){
        throw new NotFoundException(`Phone : ${phone} not found`);
    }

    return this.database[indexCurrentEntity];;
  }

//-----------------------------------------------------------------------------------------------------

  findByState(state: boolean): CustomerEntity[] {
    const stateCustomer = this.database.filter((entity => entity.state ===state && typeof entity.daletedAt === `undefined`));
    if(!stateCustomer){
      throw new NotFoundException(`State : ${state} not found`);
    }
    return stateCustomer;
  }

//-----------------------------------------------------------------------------------------------------

  findByFullName(fullName: string): CustomerEntity[] {
    const fullNameCustomer = this.database.filter(entity => entity.fullName === fullName && typeof entity.daletedAt === `undefined`)
    if(!fullNameCustomer){
      throw new NotFoundException(`fullName : ${fullName} not found`);
    }
    return fullNameCustomer;
  }
}