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
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id);
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DocumentTypeEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean): void {
      const index = this.database.findIndex(
        (item) => item.id === id 
      );
      this.database.splice(index, 1);
    
  }

  findAll(): DocumentTypeEntity[] {
    return this.database
  }

  findOneById(id: string): DocumentTypeEntity {
    const document = this.database.find(
      (item) => item.id === id 
    );
    if (document) return document;
    else throw new NotFoundException("El id no existe en base de datos");
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    const stadof = this.database.filter( //filtra segun una condicion y devuelve un array
    (item) => item.state == state
  )
  return stadof;
  }

  findByName(name: string): DocumentTypeEntity[] {
    const namef = this.database.filter( //filtra segun una condicion y devuelve un array
    (item) => item.name == name)
  return namef;
  }
}