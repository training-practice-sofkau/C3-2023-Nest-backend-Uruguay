import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';
import { CRUD } from './interfaces/crud.interface';
import { TransferEntity } from '../entities/transfer.entity';

@Injectable()
export class TranferRepository  extends Base<TransferEntity> implements CRUD<TransferEntity>{
  
  register(entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  update(id: string, entity: TransferEntity): TransferEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): TransferEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): TransferEntity {
    throw new Error('Method not implemented.');
  }

  
  
}