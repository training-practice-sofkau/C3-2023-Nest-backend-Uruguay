import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { InterfaceRepo } from './interfaces/InterfaceRepo';



@Injectable()
//Si implementamos InterfaceRepo con T como CustomerEntity creamos el registrer de tipo
// CustomerEntity haciendo uso de implements InterfaceRepo<CustomerEntity> luego de la class

export class CustomerRepository implements InterfaceRepo<CustomerEntity>{

  private readonly database: Array<CustomerEntity>;

  constructor() {
    this.database = new Array<CustomerEntity>();
  }
  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: CustomerEntity, id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll([]: Iterable<any>): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
 
}