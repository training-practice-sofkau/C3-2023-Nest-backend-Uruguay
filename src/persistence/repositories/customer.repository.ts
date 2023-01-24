import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { IRepositoriesGlobal } from './interfaces/repositories-global.interface';

@Injectable()
export class CustomerRepository implements IRepositoriesGlobal<CustomerEntity>  {
  private readonly database: Array<CustomerEntity>;// coleccion de clientes 

  constructor() {
    this.database = new Array<CustomerEntity>();
  }

  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: CustomerEntity): CustomerEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
    throw new Error('This method is not implemented');
  }

  findAll(): CustomerEntity[] {
    throw new Error('This method is not implemented');
  }

  findOneById(id: string): CustomerEntity {
    throw new Error('This method is not implemented');
  }
}