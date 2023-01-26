import { Injectable } from '@nestjs/common';
import { CustomerEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { InterfaceRepo } from './interfaces/InterfaceRepo';

@Injectable()
export class CustomerRepository
  extends BaseRepository<CustomerEntity> implements InterfaceRepo<CustomerEntity>
{
  register(entity: CustomerEntity): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: CustomerEntity, id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): CustomerEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): CustomerEntity {
    throw new Error('Method not implemented.');
  }

}
