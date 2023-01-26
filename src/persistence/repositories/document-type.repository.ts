import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { DocumentTypeEntity } from '../entities';

@Injectable()
export class DocumentTypeRepository extends GeneralCRUD<DocumentTypeEntity> {

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id === id,
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DocumentTypeEntity;
    else throw new NotFoundException;
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    throw new Error('This method is not implemented');
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }

  findByName(name: string): DocumentTypeEntity[] {
    throw new Error('This method is not implemented');
  }
}