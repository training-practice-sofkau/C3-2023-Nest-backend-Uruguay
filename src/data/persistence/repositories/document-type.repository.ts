import { Injectable, NotFoundException } from '@nestjs/common';

import { GeneralCRUD } from './base';
import { DocumentTypeEntity } from '../entities';
import { IDisableable, IDocumentTypeRepositoryInterface, INameable } from './interfaces';
import { PaginationModel } from '../../models';

@Injectable()
export class DocumentTypeRepository extends GeneralCRUD<DocumentTypeEntity> implements IDocumentTypeRepositoryInterface, IDisableable<DocumentTypeEntity>, INameable<DocumentTypeEntity> {

  public static instance: DocumentTypeRepository;

  public static getInstance(): DocumentTypeRepository {
    if (!DocumentTypeRepository.instance) {
      DocumentTypeRepository.instance = new DocumentTypeRepository();
    }
    return DocumentTypeRepository.instance;
  }

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
        (item) => item.id == id,
    );
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DocumentTypeEntity;
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    let finded = this.database.findIndex(
      (item) => 
        item.id == id
    );
    if (finded == undefined) throw new NotFoundException();
    this.database.splice(finded, 1);
  }

  findAll(paginator?: PaginationModel): DocumentTypeEntity[] {
    let finded = this.database;
    if (finded == undefined) throw new NotFoundException();
    return finded.slice(paginator?.offset, paginator?.limit);
  }

  findOneById(id: string): DocumentTypeEntity {
    let finded = this.database.find( (item) => item.id == id );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    let finded = this.database.filter( (item) => item.state == state );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }

  findByName(name: string): DocumentTypeEntity[] {
    let finded = this.database.filter( (item) => item.name == name );
    if (finded == undefined) throw new NotFoundException();
    return finded;
  }
}