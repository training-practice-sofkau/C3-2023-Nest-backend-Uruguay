import { Injectable } from '@nestjs/common';
import { depositEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { InterfaceRepo } from './interfaces/InterfaceRepo';


@Injectable()
export class depositRepository
  extends BaseRepository<depositEntity> implements InterfaceRepo<depositEntity>
{
  register(entity: depositEntity): depositEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: depositEntity, id: string): depositEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): depositEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): depositEntity {
    throw new Error('Method not implemented.');
  }

}
