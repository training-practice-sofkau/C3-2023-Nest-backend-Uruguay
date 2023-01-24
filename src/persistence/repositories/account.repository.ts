import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepositories } from './base';

@Injectable()
export class AccountRepository  extends  BaseRepositories <AccountEntity> {
    constructor() {
        super();
         this.database = new Array<AccountEntity>();
      }
  findAll(): AccountEntity[] {
      throw new Error('Method not implemented.');
  }
  findOneById(id: string): AccountEntity {
      throw new Error('Method not implemented.');
  }
  register(entity: AccountEntity): AccountEntity {
      throw new Error('Method not implemented.');
  }
  update(id: string, entity: AccountEntity): AccountEntity {
      throw new Error('Method not implemented.');
  }
  delete(id: string): void {
      throw new Error('Method not implemented.');
  }
  private readonly database: Array<AccountEntity>;

}