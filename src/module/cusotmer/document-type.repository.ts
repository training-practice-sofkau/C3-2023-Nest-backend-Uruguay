import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from "../base/Repository";
import { DocumentTypeEntity } from './document-type-Entity';
import { DocumentTypeRepositoryInterface } from './document-type-repository.interface';



@Injectable()
export class DocumentTypeRepository extends Repository<DocumentTypeEntity> implements DocumentTypeRepositoryInterface{

    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        const indexCurrentEntity = this.database.findIndex((item) => item.id === entity.id);
        if (!indexCurrentEntity) throw new NotFoundException(`The Document:${entity.id} not found`);

        this.database.push(entity);
        return this.database.at(-1) ?? entity; // si no existe ningun entity entonces te devulve un anterior
    }

    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        const indexCurrentEntity = this.database.findIndex(item => item.id === id);
        if (!indexCurrentEntity) throw new NotFoundException(`The Document:${entity.id} not found`);

        this.database[indexCurrentEntity] = {
            ...this.database[indexCurrentEntity],
            ...entity,
            id,
        } as DocumentTypeEntity;

        return this.database[indexCurrentEntity];
    }

    delete(id: string): void {
        const indexCurrentEntity = this.database.findIndex(item => item.id === id);

        if (!indexCurrentEntity) throw new NotFoundException(`The Document:${id} not found`);

        this.database.splice(indexCurrentEntity);
    }

    findAll(): DocumentTypeEntity[] {
        const docTypeEntitis = this.database.filter(item => item);
        //Tengo que usar el metodo slice para pasarle por parametros un rango
        return docTypeEntitis;
    }

    findOneById(id: string): DocumentTypeEntity {
        const currentEntity = this.database.find(
        (item) => item.id === id);

        if (!currentEntity) throw new NotFoundException();

        return currentEntity;
    }

    findByState(state: boolean): DocumentTypeEntity[] {
        
        return this.database.filter(
        (item) => item.state === state);
    }

    findByName(name: string): DocumentTypeEntity[] {
        return this.database.filter(
        (item) => item.name === name);
    }

}