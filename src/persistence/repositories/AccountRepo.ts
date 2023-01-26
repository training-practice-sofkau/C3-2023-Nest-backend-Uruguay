import { Injectable } from "@nestjs/common";
import { BankAccountModel } from "src/models/i-account-model";


@Injectable()
export class AccountRepo{
    private readonly database: Array<BankAccountModel>;

    constructor() {
      this.database = new Array<BankAccountModel>();
    }
  
    register(entity: BankAccountModel): BankAccountModel {
      throw new Error('This method is not implemented');
    }
  
    update(id: string, entity: BankAccountModel): BankAccountModel {
      throw new Error('This method is not implemented');
    }
  
    delete(id: string, soft?: boolean): void {
      throw new Error('This method is not implemented');
    }
  
    findAll(): BankAccountModel[] {
      throw new Error('This method is not implemented');
    }
  
    findOneById(id: string): BankAccountModel {
      throw new Error('This method is not implemented');
    }

}