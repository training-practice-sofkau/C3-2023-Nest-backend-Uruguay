import { Injectable } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base/base.repository';
import { InterfaceRepo } from './interfaces/InterfaceRepo';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity> implements InterfaceRepo<DocumentTypeEntity>
{
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }
  update(entity: DocumentTypeEntity, id: string): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }
  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('Method not implemented.');
  }
  findAll(): DocumentTypeEntity[] {
    throw new Error('Method not implemented.');
  }
  findOneById(id: string): DocumentTypeEntity {
    throw new Error('Method not implemented.');
  }

}
