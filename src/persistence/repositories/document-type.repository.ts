import { BASE } from './base';
import { DocumentTypeEntity } from '../entities';
import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentTypeRepositoryInterface } from './interfaces/';

@Injectable()
export class DocumentTypeRepository
  extends BASE<DocumentTypeEntity>
  implements DocumentTypeRepositoryInterface
{
  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.findIndex(entity.id);
    if (indexCurrentEntity != -1) throw new Error('The Document Type already exists');

    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.findIndex(id);
    if (indexCurrentEntity === -1) throw new NotFoundException();

    this.database[indexCurrentEntity] = {
      ...this.database[indexCurrentEntity],
      ...entity,
      id,
    } as DocumentTypeEntity;

    return this.database[indexCurrentEntity];
  }

  delete(id: string): void {
    const indexCurrentEntity = this.findIndex(id);

    if (indexCurrentEntity == -1) throw new NotFoundException();

    this.database.splice(indexCurrentEntity);
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

  private findIndex(id: string): number {
    return this.database.findIndex(
      (item) => item.id === id
    );
  }
}
