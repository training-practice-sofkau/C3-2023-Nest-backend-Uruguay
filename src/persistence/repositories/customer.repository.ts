import { Injectable } from '@nestjs/common/decorators';
import { CustomerEntity } from '../entities';
import { RepositoryMethodsInterface } from './interfaces';

@Injectable()
export class CustomerRepository implements RepositoryMethodsInterface<CustomerEntity> {
    
  private readonly database: Array<CustomerEntity>;

  constructor() {
    this.database = new Array<CustomerEntity>();
  }
  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
   
  

  
}