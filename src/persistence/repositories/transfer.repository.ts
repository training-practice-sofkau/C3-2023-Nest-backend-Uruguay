import { Injectable } from '@nestjs/common';
import { transferEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { InterfaceRepo } from './interfaces/InterfaceRepo';

@Injectable()
export class transferRepository
  extends BaseRepository<transferEntity> implements InterfaceRepo<transferEntity>
{
  register(entity: transferEntity): transferEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: transferEntity, id: string): transferEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): transferEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): transferEntity {
    throw new Error('Method not implemented.');
  }

}
