import { Injectable } from "@nestjs/common";
import { CustomerModel } from "src/models/customer-model/customer-model";


@Injectable()
export class CustomerRepo {
    private readonly database: Array<CustomerModel>;

    constructor() {
      this.database = new Array<CustomerModel>();
    }
  
    register(entity: CustomerModel): CustomerModel {
      throw new Error('This method is not implemented');
    }
  
    update(id: string, entity: CustomerModel): CustomerModel {
      throw new Error('This method is not implemented');
    }
  
    delete(id: string, soft?: boolean): void {
      throw new Error('This method is not implemented');
    }
  
    findAll(): CustomerModel[] {
      throw new Error('This method is not implemented');
    }
  
    findOneById(id: string): CustomerModel {
      throw new Error('This method is not implemented');
    }

}