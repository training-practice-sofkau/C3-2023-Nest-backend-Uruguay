import { Injectable, NotFoundException } from '@nestjs/common';

import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface {

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.database.findIndex((item) => item.id === id);
    if(indexCurrentEntity === -1) throw new NotFoundException();
    this.database.splice(indexCurrentEntity, 1);
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    const currentEntity = this.database.find((item) => item.id === id);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}