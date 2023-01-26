import { Injectable, NotFoundException } from '@nestjs/common';

import { CustomerEntity } from '../entities';

import { CustomerRepositoryInterface } from './interfaces';
import { BaseRepository } from '.';
import { CustomerEntity } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity>
  implements CustomerRepositoryInterface {
 //-----------------------------------------------------------------------------------------------------
//HECHA
  register(entity: CustomerEntity): CustomerEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }
//-----------------------------------------------------------------------------------------------------
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
    return indexCurrentEntity >= -1 ? true : false;
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

    //Verifico que algun cliente este en se estado
    const indexCurrentEntity = this.database.find(
      (item) =>
        item.state === state &&
        typeof item.daletedAt === 'undefined',
    );
    //Si no hay cliente con este estado entonces mando un exepcion
    if(!indexCurrentEntity){
      throw new NotFoundException(`State : ${state} not found`);
    }

    //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese estado
    const stateCustomer : CustomerEntity[] = [];
    for(let i = 0; i<this.database.length; i++){
      if(this.database[i].state === state){
        stateCustomer[i] = this.database[i];
      }
    }
   
    return stateCustomer;
  }

//-----------------------------------------------------------------------------------------------------

  findByFullName(fullName: string): CustomerEntity[] {
    //Verifico que algun cliente con este fullName
    const indexCurrentEntity = this.database.find(
      (item) =>
        item.fullName === fullName &&
        typeof item.daletedAt === 'undefined',
    );
    //Si no hay cliente con este fullName entonces mando un exepcion
    if(!indexCurrentEntity){
      throw new NotFoundException(`fullName : ${fullName} not found`);
    }
    
    //En caso de haber , hago una copia para retornar un arreglo de los clientes que tienen ese fullName
    const fullNameCustomer : CustomerEntity[] = [];
    for(let i = 0; i<this.database.length; i++){
      if(this.database[i].fullName === fullName){
        fullNameCustomer[i] = this.database[i];
      }
    }
   
    return fullNameCustomer;
  }
}