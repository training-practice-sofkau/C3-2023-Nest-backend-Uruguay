import { Injectable } from '@nestjs/common';
import { AccountEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { InterfaceRepo } from './interfaces/InterfaceRepo';

@Injectable()
export class AccountRepository
  extends BaseRepository<AccountEntity> implements InterfaceRepo<AccountEntity>
{
  register(entity: AccountEntity): AccountEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: AccountEntity, id: string): AccountEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): AccountEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): AccountEntity {
    throw new Error('Method not implemented.');
  }

}
