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
    this.database.splice(this.database.findIndex((item) => item.id === id), 1);
  }

  findAll(): DocumentTypeEntity[] {
    let finded = this.database;
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findOneById(id: string): DocumentTypeEntity {
    let finded = this.database.find( (item) => item.id === id );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    let finded = this.database.filter( (item) => item.state === state );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }

  findByName(name: string): DocumentTypeEntity {
    let finded = this.database.find( (item) => item.name === name );
    if (finded === undefined) throw new NotFoundException;
    return finded;
  }
}