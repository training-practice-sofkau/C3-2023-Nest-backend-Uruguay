import { Injectable } from "@nestjs/common";
import { IAccountModel } from "src/models/i-account-model";


@Injectable()
export class AccountRepo{
    private readonly database: Array<IAccountModel>;

    constructor() {
      this.database = new Array<IAccountModel>();
    }
  
    register(entity: IAccountModel): IAccountModel {
      throw new Error('This method is not implemented');
    }
  
    update(id: string, entity: IAccountModel): IAccountModel {
      throw new Error('This method is not implemented');
    }
  
    delete(id: string, soft?: boolean): void {
      throw new Error('This method is not implemented');
    }
  
    findAll(): IAccountModel[] {
      throw new Error('This method is not implemented');
    }
  
    findOneById(id: string): IAccountModel {
      throw new Error('This method is not implemented');
    }

}