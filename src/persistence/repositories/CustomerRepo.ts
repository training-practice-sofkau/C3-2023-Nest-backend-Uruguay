import { Injectable } from "@nestjs/common";
import { BaseRepository } from "./repo-base/base-repository";
import { CustomerEntity } from "../entities/customer-entity";
import { IRepository } from "./interface/i-base/i-repository";


@Injectable()
export class CustomerRepo extends BaseRepository<CustomerEntity> implements IRepository<CustomerEntity>{ //Consultar??
   
   
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