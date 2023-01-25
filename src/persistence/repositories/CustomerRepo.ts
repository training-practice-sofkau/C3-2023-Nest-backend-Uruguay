import { Injectable } from "@nestjs/common";
import { AbstracRepo } from "./base/abtrac-repo";
import { CustomerEntity } from "../entities/customer-entity";


@Injectable()
export class CustomerRepo extends AbstracRepo<CustomerEntity>{
   

   
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