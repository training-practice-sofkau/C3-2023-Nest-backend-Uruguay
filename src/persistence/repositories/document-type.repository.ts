import { Injectable } from '@nestjs/common';
import { Repository } from './base/repository.base';
import { DocumentTypeEntity } from '../entities/document-type.entity';
import { IRepository } from './interfaces/repository.interface';

@Injectable()
export class DocumentTypeRepository extends Repository<DocumentTypeEntity> implements IRepository<DocumentTypeEntity>{
    register(entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    update(id: string, entity: DocumentTypeEntity): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
    delete(id: string, soft?: boolean | undefined): void {
        throw new Error('Method not implemented.');
    }
    findAll(): DocumentTypeEntity[] {
        throw new Error('Method not implemented.');
    }
    findOneById(id: string): DocumentTypeEntity {
        throw new Error('Method not implemented.');
    }
}