import { Injectable } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { AccountEntity } from '../entities';

@Injectable()
export class AccountRepository extends GeneralCRUD<AccountEntity> {

  register(entity: AccountEntity): AccountEntity {
    throw new Error('This method is not implemented');
  }

  update(id: string, entity: AccountEntity): AccountEntity {
      throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean): void {
      throw new Error('This method is not implemented');
  }

  private hardDelete(index: number): void {
      throw new Error('This method is not implemented');
  }

  private softDelete(index: number): void {
      throw new Error('This method is not implemented');
  }

  findAll(): AccountEntity[] {
      throw new Error('This method is not implemented');
  }

  findOneById(id: string): AccountEntity {
      throw new Error('This method is not implemented');
  }

  findByState(state: boolean): AccountEntity[] {
      throw new Error('This method is not implemented');
  }

  findByCustomer(customerId: string): AccountEntity[] {
      throw new Error('This method is not implemented');
  }

  findByAccountType(accountTypeId: string): AccountEntity[] {
      throw new Error('This method is not implemented');
  }
}