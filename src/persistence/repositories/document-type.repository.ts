import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeEntity } from '../entities';
import { Base } from './base/base.abstract';
import { CRUD } from './interfaces/crud.interface';

@Injectable()
export class DocumentTypeRepository  extends Base<DocumentTypeEntity> implements CRUD<DocumentTypeEntity>{

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
    else throw new DocumentTypeEntity();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    if (this.database.length == 0) {
      throw new Error('No se encontraron elementos');
      }
      return this.database
  }

  findOneById(id: string): DocumentTypeEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException("Elemento no encontrado");
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    
    const currentEntity: DocumentTypeEntity[] = this.database.filter(
      (item) => item.state === state
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos no encontrados');
  }

  findByName(name: string): DocumentTypeEntity[] {
    const currentEntity: DocumentTypeEntity[] = this.database.filter(
      (item) => item.name === name
    );
    if (currentEntity) return currentEntity;
    else throw new Error('Datos no encontrados')
  }
  
}