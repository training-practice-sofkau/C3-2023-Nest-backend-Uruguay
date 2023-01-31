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
            (item) => item.id === id)
        if (indexCurrentEntity >= 0)
            this.database[indexCurrentEntity] = {
                ...this.database[indexCurrentEntity],
                ...entity,
                id
            } as DocumentTypeEntity
        else throw new NotFoundException()
        return this.database[indexCurrentEntity]
    }

    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('This method is not implemented');
    }

    findAll(): DocumentTypeEntity[] {
        return this.database
    }

    findOneById(id: string): DocumentTypeEntity {
        const currentEntity = this.database.find(
            (item) => item.id === id)
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByState(state: boolean): DocumentTypeEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.state === state)
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }

    findByName(name: string): DocumentTypeEntity[] {
        const currentEntity = this.database.filter(
            (item) => item.name === name)
        if (!currentEntity) throw new NotFoundException()
        else return currentEntity
    }
}