import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseRepository } from "../../../base/repositories/base.repository";
import { DocumentTypeRepositoryInterface } from './document-type-repository.interface';
import { DocumentTypeEntity } from '../entity/document-type-Entity';



@Injectable()
export class DocumentTypeRepository extends BaseRepository<DocumentTypeEntity> implements DocumentTypeRepositoryInterface{

    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        const indexCurrentEntity = this.database.findIndex((item) => item.id === entity.id );
        if (indexCurrentEntity != -1) throw new NotFoundException(`The Document:${entity.id} ya existe`);

        this.database.push(entity);
        return this.database.at(-1) ?? entity; // si no existe ningun entity entonces te devulve un anterior
    }

    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        const indexCurrentEntity = this.database.findIndex(item => item.id === id);
        if (indexCurrentEntity === -1) throw new NotFoundException(`The Document:${entity.id} not found`);

        this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
        } as DocumentTypeEntity;

        return this.database[indexCurrentEntity];
    }

    delete(id: string): void {
        const indexCurrentEntity = this.database.findIndex(item => item.id === id);

        if (indexCurrentEntity === -1) throw new NotFoundException(`The Document:${id} not found`);

        this.database.splice(indexCurrentEntity);
    }

    findAll(): DocumentTypeEntity[] {
        let docTypeEntitis = this.database.filter(item => item);
        if(!docTypeEntitis) throw new NotFoundException(`no hay tipos de documentos`);
        //Tengo que usar el metodo slice para pasarle por parametros un rango
        return docTypeEntitis;
    }

    findOneById(id: string): DocumentTypeEntity {
        const currentEntity = this.database.findIndex((item) => item.id === id);
        if (currentEntity == -1) throw new NotFoundException(`No se encontro el id : ${id}`);

        return this.database[currentEntity];
    }

    findByState(state: boolean): DocumentTypeEntity[] {
        return this.database.filter((item) => item.state === state);
    }

    findByName(name: string): DocumentTypeEntity[] {
        return this.database.filter((item) => item.name === name);
    }

}