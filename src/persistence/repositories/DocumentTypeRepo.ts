import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentTypeEntity } from "../entities/document-type-entity";
import { DocumentTypeRepositoryInterface } from "./interface/i-document-type-repo";
import { BaseRepository } from "./repo-base/base-repository";

@Injectable()
export class DocumentTypeRepository extends BaseRepository<DocumentTypeEntity> implements DocumentTypeRepositoryInterface {

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
    throw new Error('This method is not implemented');
  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    const currentEntity = this.database.find ((item) => item.id === id,);
  if (currentEntity) return currentEntity; //si retorna una entidad
  else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    const currentEntity = this.database.filter(item => item.state === state);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  findByName(name: string): DocumentTypeEntity[] {
    const currentEntity = this.database.filter((item) => item.name === name);
  if (currentEntity) return currentEntity;
  else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  
}