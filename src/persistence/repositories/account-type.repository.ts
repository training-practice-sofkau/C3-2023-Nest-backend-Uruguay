import { Injectable } from '@nestjs/common';
import { AccountTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { InterfaceRepo } from './interfaces/InterfaceRepo';


@Injectable()
export class AccountTypeRepository
  extends BaseRepository<AccountTypeEntity> implements InterfaceRepo<AccountTypeEntity>
{
  register(entity: AccountTypeEntity): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: AccountTypeEntity, id: string): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): AccountTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): AccountTypeEntity {
    throw new Error('Method not implemented.');
  }

}
