import { Injectable, NotFoundException } from "@nestjs/common";
import { DocumentTypeEntity } from "../entities/document-type-entity";
import { DocumentTypeRepositoryInterface } from "../interface-repo/i-document-type-repo";
import { BaseRepository } from "../interface-repo/repo-base/base-repository";
import { PaginationModel } from "src/data-access/models/i-pagination-model";

@Injectable()
export class DocumentTypeRepository extends BaseRepository<DocumentTypeEntity> implements DocumentTypeRepositoryInterface {
  
  
  

  register(entity: DocumentTypeEntity): DocumentTypeEntity {
    this.database.push(entity);
    return this.database.at(-1) ?? entity;
  }

  update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
    const indexCurrentEntity = this.database.findIndex((obj) => obj.id === id);
    if (indexCurrentEntity >= 0)
      this.database[indexCurrentEntity] = {
        ...this.database[indexCurrentEntity],
        ...entity,
        id,
      } as DocumentTypeEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
    return this.database[indexCurrentEntity];
  }

  private hardDelete(index: number): void {
    this.database.splice(index, 1);
  }

  delete(id: string, hard: boolean | undefined): void {
    const index = this.database.findIndex(obj => obj.id === id);

    if (!index) throw new NotFoundException('Lo siento, nada por aqui =(');

    if (hard) {
      this.hardDelete(index);
    }

  }

  findAll(): DocumentTypeEntity[] {
    return this.database;
  }

  findOneById(id: string): DocumentTypeEntity {
    const currentEntity = this.database.find((obj) => obj.id === id);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  findByState(state: boolean): DocumentTypeEntity[] {
    const currentEntity = this.database.filter(obj => obj.state === state);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  findByName(name: string): DocumentTypeEntity[] {
    const currentEntity = this.database.filter((obj) => obj.name === name);
    if (currentEntity) return currentEntity;
    else throw new NotFoundException('Lo siento, nada por aqui =(');
  }

  /*********************NUEVOS********************/

  findBy(property: keyof DocumentTypeEntity, value: string | number | boolean, pagination?: PaginationModel | undefined): DocumentTypeEntity[] {
    throw new Error("Method not implemented.");
  }
  findIndexById(id: string): number {
    throw new Error("Method not implemented.");
  }


}