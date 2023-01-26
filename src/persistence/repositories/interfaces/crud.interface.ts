import { Injectable } from '@nestjs/common';
import { CustomerEntity } from 'src/persistence/entities/';

//@Injectable()
export  interface CRUD<T> {
 // private readonly database: Array<CustomerEntity>;

 /* constructor() {
    //this.database = new Array<CustomerEntity>();
 }
*/
   register(entity:T): T; 
    //throw new Error('This method is not implemented');
  
  update(id: string, entity: T): T;

  delete(id: string, soft?: boolean): void;

  findAll(): T[];

  findOneById(id: string): T;
}