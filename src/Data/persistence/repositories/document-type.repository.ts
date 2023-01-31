import { Injectable, NotFoundException } from '@nestjs/common';

import { DocumentTypeEntity } from '../entities';
import { BaseRepository } from './base';
import { DocumentTypeRepositoryInterface } from './interfaces';

@Injectable()
export class DocumentTypeRepository
  extends BaseRepository<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  searchByAttributesforOne(
    attributes: keyof DocumentTypeEntity,
    dataToSearch: string,
  ): DocumentTypeEntity {
    const currentEntity = this.database.find(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

  searchByAttributes(
    attributes: keyof DocumentTypeEntity,
    dataToSearch: string,
  ): DocumentTypeEntity[] {
    const currentEntity = this.database.filter(
      (entity) => entity[attributes] === dataToSearch,
    );
    if (currentEntity) return currentEntity;
    else throw new NotFoundException();
  }

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
    else throw new NotFoundException();
    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    this.database.splice(
      this.database.findIndex((item) => item.id === id),
      1,
    );
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    return this.database.filter((item) =>
      state === true ? item.state === true : item.state === false,
    );
  }
}
