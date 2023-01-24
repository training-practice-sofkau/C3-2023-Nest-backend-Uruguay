import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { ServiceInterface } from './interfaces';

@Injectable()
export class CustomerRepository implements ServiceInterface {
  private readonly database: Array<CustomerEntity>;

  constructor() {
    this.database = new Array<CustomerEntity>();
  }
  
  register(entity: object): object {
    throw new Error('Method not implemented.');
  }

  update(id: string, entity: object): object {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): object[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): object {
    throw new Error('Method not implemented.');
  }

  
}