import { BASE } from './base';
import { DocumentTypeEntity } from '../entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeRepositoryInterface } from './interfaces/document-type.repository.interface';

@Injectable()
export class DocumentTypeRepository
  extends BASE<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === entity.id,
    );
    if (indexCurrentEntity != -1) throw new Error('The Document Type already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id
    );
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as DocumentTypeEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string, soft?: boolean | undefined): void {
    const indexCurrentEntity = this.database.findIndex(
      (item) => item.id === id
    );

    if (indexCurrentEntity == -1) throw new NotFoundException();

    this.hardDelete(indexCurrentEntity);
  }

  private hardDelete(index: number): void {
    this.database.splice(index);
  }

  findAll(): DocumentTypeEntity[] {
    return this.database.map(item => item);
  }

  findOneById(id: string): DocumentTypeEntity {
    const currentEntity = this.database.find(
      (item) => item.id === id
    );
    if (!currentEntity) throw new NotFoundException();

    return currentEntity;
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    return this.database.filter(
      (item) => item.state === state
    );
  }

  findByName(name: string): DocumentTypeEntity[] {
    return this.database.filter(
      (item) =>
        item.name === name
    );
  }
}
